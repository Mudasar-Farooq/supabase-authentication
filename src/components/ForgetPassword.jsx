import { React, useState } from "react";
import { toast } from "react-toastify";
import { supabase } from "../config.js";

const ForgetPassword = () => {
  const [loading, setloading] = useState(false);
  const [scndcmpt, setscndcmpt] = useState(false);
  const [form, setform] = useState({
    email: "",
  });

  const onChangeHandler = (e) =>
    setform({ ...form, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!form.email) {
        toast.error("Please Enter Email!");
        return;
      }
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        form.email,
        {
          redirectTo: "http://localhost:5173/update-password",
        }
      );
      if (error) {
        throw error;
      }
      console.log(data);
      setloading(true);
      setscndcmpt(true);
      console.log(data);

      setform({
        email: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (scndcmpt) {
    return (
      <div className="mt-36 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-md text-sm w-fit mx-auto my-4 shadow">
        If an account with that email exists, we've sent a reset password link.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forget Password</h2>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Enter Email to Verify:
            </label>
            <input
              onChange={onChangeHandler}
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
