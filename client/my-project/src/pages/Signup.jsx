import React, { useState } from 'react'
import axios from "axios"
const Signup = () => {

    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      confirmpassword: "",
    });

     const handleChange = (e) => {
       setFormData({
         ...formData,
         [e.target.name]: e.target.value,  
       });
        console.log( e.target.value)
     };

     // handle sumit function is here
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <>
      <div className='flex item-center justify-center h-[100vh] bg-gray-300'>
        <div className="flex flex-col justify-center item-center text-center">
          <h2 className="text-2xl font-bold pb-6">SignUp</h2>
          <div>
            <form className="flex flex-col gap-y-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="border-[1px] border-gray-300 w-[300px] py-1 rounded-md pl-3"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border-[1px] border-gray-300 w-[300px] py-1 rounded-md pl-3"
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border-[1px] border-gray-300 w-[300px] py-1 rounded-md pl-3"
                onChange={handleChange}
              />
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm password"
                className="border-[1px] border-gray-300 w-[300px] py-1 rounded-md pl-3"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="py-2 px-10 bg-green-500 rounded-sm text-white font-bold w-40"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup