import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUI } from "./UIContext";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toggleUI } = useUI(); // 👈 close, not toggle

  // auto-login on app load
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/auth/me", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  // called after login API success
  const login = (userData) => {
    setUser(userData);
  };

  // logout user
  const logout = async () => {
    await fetch("http://localhost:5000/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    toggleUI(); // 👈 deterministic
    navigate("/login");
  };

  // update credits safely
  const updateCredits = (credits) => {
    setUser((prev) => (prev ? { ...prev, credits } : prev));
  };

  // update images safely
  const updateImages = (images) => {
    setUser((prev) => (prev ? { ...prev, images } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        updateCredits, // 👈 NEW
        updateImages,  // 👈 NEW
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
