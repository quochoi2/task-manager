import React, { useState, useRef, useEffect } from 'react'

// Types
interface Message {
  id: string
  sender: {
    id: string
    name: string
    avatar: string
    status: 'online' | 'offline'
  }
  content: string
  timestamp: string
  isRead: boolean
  isGroup?: boolean
  groupName?: string
}

interface MessageButtonProps {
  messages?: Message[]
  initialUnreadCount?: number
}

const MessageButton: React.FC<MessageButtonProps> = ({ messages = [], initialUnreadCount = 3 }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount)
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

  // Dữ liệu mẫu tin nhắn
  const sampleMessages: Message[] = [
    {
      id: '1',
      sender: {
        id: 'user1',
        name: 'Nguyễn Văn A',
        avatar: 'https://i.pravatar.cc/150?img=1',
        status: 'online'
      },
      content: 'Bạn có thời gian review task mình vừa gửi không?',
      timestamp: '2 phút trước',
      isRead: false
    },
    {
      id: '2',
      sender: {
        id: 'user2',
        name: 'Trần Thị B',
        avatar: 'https://i.pravatar.cc/150?img=2',
        status: 'online'
      },
      content: 'Meeting chiều nay dời sang 3h nhé!',
      timestamp: '15 phút trước',
      isRead: false
    },
    {
      id: '3',
      sender: {
        id: 'user3',
        name: 'Lê Văn C',
        avatar: 'https://i.pravatar.cc/150?img=3',
        status: 'offline'
      },
      content: 'Tài liệu bạn cần đã gửi trong email rồi nhé',
      timestamp: '1 giờ trước',
      isRead: true
    },
    {
      id: '4',
      isGroup: true,
      sender: {
        id: 'group1',
        name: 'Nhóm Dev Team',
        avatar: 'https://i.pravatar.cc/150?img=4',
        status: 'online'
      },
      content: 'Mọi người cho ý kiến về design mới nhé',
      timestamp: '2 giờ trước',
      isRead: false,
      groupName: 'Dev Team'
    },
    {
      id: '5',
      sender: {
        id: 'user4',
        name: 'Phạm Thị D',
        avatar: 'https://i.pravatar.cc/150?img=5',
        status: 'offline'
      },
      content: 'Cảm ơn bạn đã hỗ trợ hôm qua!',
      timestamp: '5 giờ trước',
      isRead: true
    }
  ]

  const displayedMessages = messages.length > 0 ? messages : sampleMessages

  // Xử lý khi click vào nút tin nhắn
  const handleMessageClick = () => {
    setIsOpen(!isOpen)
    if (unreadCount > 0 && !isOpen) {
      // Reset số tin nhắn chưa đọc khi mở dropdown lần đầu
      setUnreadCount(0)

      // Cập nhật trạng thái đã đọc cho tất cả tin nhắn
      displayedMessages.forEach((message) => {
        message.isRead = true
      })
    }
  }

  // Xử lý khi click vào một tin nhắn cụ thể
  const handleSingleMessageClick = (id: string) => {
    // Đánh dấu tin nhắn là đã đọc
    const message = displayedMessages.find((m) => m.id === id)
    if (message && !message.isRead) {
      message.isRead = true
      setUnreadCount((prev) => prev - 1)
    }
  }

  // Format nội dung tin nhắn (cắt ngắn nếu quá dài)
  const formatMessageContent = (content: string, maxLength: number = 60) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + '...'
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Nút tin nhắn với badge */}
      <button
        title="Tin nhắn"
        className="relative text-xl hover:text-blue-500 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={handleMessageClick}
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
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
          />
        </svg>

        {/* Badge đỏ với số lượng tin nhắn chưa đọc */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown menu tin nhắn */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Tin nhắn</h3>
              {unreadCount > 0 && (
                <button className="text-blue-500 text-sm hover:underline" onClick={() => setUnreadCount(0)}>
                  Đánh dấu đã đọc tất cả
                </button>
              )}
            </div>

            {/* Danh sách tin nhắn */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {displayedMessages.length > 0 ? (
                displayedMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                      !message.isRead ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => handleSingleMessageClick(message.id)}
                  >
                    {/* Avatar người gửi */}
                    <div className="relative mr-3">
                      <img
                        src={message.sender.avatar}
                        alt={message.sender.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {/* Dot trạng thái online/offline */}
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          message.sender.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      ></div>
                    </div>

                    {/* Nội dung tin nhắn */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm text-gray-900 truncate">
                          {message.isGroup ? (
                            <span className="flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 mr-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.25 0 2.25 2.25 0 0 1 4.25 0Zm-13.5 0a2.25 2.25 0 1 1-4.25 0 2.25 2.25 0 0 1 4.25 0Z"
                                />
                              </svg>
                              {message.sender.name}
                            </span>
                          ) : (
                            message.sender.name
                          )}
                        </p>
                        <p className="text-xs text-gray-400 ml-2 whitespace-nowrap">{message.timestamp}</p>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{formatMessageContent(message.content)}</p>
                    </div>

                    {/* Dot chỉ thị chưa đọc */}
                    {!message.isRead && <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></div>}
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">Không có tin nhắn nào</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MessageButton
