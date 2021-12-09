import React from "react";
import { ReactTabulator } from "react-tabulator";
import PropTypes from "prop-types";
import "react-tabulator/lib/css/tabulator_semanticui.min.css";

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

SecondReport.propTypes = {
    data: PropTypes.array,
};

SecondReport.defaultProps = {
    data: [],
};
