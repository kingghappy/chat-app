import React from 'react';
import SearchInput from './SearchInput';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';

const Sidebar = () => {
  return (
    // Component cha đã có: w-[350px] p-4 flex flex-col bg-black/20
    // Chúng ta sẽ điều chỉnh lại padding và flex
    <div className="w-[350px] p-4 flex flex-col bg-black/20">
      
      {/* Thanh tìm kiếm */}
      <SearchInput />

      {/* Đường kẻ phân cách */}
      <div className="border-b-[1px] border-gray-500 my-4 opacity-50"></div>

      {/* Danh sách hội thoại 
        - flex-1: Chiếm hết không gian còn lại
        - overflow-y-auto: Tự động thêm thanh cuộn nếu danh sách quá dài
      */}
      <div className="flex-1 overflow-y-auto pr-2">
        <Conversations />
      </div>

      {/* Nút Đăng xuất */}
      <div className="mt-4 pt-4 border-t-[1px] border-gray-500 opacity-50">
        <LogoutButton />
      </div>

    </div>
  );
};

export default Sidebar;