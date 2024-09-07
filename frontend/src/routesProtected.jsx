import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }){
    const token = localStorage.getItem(`user_authToken`);
    const expiration = localStorage.getItem(`user_tokenExpiration`);

    const isTokenValid = () => {
        if (!token || !expiration) {
            return false;
        }

        const now = new Date().getTime();
        return now < expiration;
    }

    return isTokenValid() ? element : <Navigate to={`/`} />;
}

export default ProtectedRoute;