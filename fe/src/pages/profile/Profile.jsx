import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack, IoCamera } from 'react-icons/io5';

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // TODO: Lấy dữ liệu người dùng thật từ Context/API
  const [currentUser, setCurrentUser] = useState({
    username: 'malory_doe',
    fullName: 'Malory Doe',
    gender: 'female',
    profilePic: 'https://avatar.iran.liara.run/public/31',
  });

  const [formData, setFormData] = useState({
    fullName: currentUser.fullName,
    gender: currentUser.gender,
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // State để xem trước ảnh
  const [newProfilePic, setNewProfilePic] = useState(null); // File object
  const [profilePicPreview, setProfilePicPreview] = useState(currentUser.profilePic);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (gender) => {
    setFormData({ ...formData, gender });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(file);
      // Tạo URL tạm thời để xem trước
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate mật khẩu mới
    if (formData.newPassword && (formData.newPassword !== formData.confirmPassword)) {
      alert('Mật khẩu mới không khớp!');
      return;
    }
    
    // TODO: Xử lý logic gọi API để cập nhật profile
    // Bạn sẽ cần gửi `formData` (fullName, gender)
    // và `newProfilePic` (nếu có)
    // và (oldPassword, newPassword) (nếu có)
    console.log('Đang cập nhật:', formData);
    console.log('File ảnh mới:', newProfilePic);

    alert('Cập nhật thành công! (Demo)');
    navigate('/'); // Quay về trang chủ
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      {/* Khung glassmorphism */}
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg">
        
        {/* Header với nút Back */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)} // Quay lại trang trước
            className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition duration-200"
          >
            <IoArrowBack size={24} />
          </button>
          <h2 className="text-3xl font-bold text-center text-white flex-1 -ml-10">
            Thông tin cá nhân
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Phần Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={profilePicPreview}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-lg"
              />
              {/* Nút upload ẩn */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              {/* Nút bấm để upload */}
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition duration-200 shadow-md"
                title="Đổi ảnh đại diện"
              >
                <IoCamera size={20} />
              </button>
            </div>
          </div>

          {/* Grid cho các trường thông tin */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username (Không cho sửa) */}
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Tên đăng nhập
              </label>
              <input
                type="text"
                value={currentUser.username}
                disabled
                className="w-full px-3 py-2 mt-1 text-gray-400 bg-white/5 border-b-2 border-gray-500 rounded-t-md cursor-not-allowed"
              />
            </div>

            {/* Full Name (Cho sửa) */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">
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
              />
            </div>
          </div>

          {/* Gender */}
          <div className="text-sm">
            <span className="font-medium text-gray-200">Giới tính</span>
            <div className="flex items-center mt-2 space-x-4">
              <label className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all ${formData.gender === 'male' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/20 text-gray-200 hover:bg-white/30'}`}>
                <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={() => handleGenderChange('male')} className="hidden" />
                Nam
              </label>
              <label className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-all ${formData.gender === 'female' ? 'bg-pink-600 text-white shadow-lg' : 'bg-white/20 text-gray-200 hover:bg-white/30'}`}>
                <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={() => handleGenderChange('female')} className="hidden" />
                Nữ
              </label>
            </div>
          </div>

          <hr className="border-white/20" />

          {/* Phần đổi mật khẩu */}
          <h3 className="text-xl font-semibold text-white">Đổi mật khẩu</h3>
          <div className="space-y-4">
            {/* Old Password */}
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-200"
              >
                Mật khẩu cũ
              </label>
              <input
                id="oldPassword"
                name="oldPassword"
                type="password"
                value={formData.oldPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-white placeholder-gray-400 bg-transparent border-b-2 border-gray-400 focus:border-blue-400 focus:outline-none"
                placeholder="•••••••• (Bỏ trống nếu không đổi)"
              />
            </div>
            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-200"
              >
                Mật khẩu mới
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-white placeholder-gray-400 bg-transparent border-b-2 border-gray-400 focus:border-blue-400 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            {/* Confirm New Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-200"
              >
                Xác nhận mật khẩu mới
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-white placeholder-gray-400 bg-transparent border-b-2 border-gray-400 focus:border-blue-400 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
          >
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;