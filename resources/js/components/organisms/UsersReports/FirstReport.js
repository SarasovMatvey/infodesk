import React, { createRef } from "react";
import { ReactTabulator } from "react-tabulator";
import PropTypes from "prop-types";
import { RiDatabase2Line } from "react-icons";
import "react-tabulator/lib/css/tabulator_semanticui.min.css";
import { Button } from "@mantine/core";

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
    const tableRef = createRef();

    function downloadReport() {
        if (data.length) {
            tableRef.current.table.download("csv", "data.csv");
        }
    }

    return (
        <>
            <Button compact onClick={downloadReport}>
                Выгрузить отчет #1
            </Button>
            <ReactTabulator
                ref={tableRef}
                columns={columns}
                data={data}
                layout={"fitData"}
                options={{
                    pagination: "local",
                    paginationSize: 6,
                    downloadDataFormatter: (data) => data,
                    downloadReady: (fileContents, blob) => blob,
                }}
            />
        </>
    );
}

FirstReport.propTypes = {
    data: PropTypes.array,
};

FirstReport.defaultProps = {
    data: [],
};
