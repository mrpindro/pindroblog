import jwtDecode from "jwt-decode";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    let isAdmin = false;
    let status = "User";

    if (token) {
        const decoded = jwtDecode(token);
        const { username, image, roles, userId } = decoded.UserInfo;

        isAdmin = roles.includes('Admin');

        if (isAdmin) {
            status = "Admin";
        }

        return { username, image, roles, userId, status, isAdmin }
    }

    return { username: '', image: null, roles: [], userId: '', isAdmin, status }
}

export default useAuth;