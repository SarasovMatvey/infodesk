import React from "react";

export default function Container({ children }) {
    return (
        <div
            style={{
                maxWidth: "900px",
                margin: "0 auto",
            }}
            className="container"
        >
            {children}
        </div>
    );
}
