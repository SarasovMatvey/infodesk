import React, { createRef } from "react";
import { ReactTabulator } from "react-tabulator";
import PropTypes from "prop-types";
import "react-tabulator/lib/css/tabulator_semanticui.min.css";
import { Button } from "@mantine/core";

const columns = [
    { title: "Оператор", field: "operatorName" },
    { title: "Дата", field: "date" },
    { title: "Вход в систему", field: "loginTime" },
    {
        title: "Выход из системы",
        field: "logoutTime",
    },
    {
        title: "Время нахождения онлайн",
        field: "onlineTimeSum",
    },
];

export default function SecondReport({ data }) {
    const tableRef = createRef();

    function downloadReport() {
        if (data.length) {
            tableRef.current.table.download("csv", "data.csv");
        }
    }

    return (
        <>
            <Button compact onClick={downloadReport}>
                Выгрузить отчет #2
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

SecondReport.propTypes = {
    data: PropTypes.array,
};

SecondReport.defaultProps = {
    data: [],
};
