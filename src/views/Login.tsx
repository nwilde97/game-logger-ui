import React, {Fragment} from "react";

export const Login = () => {
    const callback = encodeURIComponent(`${window.location.protocol}//${window.location.host}/login`);
    const url = `https://discord.com/api/oauth2/authorize?client_id=897642271082680361&redirect_uri=${callback}&response_type=token&scope=identify&prompt=none`;
    return (
        <Fragment>
            Please Login
            <a href={url}>Login</a>
        </Fragment>
    )
}
