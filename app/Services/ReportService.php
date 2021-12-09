<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

class ReportService
{
    public static function getReportsByDay($date)
    {
        $fullDayStatistics = [];
        $limit = 200;
        $offset = 0;

        while (true) {
            $url = "https://api.chat2desk.com/v1/statistics?report=operator_events&date=$date&limit=$limit&offset=$offset";
            $dateStatisticsResp = Http::withHeaders([
                'Authorization' => Config::get('services.c2d.api_key')
            ])->get($url);
            $dateStatistics = $dateStatisticsResp->json();

            if ($dateStatistics['status'] ?? null === 'error') {
                return response()->json(['message' => $dateStatistics['message']], HttpFoundationResponse::HTTP_INTERNAL_SERVER_ERROR);
            }

            $onlyUserStatusStatistics = array_filter($dateStatistics['data'], function ($report) {

                if ($report['event_type'] === 'userStatus') return true;

                return false;
            });

            array_push($fullDayStatistics, ...$onlyUserStatusStatistics);
            $offset += $limit;

            if (!$dateStatistics['data']) {
                break;
            }
        }

        return $fullDayStatistics;
    }
}
