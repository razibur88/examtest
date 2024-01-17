import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();
  const auth = getAuth();
  let handleEmail = (e) => {
    setEmail(e.target.value);
  };
  let handlePassword = (e) => {
    setPassword(e.target.value);
  };

  let handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail("");
        setPassword("");
      })
      .then(() => {
        toast("Go to Home page");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div className="text-center mt-10">
      <h2 className="mb-5">Login </h2>
      <ToastContainer />
      <div className="my-4">
        <input
          type="email"
          placeholder="Email"
          className="w-96 h-10 border-2"
          onChange={handleEmail}
          value={email}
        />
      </div>
      <div className="">
        <input
          type="password"
          placeholder="password"
          className="border-2 h-10 w-96 "
          onChange={handlePassword}
          value={password}
        />
      </div>
      <div className="mt-5">
        <button onClick={handleLogin} className="p-3 bg-[tomato] text-white">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
