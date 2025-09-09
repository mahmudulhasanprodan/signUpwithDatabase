import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);    
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token); // save token
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  
  };

  return (
    <>
      <div className="flex pt-20 justify-center h-[100vh] bg-gray-300">
        <div className="flex flex-col justify-center text-center bg-slate-700 px-4 h-[250px] py-4 rounded-md">
          <h2 className="text-2xl font-bold pb-6 text-white">Login</h2>
         <form onSubmit={handleSubmit}>
           <div className="flex flex-col gap-y-3">
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
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="py-2 px-10 bg-green-500 rounded-sm text-white font-bold w-40 "
            >
              Login
            </button>
          </div>
         </form>
        </div>
      </div>
    </>
  );
}

export default Login