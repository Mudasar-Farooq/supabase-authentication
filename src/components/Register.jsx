import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { supabase } from "../config.js";

const Register = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) =>
    setform({ ...form, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!form.name || !form.email || !form.password) {
        toast.error("All Fields are required!");
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.name,
          },
        },
      });

      console.log({ data, error });
      if (error) {
        throw error;
      }
      setloading(true);

      setform({
        name: "",
        email: "",
        password: "",
      });
      navigate("/");
      toast.success("Registered Successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  const navigateToSign = () => {
    navigate("/sign-in");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <form onSubmit={onSubmitHandler} className="">
          <div className="mb-4 flex-col items-start justify-start">
            <label className=" text-gray-700 mb-1">Name</label>
            <input
              onChange={onChangeHandler}
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              onChange={onChangeHandler}
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              onChange={onChangeHandler}
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Register
          </button>
        </form>
        <div>
          Already have an account?:
          <button onClick={navigateToSign} className="text-green-500">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
