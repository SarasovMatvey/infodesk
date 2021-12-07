<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Error;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

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
            $request->validate([
                'date' => 'required|date_format:Y-m-d'
            ]);

            $date = $request->post("date");

            // max - 200 for chat2desk
            $limit = 200;
            $offset = 0;
            $fullDayStatistics = [];

            while (true) {
                $dateStatisticsResp = Http::withHeaders([
                    'Authorization' => Config::get("services.c2d.api_key")
                ])->get("https://api.chat2desk.com/v1/statistics?report=operator_events&date=$date&limit=$limit&offset=$offset");
                $dateStatistics = $dateStatisticsResp->json();


                $fullDayStatistics[] = $dateStatistics['data'];
                $offset += $limit;

                if (!$dateStatistics['data']) {
                    break;
                }
            }

            foreach ($fullDayStatistics as $report) {
                $newReport = new Report;

                $newReport->operator_name = $report['operator_name'];
                $newReport->status_time = $report['status_time'];
                $newReport->event_start = $report['event_start'];
                $newReport->status_duration = $report['status_duration'];

                $newReport->save();
            }

            return response()->noContent();
        } catch (Error $err) {
            return response()->json(['message' => $err->getMessage()], HttpFoundationResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
