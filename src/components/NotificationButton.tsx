import React, { useState, useRef, useEffect } from 'react'

// Types
interface TaskNotification {
  id: string
  type: 'task_added' | 'task_updated' | 'task_deleted' | 'task_completed' | 'task_expired'
  taskTitle: string
  message: string
  timestamp: string
  isRead: boolean
  projectName?: string
  taskId: string
}

interface NotificationButtonProps {
  notifications?: TaskNotification[]
  initialUnreadCount?: number
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ notifications = [], initialUnreadCount = 3 }) => {
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

  // Dữ liệu mẫu cho task notifications
  const sampleTaskNotifications: TaskNotification[] = [
    {
      id: '1',
      type: 'task_added',
      taskTitle: 'Thiết kế giao diện dashboard',
      message: 'Task mới đã được thêm vào dự án "Website Task Manager"',
      timestamp: '5 phút trước',
      isRead: false,
      projectName: 'Website Task Manager',
      taskId: 'task-001'
    },
    {
      id: '2',
      type: 'task_updated',
      taskTitle: 'Phát triển API authentication',
      message: 'Task đã được cập nhật thông tin',
      timestamp: '15 phút trước',
      isRead: false,
      projectName: 'Backend System',
      taskId: 'task-002'
    },
    {
      id: '3',
      type: 'task_deleted',
      taskTitle: 'Fix lỗi responsive',
      message: 'Task đã bị xóa khỏi dự án',
      timestamp: '1 giờ trước',
      isRead: false,
      projectName: 'Mobile App',
      taskId: 'task-003'
    },
    {
      id: '4',
      type: 'task_expired',
      taskTitle: 'Review code pull request',
      message: 'Task đã quá hạn hoàn thành',
      timestamp: '2 giờ trước',
      isRead: true,
      projectName: 'Development Team',
      taskId: 'task-004'
    },
    {
      id: '5',
      type: 'task_completed',
      taskTitle: 'Deploy lên production',
      message: 'Task đã được hoàn thành',
      timestamp: '3 giờ trước',
      isRead: true,
      projectName: 'DevOps',
      taskId: 'task-005'
    }
  ]

  const displayedNotifications = notifications.length > 0 ? notifications : sampleTaskNotifications

  // Xử lý khi click vào nút thông báo
  const handleNotificationClick = () => {
    setIsOpen(!isOpen)
    if (unreadCount > 0 && !isOpen) {
      // Reset số thông báo chưa đọc khi mở dropdown lần đầu
      setUnreadCount(0)

      // Cập nhật trạng thái đã đọc cho tất cả thông báo
      displayedNotifications.forEach((notification) => {
        notification.isRead = true
      })
    }
  }

  // Xử lý khi click vào một thông báo cụ thể
  const handleSingleNotificationClick = (id: string) => {
    // Đánh dấu thông báo là đã đọc
    const notification = displayedNotifications.find((n) => n.id === id)
    if (notification && !notification.isRead) {
      notification.isRead = true
      setUnreadCount((prev) => prev - 1)
    }
  }

  // Lấy icon và màu sắc theo loại thông báo task
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task_added':
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ),
          color: 'text-green-500'
        }
      case 'task_updated':
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          ),
          color: 'text-blue-500'
        }
      case 'task_deleted':
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          ),
          color: 'text-red-500'
        }
      case 'task_completed':
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          ),
          color: 'text-purple-500'
        }
      case 'task_expired':
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
              />
            </svg>
          ),
          color: 'text-orange-500'
        }
      default:
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          ),
          color: 'text-gray-500'
        }
    }
  }

  // Lấy tiêu đề hiển thị theo loại thông báo
  const getNotificationTitle = (type: string, taskTitle: string) => {
    switch (type) {
      case 'task_added':
        return `Task mới: ${taskTitle}`
      case 'task_updated':
        return `Task đã được cập nhật: ${taskTitle}`
      case 'task_deleted':
        return `Task đã bị xóa: ${taskTitle}`
      case 'task_completed':
        return `Task đã hoàn thành: ${taskTitle}`
      case 'task_expired':
        return `Task quá hạn: ${taskTitle}`
      default:
        return taskTitle
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Nút thông báo với badge */}
      <button
        title="Thông báo task"
        className="relative text-xl hover:text-blue-500 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={handleNotificationClick}
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
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>

        {/* Badge đỏ với số lượng thông báo chưa đọc */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown menu thông báo */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Thông báo Task</h3>
              {unreadCount > 0 && (
                <button className="text-blue-500 text-sm hover:underline" onClick={() => setUnreadCount(0)}>
                  Đánh dấu đã đọc tất cả
                </button>
              )}
            </div>

            {/* Danh sách thông báo */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {displayedNotifications.length > 0 ? (
                displayedNotifications.map((notification) => {
                  const { icon, color } = getNotificationIcon(notification.type)

                  return (
                    <div
                      key={notification.id}
                      className={`flex items-start p-3 rounded-lg cursor-pointer hover:bg-gray-50 ${
                        !notification.isRead ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleSingleNotificationClick(notification.id)}
                    >
                      {/* Icon thông báo */}
                      <div className={`mr-3 ${color}`}>{icon}</div>

                      {/* Nội dung thông báo */}
                      <div className="flex-1">
                        <p className="font-medium text-sm text-gray-900">
                          {getNotificationTitle(notification.type, notification.taskTitle)}
                        </p>
                        <p className="text-xs text-gray-600">{notification.message}</p>
                        {notification.projectName && (
                          <p className="text-xs text-gray-500 mt-1">Dự án: {notification.projectName}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                      </div>

                      {/* Dot chỉ thị chưa đọc */}
                      {!notification.isRead && <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></div>}
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-4 text-gray-500">Không có thông báo nào</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationButton
