import React, { useState } from "react";
import { Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { DateTime } from "luxon";
import "dayjs/locale/ru";

export default function Fetcher() {
    const [date, setDate] = useState(null);

    function sendDownloadRequest() {
        let dateString = DateTime.fromJSDate(date).toFormat("yyyy-MM-dd");

        fetch("/api/reports/downloadDate", {
            method: "POST",
            body: JSON.stringify({
                date: dateString,
            }),
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
                label="Загрузить отчет за эту дату"
                value={date}
                onChange={handleDateChange}
                required
            />
            <Button onClick={sendDownloadRequest}>Загрузить</Button>
        </div>
    );
}
