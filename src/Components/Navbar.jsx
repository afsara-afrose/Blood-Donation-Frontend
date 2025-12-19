import { Link, Navigate, NavLink } from "react-router";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import logo from "../assets/logo.jpg";
import defaultimg from "../assets/defaultimg.jpg"

const Navbar = () => {
  const { user, signoutUserFunc, loading } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const handleLogOut = (e) => {
    e.preventDefault();
    signoutUserFunc()
      .then(() => {
        setOpen(false);
        Navigate("/login");
      })
      .catch((err) => toast.error(err.message));
    console.log(loading);
  };
  return (
    <div className="navbar bg-red-50 shadow-sm px-20">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu  menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-l mr-3 hover:bg-red-400 text-red-600 font-semibold border border-b-rose-600"
                  : "font-semibold ml-3 text-red-600 hover:bg-red-400"
              }
            >
              Home
            </NavLink>
            </li>
            <li>
             <NavLink
              to="/donation-request"
              className={({ isActive }) =>
                isActive
                  ? "text-l hover:bg-red-400 text-red-600 font-bold border border-b-rose-600"
                  : "font-semibold mr-3 hover:bg-red-400"
              }
            >
              Donation Request
            </NavLink>
            </li>
            <li>
            <NavLink
              to="/funding"
              className={({ isActive }) =>
                isActive
                  ? "text-l hover:bg-red-400 text-red-600 font-bold border border-b-rose-600"
                  : "font-bold mr-3 hover:bg-red-400"
              }
            >
             Funding
            </NavLink>
          </li>
            
          </ul>
        </div>
        <div>
         <NavLink to='/'>
           <img src={logo} className="w-[65px] rounded-xl" alt="" />
         </NavLink>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        {loading?(
          <Loader />
        ): user? (
          <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-l hover:bg-red-400 text-red-600 font-semibold border border-b-rose-600"
                  : "font-bold mr-3 hover:bg-red-400"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/donation-request"
              className={({ isActive }) =>
                isActive
                  ? "text-l hover:bg-red-400 text-red-600 font-bold border border-b-rose-600"
                  : "font-bold mr-3 hover:bg-red-400"
              }
            >
              Donation Request
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/funding"
              className={({ isActive }) =>
                isActive
                  ? "text-l hover:bg-red-400 text-red-600 font-bold border border-b-rose-600"
                  : "font-bold mr-3 hover:bg-red-400"
              }
            >
             Funding
            </NavLink>
          </li>
         
        </ul>
        ):(
          <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-l hover:bg-red-400 text-red-600 font-semibold border border-b-rose-600"
                  : "font-bold mr-3 hover:bg-red-400"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/donation-request"
              className={({ isActive }) =>
                isActive
                  ? "text-l hover:bg-red-400 text-red-600 font-bold border border-b-rose-600"
                  : "font-bold mr-3 hover:bg-red-400"
              }
            >
              Donation Request
            </NavLink>
          </li>
         
        </ul>)}
        
      </div>
      <div className="navbar-end">
        {loading ? (
          <Loader />
        ) : user ? (
          <div className="relative">
            <img
              src={user?.mainPhotoUrl || defaultimg}  
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer border"
              onClick={() => setOpen(!open)}
            />

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-12 bg-white shadow-lg border rounded-lg w-56 p-4 z-50">
                <div className="mb-3">
                  <p className="font-semibold text-gray-700">
                    {user.displayName}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <hr className="my-2" />

                <ul className="space-y-2">
                  

                  <li>
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 hover:bg-gray-100 rounded"
                      onClick={() => setOpen(false)}
                    >
                     Dashboard
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogOut}
                      className="w-full text-left px-3 py-2 hover:bg-blue-200 text-red-600 rounded"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-pink-600"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
