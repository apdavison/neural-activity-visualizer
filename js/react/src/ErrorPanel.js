import React from "react";

export default function ErrorPanel(props) {
    if (props.message) {
        return (
            <div className="nv-alert nv-alert--error" role="alert">
                {props.message}
            </div>
        );
    } else {
        return "";
    }
}
