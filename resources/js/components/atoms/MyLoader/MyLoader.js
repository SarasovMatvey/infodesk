import { Loader } from "@mantine/core";
import React from "react";
import PropTypes from "prop-types";

export default function MyLoader({ isShow }) {
    return isShow ? (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: "0",
                left: "0",
                background: "rgba(0,0,0,.1)",
                zIndex: "555",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Loader size="xl" variant="dots"></Loader>
        </div>
    ) : null;
}

MyLoader.propTypes = {
    isShow: PropTypes.bool,
};

MyLoader.defaultProps = {
    isShow: true,
};
