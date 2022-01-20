import React, { createRef, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import PropTypes from "prop-types";
import "react-tabulator/lib/css/tabulator_semanticui.min.css";
import { Button, Select } from "@mantine/core";

const columns = [
    { title: "Оператор", field: "operatorName" },
    { title: "Дата", field: "date" },
    { title: "Вход в систему", field: "loginTime" },
    {
        title: "Выход из системы",
        field: "logoutTime",
    },
    {
        title: "Время нахождения онлайн в минутах",
        field: "onlineTimeSum",
    },
    {
        title: "Busy",
        field: "busySum",
    },
    {
        title: "Tech Break",
        field: "techBreakSum",
    },
    {
        title: "Супервайзер",
        field: "superviserSum",
    },
    {
        title: "ВС",
        field: "bcSum",
    },
    {
        title: "Holiday",
        field: "holidaySum",
    },
];

export default function SecondReport({ data }) {
    const [exportFormat, setExportFormat] = useState("csv");
    const tableRef = createRef();

    function downloadReport() {
        if (data.length) {
            tableRef.current.table.download(
                exportFormat,
                `report2.${exportFormat}`
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
                    Выгрузить отчет #2
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

SecondReport.propTypes = {
    data: PropTypes.array,
};

SecondReport.defaultProps = {
    data: [],
};
