import React from "react"
import CircularProgress from "@mui/material/CircularProgress";

function Loading(props) {

    return (
        <div>
            {
                !props.loading ?
                    props.children
                    :
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "62.5vw",
                    }}>
                        <CircularProgress />
                    </div>
            }
        </div>
    )
}

export default Loading;
