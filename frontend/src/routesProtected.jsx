import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component}) {
    const token = localStorage.getItem(`user_authToken`);
    const expiration = localStorage.getItem(`user_tokenExpiration`);

    const isTokenValid = () => {
        if (!token || !expiration) {
            return false;
        }

        const now = new Date().getTime();
        return now < expiration;
    }

    return isTokenValid() ? <Component /> : <Navigate to={`/`} />;
}

export default ProtectedRoute;