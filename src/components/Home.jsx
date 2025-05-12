import React, { useEffect, useState } from "react";
import { supabase } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [loading, setloading] = useState(true);
  const [User, setUser] = useState(null);
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        toast.error("Please Login First");
        navigate("/sign-in");
      }

      setUser(user);
    } catch (error) {
      toast.error(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      console.log(error);
      if (error) {
        throw error;
      }
      setloading(true);
      toast.success("Loged Out Successfully!");
      navigate("/sign-in");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // CRUD Operations
  const [cform, setcform] = useState({ cname: "", cemail: "" });
  const handleinput = (e) => {
    setcform({ ...cform, [e.target.name]: e.target.value });
  };
  const handleformSubmit = (e) => {
    e.preventDefault();
    try {
      if (!cform.cname || !cform.cemail) {
        toast.error("All fields required!");
        return;
      }
      handleCreateClient();
      toast.success("Data Submitted Successfully");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleCreateClient = async () => {
    const { data, error } = await supabase
      .from("Clients")
      .insert([{ name: cform.cname, email: cform.cemail }])
      .select();
  };

  const [read, setread] = useState(false);
  const [Clients, setClients] = useState(null);
  const handleReadClients = async () => {
    try {
      const { data: clients, error } = await supabase
        .from("Clients")
        .select("*");
      if (error) {
        throw error;
      }
      console.log("Hello data: ");
      setClients(clients);
      console.log(clients);
      setread(!read);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateClient = async () => {
    try {
      const { data, error } = await supabase
        .from("Clients")
        .update({ name: "NewAsghar" })
        .eq("user_id", "a478e385-9f02-47ac-8f82-3b8ddc16e5a9");
      if (error) {
        throw error;
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteClient = async () => {
    try {
      const { data, error } = await supabase
        .from("Clients")
        .delete()
        .eq("user_id", "a478e385-9f02-47ac-8f82-3b8ddc16e5a9");

      if (error) {
        throw error;
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  const getSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  getSession();
  // useEffect(() => {
  //   getSession();
  // }, []);

  return (
    <>
      {/* First Part */}
      <div className="mt-10 grid grid-cols-2 gap-4 p-4 border rounded-lg w-fit bg-white shadow">
        <div className="font-semibold text-gray-700">Name:</div>
        <div className="text-gray-900">{User.user_metadata.full_name}</div>
        <div className="font-semibold text-gray-700">Email:</div>
        <div className="text-gray-900">{User.email}</div>
        <div className="col-span-2 flex justify-end">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Second Part */}
      {/* Create */}
      <div className="mt-10 ml-36 flex gap-6">
        {/* First Card */}
        <div className="bg-white p-4 rounded shadow w-full max-w-md">
          <div className="text-xl font-semibold text-gray-800 mb-4">
            Create New User
          </div>
          <form onSubmit={handleformSubmit} className="space-y-4">
            <div>
              <label htmlFor="cname" className="block font-semibold">
                Enter Client Name:
              </label>
              <input
                onChange={handleinput}
                type="text"
                name="cname"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label htmlFor="cemail" className="block font-semibold">
                Enter Client Email:
              </label>
              <input
                onChange={handleinput}
                type="email"
                name="cemail"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Read */}
      <div className="mt-6">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow"
          onClick={handleReadClients}
        >
          Read Data
        </button>
      </div>

      {read && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">User ID</th>
                <th className="border px-4 py-2">Client ID</th>
              </tr>
            </thead>
            <tbody>
              {Clients.map((client) => (
                <tr key={client.user_id}>
                  <td className="border px-4 py-2">{client.name}</td>
                  <td className="border px-4 py-2">{client.email}</td>
                  <td className="border px-4 py-2">{client.user_id}</td>
                  <td className="border px-4 py-2">{client.c_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded shadow"
        onClick={handleUpdateClient}
      >
        Update Data
      </button>

      <button
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded shadow"
        onClick={handleDeleteClient}
      >
        Delete Data
      </button>
    </>
  );
};

export default Home;
