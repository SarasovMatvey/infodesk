import React from "react";
import { Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "dayjs/locale/ru";

export default function Fetcher() {
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
                required
            />
            <Button>Загрузить</Button>
        </div>
    );
}
