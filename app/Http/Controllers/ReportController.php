<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Carbon\Carbon;
use Error;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;
use Throwable;

class ReportController extends Controller
{
    /**
     * Download all operators statistics for specific day to db.
     *
     * @return Response
     */
    public function downloadDate(Request $request)
    {
        try {
            Validator::make($request->all(), [
                'date' => 'required|date_format:Y-m-d'
            ])->validate();

            $date = $request->json("date");

            // max - 200 for chat2desk
            $limit = 200;
            $offset = 0;
            $fullDayStatistics = [];

            while (true) {
                $url = "https://api.chat2desk.com/v1/statistics?report=operator_events&date=$date&limit=$limit&offset=$offset";
                $dateStatisticsResp = Http::withHeaders([
                    'Authorization' => Config::get("services.c2d.api_key")
                ])->get($url);
                $dateStatistics = $dateStatisticsResp->json();

                if ($dateStatistics['status'] ?? null === 'error') {
                    return response()->json(['message' => $dateStatistics['message']], HttpFoundationResponse::HTTP_INTERNAL_SERVER_ERROR);
                }


                array_push($fullDayStatistics, ...$dateStatistics['data']);
                $offset += $limit;

                if (!$dateStatistics['data']) {
                    break;
                }
            }


            foreach ($fullDayStatistics as $report) {
                $newReport = new Report;

                $newReport->operator_name = $report['operator_name'];
                $newReport->status_name = $report['event_name'];
                $newReport->event_start = Carbon::createFromTimestamp($report['event_start'])->toDate();
                $newReport->status_duration = $report['status_duration'];

                $newReport->save();
            }

            return response()->noContent();
        } catch (Throwable $err) {
            return response()->json(['message' => $err->getMessage()], HttpFoundationResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
