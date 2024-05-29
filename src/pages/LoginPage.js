import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginPage = ({user, setUser}) => {
  const [email, setEmail] =useState('');
  const [password, setPassword] =useState('');
  const [error,setError] = useState('');  // error를 저장해야지 보여준다..?
  const navigate = useNavigate();


  const handleSubmit = async (event) =>{
    event.preventDefault();
    try{
      const response = await api.post("/user/login", {email,password});
        if(response.status === 200){
          setUser(response.data.user)
          sessionStorage.setItem("token", response.data.token);
          api.defaults.headers["authorization"] = "Bearer " + response.data.token; //토큰 값을 헤더에 저장해준다 ==>  다시 공부!!!!!!!
          setError("")
          navigate('/');

        }
        throw new Error(response.message); 
        
      
    }catch(error){
      setError(error.message);
    }
  };

if(user){
  return <Navigate to = "/"/> 
} 

  

  return (
    <div className="display-center">
      {error && <div className="error-message">{error}</div>}
      <Form className="login-box" onSubmit={handleSubmit} > 
      
        <h1>Sign In</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            New to Todo App? <Link to="/register">Sign up now</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
