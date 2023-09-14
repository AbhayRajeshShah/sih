import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./index.scss";

const SignupDefaultPage = () => {
  const cookies = new Cookies();
  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Convert value to uppercase if it's the 'Reference' field
    const newValue = name === "Reference" ? value.toUpperCase() : value;

    // Update the appropriate state based on the input field's name
    if (
      name === "cust_name" ||
      name === "email" ||
      name === "password" ||
      name === "Reference" ||
      name === "phnum"
    ) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    } else if (name === "admin_name") {
      setFormData((prevData) => ({
        ...prevData,
        admin_name: newValue, // Update admin_name in formData
      }));
    }
  };

  const [formData, setFormData] = useState({
    cust_name: "",
    email: "",
    password: "",
    Reference: "",
    admin_name: "",
    phnum: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/add-customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("formdata", formData);
      if (response.ok) {
        alert("Customer added successfully!");
        // Clear the form or navigate to a success page
        let expDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        console.log(expDate);
        cookies.set("userMail", formData.email, {
          expires: expDate,
        });
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div className="sign">
      <div className="imgLeft">
        <img src="images/img_group7.svg" alt="" srcSet="" />
      </div>
      <div className="rightForm">
        <form action="" onSubmit={handleSubmit}>
          <p className="head">Get your free proapplicants account now!</p>
          <div className="line">
            <div className="vertical-form">
              <p>Name</p>
              <input
                required
                type="text"
                name="cust_name"
                value={formData.cust_name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="vertical-form">
              <p>Email</p>
              <input
                required
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="line">
            <div className="vertical-form">
              <p>Phone Number</p>
              <input
                required
                type="tel"
                value={formData.phnum || ""}
                onChange={handleInputChange}
                name="phnum"
                id=""
              />
            </div>
          </div>
          <div className="line">
            <div className="vertical-form">
              <p>Password</p>
              <input
                required
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="line">
            <div className="vertical-form">
              <p>Reference</p>
              <input
                type="text"
                name="Reference"
                value={formData.Reference}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="line">
            <button type="submit" className="signBtn">
              Sign Up
            </button>
          </div>
          <span>Already Have An Account ?</span>
          <Link to={"/signin"}>Login</Link>
        </form>
      </div>
    </div>
  );
};

export default SignupDefaultPage;
