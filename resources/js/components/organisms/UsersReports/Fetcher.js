import { Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { DateTime } from "luxon";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import MySwal from "../../atoms/MySwal/MySwal";
import { show, hide } from "../../redux/reducers/loader";
import PropTypes from "prop-types";

export default function Fetcher({ onDataReceive }) {
    const [date, setDate] = useState(null);
    const dispatch = useDispatch();

    function fetchData() {
        let url = "/api/reports/index";
        let dateString = null;

        if (date) {
            dateString = DateTime.fromJSDate(date).toFormat("yyyy-MM-dd");
            url += `?date=${dateString}`;
        }

        dispatch(show());
        fetch(url, {
            method: "GET",
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    MySwal.fire({
                        icon: "error",
                        text: "Ошибка!",
                    });
                }
            })
            .then((data) => {
                onDataReceive(data);
            })
            .catch((err) => {
                MySwal.fire({
                    icon: "error",
                    text: "Ошибка!",
                });
            })
            .finally(() => {
                dispatch(hide());
            });
    }

    function handleDateChange(selectedDate) {
        setDate(selectedDate);
    }

    return (
        <div
            style={{
                display: "flex",
                alignItems: "end",
                gap: "10px",
            }}
        >
            <DatePicker
                locale="ru"
                placeholder="Укажите дату"
                label="Показать записи за эту дату"
                value={date}
                onChange={handleDateChange}
                required
            />
            <Button onClick={fetchData}>Загрузить</Button>
        </div>
    );
}

Fetcher.propTypes = {
    onDataReceive: PropTypes.func,
};

Fetcher.defaultProps = {
    onDataReceive: () => {},
};
