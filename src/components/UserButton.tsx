import React, { useState, useRef, useEffect } from 'react'

// Types
interface FriendRequest {
  id: string
  name: string
  avatar: string
  mutualFriends: number
  timestamp: string
}

interface Friend {
  id: string
  name: string
  avatar: string
  status: 'online' | 'offline'
  lastSeen?: string
}

interface UserButtonProps {
  friendRequests?: FriendRequest[]
  friends?: Friend[]
}

const UserButton: React.FC<UserButtonProps> = ({ friendRequests = [], friends = [] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Dữ liệu mẫu
  const sampleFriendRequests: FriendRequest[] = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      avatar: 'https://i.pravatar.cc/150?img=1',
      mutualFriends: 5,
      timestamp: '2 phút trước'
    },
    {
      id: '2',
      name: 'Trần Thị B',
      avatar: 'https://i.pravatar.cc/150?img=2',
      mutualFriends: 3,
      timestamp: '10 phút trước'
    }
  ]

  const sampleFriends: Friend[] = [
    {
      id: '1',
      name: 'Lê Văn C',
      avatar: 'https://i.pravatar.cc/150?img=3',
      status: 'online'
    },
    {
      id: '2',
      name: 'Phạm Thị D',
      avatar: 'https://i.pravatar.cc/150?img=4',
      status: 'offline',
      lastSeen: '2 giờ trước'
    },
    {
      id: '3',
      name: 'Hoàng Văn E',
      avatar: 'https://i.pravatar.cc/150?img=5',
      status: 'online'
    }
  ]

  const displayedFriendRequests = friendRequests.length > 0 ? friendRequests : sampleFriendRequests
  const displayedFriends = friends.length > 0 ? friends : sampleFriends

  const pendingRequestsCount = displayedFriendRequests.length

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Nút thông báo với badge */}
      <button
        title="Friends"
        className="relative text-xl hover:text-blue-500 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        style={{ lineHeight: 0 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>

        {/* Badge đỏ với số lượng */}
        {pendingRequestsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {pendingRequestsCount}
          </span>
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Lời mời kết bạn</h3>

            {/* Danh sách lời mời kết bạn */}
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {displayedFriendRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    <img src={request.avatar} alt={request.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-sm">{request.name}</p>
                      <p className="text-xs text-gray-500">{request.mutualFriends} bạn chung</p>
                      <p className="text-xs text-gray-400">{request.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600">
                      Chấp nhận
                    </button>
                    <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs hover:bg-gray-300">
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Separator */}
            <div className="my-4 border-t border-gray-200"></div>

            {/* Danh sách bạn bè */}
            <h3 className="font-semibold text-gray-800 mb-3">Bạn bè</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {displayedFriends.map((friend) => (
                <div key={friend.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <div className="relative">
                    <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full object-cover" />
                    {/* Dot trạng thái online/offline */}
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    ></div>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="font-medium text-sm">{friend.name}</p>
                    <p className="text-xs text-gray-500">
                      {friend.status === 'online' ? 'Đang hoạt động' : `Hoạt động ${friend.lastSeen}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer với link xem tất cả */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <a href="/friends" className="text-blue-500 text-sm hover:underline text-center block">
                Xem tất cả bạn bè
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserButton
