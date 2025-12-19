import React, { useContext, useState } from "react";
import { FaEye, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

import { IoEyeOff } from "react-icons/io5";


import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Loader from "../../Components/Loader";

const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
const { signInWithEmailAndPasswordFunc } = useContext(AuthContext);
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";



  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoading(true); 

    signInWithEmailAndPasswordFunc(email, password)
      .then(() => {
        toast.success("Sign in successful");
        navigate(from); 
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid email or password");
      })
      .finally(() => setLoading(false)); 
  };

  const handleGoogleSignIn = () => {
    setLoading(true); 
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Google Sign-In Successful");
        navigate(from);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Google Sign-In Failed");
      })
      .finally(() => setLoading(false)); 
  };

  return (
    <div className="card bg-base-100 m-10 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200">
      <div className="max-w-lg text-center lg:text-left p-5">
        <h1 className="text-2xl font-bold drop-shadow-lg text-center">
          <span className=""> Login </span> <span className='text-red-500'>to Blood{" "}</span> 
          <span className="">Donation </span>
        </h1>
      </div>

      <div className="card-body">
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input rounded focus:border-0 focus:outline-gray-200"
              placeholder="Email"
            />

            <div className="relative">
              <label className="label">Password</label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                className="w-full  p-2 rounded"
                placeholder="Password"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-[28px] top-[20px] cursor-pointer z-50 text-xl"
              >
                {showPass ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="my-btn p-2 border font-bold text-l ">Login</button>
          </fieldset>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn  bg-white rounded text-black border-[#e5e5e5]"
        >
          <FcGoogle />
          Login with Google
        </button>
        <p className="text-center">
          New to our website? Please{" "}
          <Link className="text-blue-500 hover:text-blue-800" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
