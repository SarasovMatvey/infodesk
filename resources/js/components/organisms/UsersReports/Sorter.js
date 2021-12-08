import { Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React, { useState } from "react";

export default function Sorter() {
    const [date, setDate] = useState(null);

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
            <Button>Загрузить</Button>
        </div>
    );
}
