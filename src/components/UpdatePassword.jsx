import { React, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config.js";
const UpdatePassword = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [form, setform] = useState({
    password: "",
    password2: "",
  });

  const onChangeHandler = (e) =>
    setform({ ...form, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!form.password || !form.password2) {
        toast.error("All Fields are required");
        return;
      }
      if (form.password != form.password2) {
        toast.error("Please enter the same password again");
        return;
      }
      const { error } = await supabase.auth.updateUser({
        password: form.password,
      });
      if (error) {
        throw error;
      }
      setloading(true);

      setform({
        email: "",
      });
      toast.success("Password Updated Successfully and LogedIn!");
      navigate("/");
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

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Password</h2>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Enter Password</label>
            <input
              onChange={onChangeHandler}
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">ReEnter Password</label>
            <input
              onChange={onChangeHandler}
              type="password"
              name="password2"
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
