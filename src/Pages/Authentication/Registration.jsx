import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { auth } from "../../firebase/firebase.config";

const provider = new GoogleAuthProvider();

const Registration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPass, setShowPass] = useState(false);
  const from = location.state?.from?.pathname || "/";

  const { createUserWithEmailAndPasswordFunc, UpdateProfileFunc } =
    useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    const displayName = e.target.displayName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const file = e.target.photoURL.files[0];

    if (!file) {
      toast.error("Please upload a profile image");
      return;
    }

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=9d412c4cb820cf47bc1c601591e4169d`,
      { image: file },
      {
        headers: {
          "content-Type": "multipart/form-data",
        },
      }
    );

    const mainPhotoUrl = res.data.data.display_url;
    const formData = {
      
      displayName,
      email,
      password,
      mainPhotoUrl
    };

    // validation
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).+$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must contain uppercase & lowercase letters");
      return;
    }

    // create user
    if (res.data.success == true) {
      createUserWithEmailAndPasswordFunc(email, password)
        .then((res) => {
          console.log(res);

          // update profile
          UpdateProfileFunc(displayName, mainPhotoUrl)
            .then(() => {
              axios
                .post("http://localhost:5000/user", formData)
                .then((res) => {
                  console.log(res);
                })
                .catch((error) => {
                  console.log(error);
                });
              toast.success("Profile updated");
              navigate(from);
            })
            .catch(() => toast.error("profile is not updated yeat"));
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            toast.error("Email already in use");
          } else {
            toast.error(error.message);
          }
        });
    }
  };

  // google sign in
  const handleGoogleSignIn = () => {
    signInWithPopup(auth,provider)
      .then(() => {
        toast.success("Google Sign-In Successful");
        navigate("/");
      })
      .catch(() => {
        toast.error("Google Sign-In Failed");
      });
  };

  return (
    <div className="card bg-base-100 m-10 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200">
      <div className="card-body ">
        <h1 className="text-2xl font-bold text-center">
          <span className="">Register</span> for Blood
          <span className="text-red-500"> Donation</span>
        </h1>

        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="displayName"
              className="input rounded "
              placeholder="Your Name"
            />

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input rounded"
              placeholder="Email"
            />

            <label className="label">PhotoURL</label>
            <input
              type="file"
              name="photoURL"
              className="input rounded"
              placeholder="Photo URL"
            />
            {/* password */}

            <div className="relative">
              <label className="label">Password</label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                className="w-full p-2 rounded"
                placeholder="Password"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-[28px] top-[30px] cursor-pointer text-xl"
              >
                {showPass ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>

            <button className="my-btn p-2 mt-4 font-bold text-l border">
              Register
            </button>
          </fieldset>
        </form>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="btn bg-white rounded text-black border-[#e5e5e5]"
        >
          <FcGoogle /> Login with Google
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-blue-500 hover:text-blue-800" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
