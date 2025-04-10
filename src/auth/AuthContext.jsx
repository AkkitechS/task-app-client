// import { createContext, useContext, useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";
// import { USER_URLS } from "../utils/urls";
// import { encrypt } from "../utils/crypt";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);

//   const login = async (uid, password) => {
//     try {
//       const res = await api.post(USER_URLS.LOGIN, {
//         uid,
//         password,
//       });
//       const { accessToken, refreshToken, user: fetchedUser } = res.data.data;
//       const encryptedToken = encrypt(
//         JSON.stringify({ accessToken, refreshToken, fetchedUser })
//       );
//       localStorage.setItem("token", encryptedToken);
//       setUser(fetchedUser);
//       navigate("/dashboard");
//     } catch (error) {
//       console.log("LOGIN ERROR: ", error);
//       throw new Error(error.message);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/");
//   };

//   const getUser = async () => {
//     try {
//       const res = await api.get(USER_URLS.GET_USER);
//       const { data } = res.data;
//       console.log("USER DATA: ", data);
//     //   if (!data) navigate("/");
//       setUser(data);
//     } catch (error) {
//       console.log("GET USER ERROR: ", error);
//       logout();
//     }
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) getUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { USER_URLS } from "../utils/urls";
import { encrypt } from "../utils/crypt";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (uid, password) => {
    try {
      const res = await api.post(USER_URLS.LOGIN, { uid, password });
      const { accessToken, refreshToken, user: fetchedUser } = res.data.data;
      const encryptedToken = encrypt(
        JSON.stringify({ accessToken, refreshToken, fetchedUser })
      );
      localStorage.setItem("token", encryptedToken);
      setUser(fetchedUser);
      navigate("/dashboard");
    } catch (error) {
      console.error("LOGIN ERROR: ", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const getUser = async () => {
    try {
      const res = await api.get(USER_URLS.GET_USER);
      setUser(res.data.data);
    } catch (error) {
      console.error("GET USER ERROR: ", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        await getUser();
      } else {
        setLoading(false);
      }
    };
    
    validateToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
