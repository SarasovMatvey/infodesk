import { Title } from "@mantine/core";
import React, { useState } from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/css/tabulator_semanticui.min.css";
import Downloader from "./Downloader";
import FirstReport from "./FirstReport";
import SecondReport from "./SecondReport";
import Fetcher from "./Fetcher";
import { DateTime } from "luxon";

const columns = [
    { title: "Оператор", field: "name", width: 150 },
    { title: "Статус", field: "age", hozAlign: "left", formatter: "progress" },
    { title: "Дата", field: "col" },
    { title: "Время постановки", field: "dob", hozAlign: "center" },
    {
        title: "Время снятия",
        field: "rating",
        hozAlign: "center",
        formatter: "star",
    },
    {
        title: "Passed?",
        field: "passed",
        hozAlign: "center",
        formatter: "tickCross",
    },
];

export default function UsersReports() {
    const [firstReportData, setFirstReportData] = useState([]);
    const [secondReportData, setSecondReportData] = useState([]);

    function handleDataReceive(data) {
        setFirstReportData(
            data.map((report) => {
                let statusStartTimeObj = DateTime.fromFormat(
                    report.event_start,
                    "yyyy-MM-dd HH:mm:ss"
                );
                let statusEndTimeObj = statusStartTimeObj.plus({
                    seconds: report.status_duration,
                });
                let diffTime = Math.trunc(report.status_duration / 60);

                return {
                    operatorName: report.operator_name,
                    statusName: report.status_name,
                    date: statusStartTimeObj.toFormat("yyyy-MM-dd"),
                    setonTime: statusStartTimeObj.toFormat("HH:mm:ss"),
                    setoffTime: statusEndTimeObj.toFormat("HH:mm:ss"),
                    diff: diffTime,
                };
            })
        );

        setSecondReportData(
            data
                .filter((report) => {
                    if (report.status_name === "statusOnline") return true;

                    return false;
                })
                .map((report) => {
                    let statusStartTimeObj = DateTime.fromFormat(
                        report.event_start,
                        "yyyy-MM-dd HH:mm:ss"
                    );
                    let statusEndTimeObj = statusStartTimeObj.plus({
                        seconds: report.status_duration,
                    });
                    let diffTime = Math.trunc(report.status_duration / 60);

                    return {
                        operatorName: report.operator_name,
                        statusName: report.status_name,
                        date: statusStartTimeObj.toFormat("yyyy-MM-dd"),
                        loginTime: statusStartTimeObj.toFormat("HH:mm:ss"),
                        logoutTime: statusEndTimeObj.toFormat("HH:mm:ss"),
                        onlineTimeSum: diffTime,
                    };
                })
        );
    }

    return (
        <>
            <Title
                style={{
                    marginBottom: "10px",
                }}
            >
                Отчеты Chat2Desk
            </Title>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px",
                }}
            >
                <Downloader />
                <Fetcher onDataReceive={handleDataReceive} />
            </div>
            <FirstReport data={firstReportData} />
            <SecondReport data={secondReportData} />
        </>
    );
}
