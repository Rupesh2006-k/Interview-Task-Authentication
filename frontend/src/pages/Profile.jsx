import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../config/axiosInstance";

const fetchProfile = () =>
  axiosInstance
    .get("/auth/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => res.data.user);

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    enabled: !!token,
    retry: false,
  });

  if (!token) {
    navigate("/login");
    return null;
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-red-400">
        Failed to load profile
      </div>
    );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 p-4">
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-200">
        
        {/* Header */}
        <div className="bg-black text-white p-6 rounded-t-2xl">
          <h1 className="text-2xl font-bold tracking-wide">
            Profile
          </h1>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          
          <div>
            <p className="text-xs uppercase text-gray-500 font-semibold mb-1">
              Name
            </p>
            <p className="text-lg text-gray-900 font-medium">
              {user?.name}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase text-gray-500 font-semibold mb-1">
              Email
            </p>
            <p className="text-lg text-gray-900 break-all">
              {user?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Logout
          </button>

        </div>
      </div>
    </div>
  );
};

export default Profile;