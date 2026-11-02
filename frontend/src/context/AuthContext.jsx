
import {
    createContext,
    useContext,
    useState
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("foodwise_user"));
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(
        () => localStorage.getItem("foodwise_token")
    );

    // Lưu thông tin sau khi đăng nhập
    const login = (data) => {
        localStorage.setItem("foodwise_token", data.token);
        localStorage.setItem(
            "foodwise_user",
            JSON.stringify(data.user)
        );

        setToken(data.token);
        setUser(data.user);
    };

    // Đăng xuất
    const logout = () => {
        localStorage.removeItem("foodwise_token");
        localStorage.removeItem("foodwise_user");

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoggedIn: Boolean(token && user),
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
