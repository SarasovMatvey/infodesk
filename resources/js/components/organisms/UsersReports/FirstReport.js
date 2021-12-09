import React from "react";
import { ReactTabulator } from "react-tabulator";
import PropTypes from "prop-types";
import "react-tabulator/lib/css/tabulator_semanticui.min.css";

const columns = [
    { title: "Оператор", field: "operatorName" },
    { title: "Статус", field: "statusName" },
    { title: "Дата", field: "date" },
    { title: "Время постановки", field: "setonTime" },
    {
        title: "Время снятия",
        field: "setoffTime",
    },
    {
        title: "Разница в минутах",
        field: "diff",
    },
];

export default function FirstReport({ data }) {
    return (
        <ReactTabulator
            columns={columns}
            data={data}
            layout={"fitData"}
            options={{
                pagination: "local",
                paginationSize: 6,
            }}
        />
    );
}

FirstReport.propTypes = {
    data: PropTypes.array,
};

FirstReport.defaultProps = {
    data: [],
};
