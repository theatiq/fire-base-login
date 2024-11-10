import React, { useState } from "react";
import { auth } from "../firebase.init";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeLowVision } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Signup = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    // https://i.ibb.co.com/S3WRWw3/photo-atiqur.jpg (My Photo Url)
    const terms = e.target.terms.checked;
    if (password.length < 6) {
      setErrorMessage("Password should be 6 character or long");
      return;
    }

    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!regex.test(password)) {
      setErrorMessage(
        "Password should have  at least 1 uppercase 1 lower case 1 number 1 special character min length 6"
      );
      return;
    }
    setErrorMessage("");
    setSuccess(false);
    if (!terms) {
      setErrorMessage("Please accept our terms and conditions");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Verification mail sent");
        });

        const profile = {
          displayName: name,
          photoURL: photo,
        };
        updateProfile(auth.currentUser, profile)
          .then(() => {
            console.log("User profile updated");
          })
          .catch((error) => {
            console.log("Update Error");
          });
      })

      .catch((error) => {
        console.log(error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-5xl font-bold">Sign up now!</h1>
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="name"
            name="name"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="text"
            placeholder="photo"
            name="photo"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            name="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="btn btn-xs absolute right-4 top-12"
          >
            {showPassword ? <FaEyeLowVision /> : <IoEyeSharp />}
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              name="terms"
              className="checkbox checkbox-primary"
            />
            <span className="label-text">Accept our Terms & Conditions</span>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign up</button>
        </div>
      </form>
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}
      {success && <p className="text-green-500">Sign up successful</p>}
      <p>
        Already have account, Please <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Signup;
