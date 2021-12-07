import React from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/css/tabulator_semanticui.min.css";
import FirstReport from "./FirstReport";
import SecondReport from "./SecondReport";

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
    return (
        <>
            <FirstReport />
            <SecondReport />
        </>
    );
}
