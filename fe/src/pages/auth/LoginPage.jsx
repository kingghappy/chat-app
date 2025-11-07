import React, { useState } from "react";
import { Link } from "react-router-dom"; // Giả sử bạn dùng React Router để điều hướng
import useLogin from "./../../hooks/auth/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      
      <div className="w-full max-w-md p-8 space-y-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">
          Chào mừng trở lại!
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-200"
            >
              Tên đăng nhập
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white placeholder-gray-400 bg-transparent border-b-2 border-gray-400 focus:border-blue-400 focus:outline-none"
              placeholder="nhaptaikhoan"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white placeholder-gray-400 bg-transparent border-b-2 border-gray-400 focus:border-blue-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Đăng nhập
          </button>
        </form>

        {/* Link to Signup */}
        <p className="text-sm text-center text-gray-300">
          Chưa có tài khoản?{" "}
          <Link
            to="/signup" // Đường dẫn tới trang Đăng ký
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
