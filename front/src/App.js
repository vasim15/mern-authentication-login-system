import { createContext, useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import AboutUs from "./pages/AboutUs";
import User from "./pages/User";
import Login from "./pages/Login";
import Register from "./pages/Register";
export const url = "http://localhost:4000";


export const UserContext = createContext();
export const AuthContext = createContext();
function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [about, setAbout] = useState(null);
  const [authData, setAuthData] = useState({
    isAuth: !!localStorage.getItem("accessToken")
  });
  useEffect(() => {
    if(!authData.isAuth)return
    (async () => {
      const res = await fetch(url+"/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      if(data.message){
        logout();
      }
      // console.log('users',data);
      setUsers(data);
    })();
    (async () => {
      const res = await fetch(url+"/api/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      if (data.message) {
        logout();
      }
      // console.log("user", data);
      setAbout(data);
    })();
  
    return () => {
      setUsers([]);
      setAbout(null)
    };
  }, [authData]);
  const logout=()=>{
    setAuthData({isAuth: false})
    localStorage.clear();
  } 

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{authData,setAuthData}}>
        <UserContext.Provider value={{ users, setUsers, user, setUser, about, setAbout }}>
          <Container>
            <Routes>
              <Route path="/" element={<Protected element={<Layout />} />}>
                <Route path="/" element={<Home />} />
                <Route path="about-us" element={<AboutUs />} />
                <Route path="users" element={<User />} />
              </Route>
              <Route path="/login" element={<Guest element={<Outlet />} />}>
                <Route path="/login" element={<Login />} />
              </Route>
              <Route path="/register" element={<Guest element={<Outlet />} />}>
                <Route path="/register" element={<Register />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Container>
        </UserContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

const Protected = ({ element }) => {
  const { authData } = useContext(AuthContext);
  return authData.isAuth ? (
    element
  ) : (
    <Navigate to="login" state={{ from: "location" }} />
  );
};

const Guest = ({ element }) => {
  const {authData} = useContext(AuthContext);
  return !authData.isAuth ? element : <Navigate to="/" state={{ from: "location" }} />;
};

export default App;
