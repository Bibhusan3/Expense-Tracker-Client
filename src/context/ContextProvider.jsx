import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const setUserAndStore = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);



    return (
        <AuthContext.Provider value={{ user, setUserAndStore }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}
