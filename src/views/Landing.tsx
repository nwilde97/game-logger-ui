import {RouteComponentProps} from "@reach/router";
import {useSelector} from "react-redux";
import {selectSessionUser} from "../state/session";

export const LandingPage = (props: RouteComponentProps) => {
    const user = useSelector(selectSessionUser);
    return (
        <div>Hello {user?.username}</div>
    )
}
