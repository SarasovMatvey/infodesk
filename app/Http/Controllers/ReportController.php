<?php

namespace App\Http\Controllers;

use App\Models\DownloadedDate;
use App\Models\Report;
use App\Services\ReportService;
use Carbon\Carbon;
use Error;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Client\Request as ClientRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;
use Throwable;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        Validator::make($request->all(), [
            'date' => 'required|date_format:Y-m-d|before:today'
        ])->validate();

        $date = $request->query("date");

        if (!DownloadedDate::whereDate('date', $date)->exists()) {
            $fullDayStatistics = ReportService::getReportsByDay($date);

            foreach ($fullDayStatistics as $report) {
                $newReport = new Report;
                $newReport->operator_name = $report['operator_name'];
                $newReport->status_name = $report['event_name'];
                $newReport->event_start = Carbon::createFromTimestamp($report['event_start'])->toDate();
                $newReport->status_duration = $report['status_duration'];
                $newReport->save();
            }

            $newDownloadedDate = new DownloadedDate;
            $newDownloadedDate->date = Carbon::createFromFormat("Y-m-d", $date)->toDate();
            $newDownloadedDate->save();
        }

        $reports = Report::whereDate("event_start", $date)->get();

        return $reports;
    }

    /**
     * Download all operators statistics for specific day to db.
     *
     * @return Response
     */
    public function downloadDate(Request $request)
    {
        try {
            Validator::make($request->all(), [
                'date' => 'required|date_format:Y-m-d|before:today'
            ])->validate();

            $date = $request->json('date');

            if (DownloadedDate::whereDate('date', $date)->exists()) {
                return response()->json(['message' => "Selected date already used!"], HttpFoundationResponse::HTTP_CONFLICT);
            }

            $fullDayStatistics = ReportService::getReportsByDay($date);

            foreach ($fullDayStatistics as $report) {
                $newReport = new Report;
                $newReport->operator_name = $report['operator_name'];
                $newReport->status_name = $report['event_name'];
                $newReport->event_start = Carbon::createFromTimestamp($report['event_start'])->toDate();
                $newReport->status_duration = $report['status_duration'];
                $newReport->save();
            }

            $newDownloadedDate = new DownloadedDate;
            $newDownloadedDate->date = Carbon::createFromFormat("Y-m-d", $date)->toDate();
            $newDownloadedDate->save();

            return response()->noContent();
        } catch (Throwable $err) {
            return response()->json(['message' => $err->getMessage()], HttpFoundationResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
