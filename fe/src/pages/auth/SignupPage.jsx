import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Giả sử bạn dùng React Router
import useSignup from '../../hooks/auth/useSignup';

const Signup = () => {

  const {signup} = useSignup()

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: '', // 'male' hoặc 'female'b
  });

  const handleChange = async(e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (gender) => {
    setFormData({ ...formData, gender });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    
    await signup(formData)
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white">
          Tạo tài khoản
        </h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-200"
            >
              Họ và tên
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-white placeholder-gray-400 bg-transparent border-b-2 border-gray-400 focus:border-blue-400 focus:outline-none"
              placeholder="Nguyen Van A"
            />
          </div>

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
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-white placeholder-gray-400 bg-transparent border-b-2 border-gray-400 focus:border-blue-400 focus:outline-none"
              placeholder="nguyenvana"
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
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-white placeholder-gray-400 bg-transparent border-b-2 border-gray-400 focus:border-blue-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-200"
            >
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-white placeholder-gray-400 bg-transparent border-b-2 border-gray-400 focus:border-blue-400 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Gender */}
          <div className="text-sm">
            <span className="font-medium text-gray-200">Giới tính</span>
            <div className="flex items-center mt-2 space-x-4">
              <label
                className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all ${
                  formData.gender === 'male'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/20 text-gray-200 hover:bg-white/30'
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={() => handleGenderChange('male')}
                  className="hidden" // Ẩn radio button gốc
                />
                Nam
              </label>
              <label
                className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all ${
                  formData.gender === 'female'
                    ? 'bg-pink-600 text-white shadow-lg'
                    : 'bg-white/20 text-gray-200 hover:bg-white/30'
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={() => handleGenderChange('female')}
                  className="hidden" // Ẩn radio button gốc
                />
                Nữ
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Đăng ký
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-sm text-center text-gray-300">
          Đã có tài khoản?{' '}
          <Link
            to="/login" // Đường dẫn tới trang Đăng nhập
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;