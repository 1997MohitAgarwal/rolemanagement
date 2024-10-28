import React, { useState,useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Eye icons from React Icons
import { useDispatch,useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { RootState } from "../store/store";

// Define the shape of the response data from the API
interface LoginResponse {
  username: string;
  role: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { role } = useSelector((state: RootState) => state.user);

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://f2ed36a4mh.execute-api.ap-south-1.amazonaws.com/"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data: LoginResponse = await response.json();
      dispatch(setUser({ username: data.username, role: data.role }));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (role) {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }
  }, [role]); // Dependencies include role and navigate

  return (
    <div className="flex h-screen">
      {/* Left Part - Organization Image */}
      <div className="flex-1 bg-gray-200 flex items-center justify-center">
        <img
          src="/assets/images/organisation.jpg" // Replace with your image path
          alt="Organization"
          className="object-cover w-full h-full max-h-screen"
        />
      </div>
      {/* Right Part - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div>
          <h1 className="text-4xl font-bold mb-6 text-center mb-10">
            Welcome Again,
          </h1>
          <div className="bg-white rounded-lg p-6 w-96 border-2">
            <h1 className="text-2xl font-bold mb-6 text-center">Login Page</h1>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded"
            />
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3"
              >
                {showPassword ? (
                  <AiFillEyeInvisible className="h-5 w-5 text-gray-500" />
                ) : (
                  <AiFillEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <button
              onClick={handleLogin}
              className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
