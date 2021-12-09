import React, { useState } from "react";
import { Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { DateTime } from "luxon";
import Swal from "sweetalert2";
import "dayjs/locale/ru";
import MySwal from "../../atoms/MySwal/MySwal";
import { useDispatch } from "react-redux";
import { hide, show } from "../../redux/reducers/loader";

export default function Downloader() {
    const [date, setDate] = useState(null);
    const dispatch = useDispatch();

    function sendDownloadRequest() {
        let dateString = DateTime.fromJSDate(date).toFormat("yyyy-MM-dd");

        dispatch(show());
        fetch("/api/reports/downloadDate", {
            method: "POST",
            body: JSON.stringify({
                date: dateString,
            }),
        })
            .then((resp) => {
                if (resp.ok) {
                    MySwal.fire({
                        icon: "success",
                        text: "Данные загружены!",
                    });
                } else if (resp.status === 409) {
                    MySwal.fire({
                        icon: "error",
                        text: "Данные за эту дату уже загружены!",
                    });
                } else {
                    MySwal.fire({
                        icon: "error",
                        text: "Ошибка!",
                    });
                }
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
        <form
            style={{
                display: "flex",
                alignItems: "end",
                gap: "10px",
            }}
        >
            <DatePicker
                locale="ru"
                placeholder="Укажите дату"
                label="Загрузить отчет за эту дату"
                value={date}
                onChange={handleDateChange}
                required
            />
            <Button onClick={sendDownloadRequest}>Загрузить</Button>
        </form>
    );
}
