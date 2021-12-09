import React, { createRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import PropTypes from "prop-types";
import { RiDatabase2Line } from "react-icons";
import "react-tabulator/lib/css/tabulator_semanticui.min.css";
import { Button, Select } from "@mantine/core";

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
    const [exportFormat, setExportFormat] = useState("csv");
    const tableRef = createRef();

    function downloadReport() {
        if (data.length) {
            tableRef.current.table.download(
                exportFormat,
                `report1.${exportFormat}`
            );
        }
    }

    function handleExportFormatChange(format) {
        setExportFormat(format);
    }

    return (
        <>
            <div
                style={{
                    display: "flex",
                    alignItems: "end",
                    gap: "10px",
                }}
            >
                <Button compact onClick={downloadReport}>
                    Выгрузить отчет #1
                </Button>
                <Select
                    size="xs"
                    placeholder="Формат"
                    data={[
                        { value: "csv", label: "CSV" },
                        { value: "xlsx", label: "XLSX" },
                        { value: "json", label: "JSON" },
                        { value: "html", label: "HTML" },
                    ]}
                    value={exportFormat}
                    onChange={handleExportFormatChange}
                />
            </div>
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
