import React from "react";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/css/tabulator_semanticui.min.css";

const columns = [
    { title: "Оператор", field: "operator", width: 150 },
    { title: "Статус", field: "status", formatter: "progress" },
    { title: "Дата", field: "date" },
    { title: "Вход в систему", field: "seton" },
    {
        title: "Время снятия",
        field: "setoff",
    },
    {
        title: "Разница в минутах",
        field: "diff",
    },
];

export default function SecondReport() {
    return <ReactTabulator columns={columns} data={[]} layout={"fitData"} />;
}
