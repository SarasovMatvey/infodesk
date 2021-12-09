<?php

use App\Http\Controllers\ReportController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource("reports", ReportController::class)
    ->only(['index', 'store']);

Route::prefix("reports")->group(function () {
    Route::get("index", [ReportController::class, "index"])->name("reports.index");
    Route::post("downloadDate", [ReportController::class, "downloadDate"])->name("reports.downloadDate");
});
