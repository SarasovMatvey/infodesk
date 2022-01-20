import { Divider, Title } from "@mantine/core";
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
        console.log(JSON.parse(JSON.stringify(data)));

        setFirstReportData(
            data
                .map((report) => {
                    let statusStartTimeObj = DateTime.fromFormat(
                        report.event_start,
                        "yyyy-MM-dd HH:mm:ss"
                    );
                    let statusEndTimeObj = statusStartTimeObj.plus({
                        seconds: report.status_duration,
                    });
                    let diffTime = Math.trunc(report.status_duration / 60);
                    let diffTimeSeconds = report.status_duration % 60;

                    return {
                        operatorName: report.operator_name,
                        statusName: report.status_name,
                        date: statusStartTimeObj.toFormat("yyyy-MM-dd"),
                        setonTime: statusStartTimeObj.toFormat("HH:mm:ss"),
                        setoffTime: statusEndTimeObj.toFormat("HH:mm:ss"),
                        diff:
                            diffTime === 0 ? "0:" + diffTimeSeconds : diffTime,
                    };
                })
                .filter((report) => {
                    if (report.setonTime === report.setoffTime) return false;

                    return true;
                })
        );

        let operatorsStats = data
            // .filter((report) => {
            //     if (report.status_name === "statusOnline") return true;

            //     return false;
            // })
            .map((report) => {
                let statusStartTimeObj = DateTime.fromFormat(
                    report.event_start,
                    "yyyy-MM-dd HH:mm:ss"
                );
                let statusEndTimeObj = statusStartTimeObj.plus({
                    seconds: report.status_duration,
                });
                let diffTime = report.status_duration / 60;

                return {
                    operatorName: report.operator_name,
                    date: statusStartTimeObj.toFormat("yyyy-MM-dd"),
                    loginTimeObj: statusStartTimeObj.toFormat("HH:mm:ss"),
                    logoutTimeObj: statusEndTimeObj.toFormat("HH:mm:ss"),
                    loginTime: statusStartTimeObj.toFormat("HH:mm:ss"),
                    logoutTime: statusEndTimeObj.toFormat("HH:mm:ss"),
                    statusTimeSum: diffTime,
                    statusTimeSumSeconds: report.status_duration % 60,
                    statusName: report.status_name,
                };
            })
            .filter((report) => {
                if (report.loginTime === report.logoutTime) return false;

                return true;
            })
            .reduce((acc, current) => {
                if (!acc[current.operatorName]) {
                    acc[current.operatorName] = {};
                }

                acc[current.operatorName].date = current.date;

                if (!acc[current.operatorName].loginTime) {
                    acc[current.operatorName].loginTime = current.loginTime;
                    acc[current.operatorName].loginTimeObj =
                        current.loginTimeObj;
                } else if (
                    current.loginTimeObj <
                    acc[current.operatorName].loginTimeObj
                ) {
                    acc[current.operatorName].loginTime = current.loginTime;
                    acc[current.operatorName].loginTimeObj =
                        current.loginTimeObj;
                }

                if (!acc[current.operatorName].logoutTime) {
                    acc[current.operatorName].logoutTime = current.logoutTime;
                    acc[current.operatorName].logoutTimeObj =
                        current.logoutTimeObj;
                } else if (
                    current.logoutTimeObj >
                    acc[current.operatorName].logoutTimeObj
                ) {
                    acc[current.operatorName].logoutTime = current.logoutTime;
                    acc[current.operatorName].logoutTimeObj =
                        current.logoutTimeObj;
                }

                switch (current.statusName) {
                    case "statusOnline":
                        acc[current.operatorName].onlineTimeSum =
                            (acc[current.operatorName].onlineTimeSum || 0) +
                            current.statusTimeSum;
                        acc[current.operatorName].onlineTimeSumSeconds =
                            (acc[current.operatorName].onlineTimeSumSeconds ||
                                0) + current.statusTimeSumSeconds;
                        break;
                    case "statusOffline":
                        acc[current.operatorName].offlineSum =
                            (acc[current.operatorName].offlineSum || 0) +
                            current.statusTimeSum;
                        acc[current.operatorName].offlineSumSeconds =
                            (acc[current.operatorName].offlineSumSeconds || 0) +
                            current.statusTimeSumSeconds;
                        break;
                    case "statusBusy":
                        acc[current.operatorName].busySum =
                            (acc[current.operatorName].busySum || 0) +
                            current.statusTimeSum;
                        acc[current.operatorName].busySumSeconds =
                            (acc[current.operatorName].busySumSeconds || 0) +
                            current.statusTimeSumSeconds;
                        break;
                    case "statusBreak":
                        acc[current.operatorName].breakSum =
                            (acc[current.operatorName].breakSum || 0) +
                            current.statusTimeSum;
                        acc[current.operatorName].breakSumSeconds =
                            (acc[current.operatorName].breakSumSeconds || 0) +
                            current.statusTimeSumSeconds;
                        break;
                    case "statusTechBreak":
                        acc[current.operatorName].techSum =
                            (acc[current.operatorName].techSum || 0) +
                            current.statusTimeSum;
                        acc[current.operatorName].techSeconds =
                            (acc[current.operatorName].techSeconds || 0) +
                            current.statusTimeSumSeconds;
                        break;
                    case "statusStudy":
                        acc[current.operatorName].studySum =
                            (acc[current.operatorName].studySum || 0) +
                            current.statusTimeSum;
                        acc[current.operatorName].studySumSeconds =
                            (acc[current.operatorName].studySumSeconds || 0) +
                            current.statusTimeSumSeconds;
                        break;
                    case "statusHoliday":
                        acc[current.operatorName].studyHoliday =
                            (acc[current.operatorName].studyHoliday || 0) +
                            current.statusTimeSum;
                        acc[current.operatorName].studyHolidaySeconds =
                            (acc[current.operatorName].studyHolidaySeconds ||
                                0) + current.statusTimeSumSeconds;
                        break;
                }

                return acc;
            }, {});

        setSecondReportData(
            Object.keys(operatorsStats).map((operatorName) => {
                return {
                    operatorName: operatorName,
                    date: operatorsStats[operatorName].date,
                    loginTime: operatorsStats[operatorName].loginTime,
                    logoutTime: operatorsStats[operatorName].logoutTime,
                    onlineTimeSum:
                        (Math.trunc(
                            operatorsStats[operatorName].onlineTimeSum
                        ) === 0
                            ? "0:" +
                              operatorsStats[operatorName].onlineTimeSumSeconds
                            : Math.trunc(
                                  operatorsStats[operatorName].onlineTimeSum
                              )) || 0,
                    busySum:
                        (Math.trunc(operatorsStats[operatorName].busySum) === 0
                            ? "0:" + operatorsStats[operatorName].busySumSeconds
                            : Math.trunc(
                                  operatorsStats[operatorName].busySum
                              )) || 0,
                    techBreakSum:
                        (Math.trunc(operatorsStats[operatorName].breakSum) === 0
                            ? "0:" +
                              operatorsStats[operatorName].breakSumSeconds
                            : Math.trunc(
                                  operatorsStats[operatorName].breakSum
                              )) || 0,
                    superviserSum:
                        (Math.trunc(operatorsStats[operatorName].techSum) === 0
                            ? "0:" + operatorsStats[operatorName].techSumSeconds
                            : Math.trunc(
                                  operatorsStats[operatorName].techSum
                              )) || 0,
                    bcSum:
                        (Math.trunc(operatorsStats[operatorName].studySum) === 0
                            ? "0:" +
                              operatorsStats[operatorName].studySumSeconds
                            : Math.trunc(
                                  operatorsStats[operatorName].studySum
                              )) || 0,
                    holidaySum:
                        (Math.trunc(
                            operatorsStats[operatorName].studyHoliday
                        ) === 0
                            ? "0:" +
                              operatorsStats[operatorName].studyHolidaySeconds
                            : Math.trunc(
                                  operatorsStats[operatorName].studyHoliday
                              )) || 0,
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
                    marginBottom: "10px",
                }}
            >
                <Fetcher onDataReceive={handleDataReceive} />
            </div>
            <Divider
                variant="dotted"
                style={{
                    marginBottom: "20px",
                }}
            />
            <FirstReport data={firstReportData} />
            <SecondReport data={secondReportData} />
        </>
    );
}
