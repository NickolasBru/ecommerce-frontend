import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
    const { user } = useContext(AuthContext);
    if (!user || !allowedRoles.includes(user.tp_person)) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoute;
