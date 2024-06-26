import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";


function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => { //토큰을 이용해 user 정보를 가져온다

    try{
      const storedToken = sessionStorage.getItem('token');
      if(storedToken){
        const response = await api.get("/user/me")
        setUser(response.data.user);
        console.log(response);
      }



    }catch(error){
      setUser(null);
    }
  };

  useEffect(()=> {
    getUser()
  },[])


  

  return (
    <Routes>
      <Route path="/" 
      element={
      <PrivateRoute user = {user}>
      <TodoPage user = {user} setUser={setUser}/>
      </PrivateRoute> //유저 정보가 있으면  -> todo page.  없으면 -> login
    } 
    />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage user = {user} setUser={setUser}/>} />
    </Routes>
  );
}

export default App;
