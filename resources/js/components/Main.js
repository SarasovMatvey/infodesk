import React, { Component } from "react";
import ReactDOM from "react-dom";
import store from "./redux/store";
import Container from "./atoms/Container/Container";
import MyLoader from "./atoms/MyLoader/MyLoader";
import UsersReports from "./organisms/UsersReports/UsersReports";
import { Provider, useSelector } from "react-redux";

function Main() {
    const isShow = useSelector((state) => state.loader.isShow);

    return (
        <div>
            <MyLoader isShow={isShow} />
            <Container>
                <UsersReports></UsersReports>
            </Container>
        </div>
    );
}

export default Main;

if (document.getElementById("root")) {
    ReactDOM.render(
        <Provider store={store}>
            <Main store={store} />
        </Provider>,
        document.getElementById("root")
    );
}
