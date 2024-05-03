import { Navigate, Outlet } from "react-router-dom";

const SaveRoute = () => {
    return ( localStorage.token ? <Outlet/> : <Navigate to={"login"} />)
}

export default SaveRoute;
