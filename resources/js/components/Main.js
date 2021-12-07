import { Title } from "@mantine/core";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Container from "./common/Container/Container";
import Fetcher from "./UsersReports/Fetcher";
import UsersReports from "./UsersReports/UsersReports";

function Main() {
    return (
        <div>
            <Container>
                <Title
                    style={{
                        marginBottom: "10px",
                    }}
                >
                    Отчеты Chat2Desk
                </Title>
                <Fetcher />
                <UsersReports></UsersReports>
            </Container>
        </div>
    );
}

export default Main;

if (document.getElementById("root")) {
    ReactDOM.render(<Main />, document.getElementById("root"));
}
