import React, { useState, useRef, useEffect } from 'react'

export type TaskStatus = 'doing' | 'done' | 'expired' | 'pending' | 'in_review'

export interface User {
  id: number
  name: string
  avatar?: string
}

export interface Task {
  id: number
  title: string
  description: string
  status: TaskStatus
  createdBy: User
  createdAt: string
  dueDate?: string
  priority?: 'low' | 'medium' | 'high'
  assignee?: User
}

interface TaskItemProps {
  task: Task
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  onStatusChange?: (id: number, newStatus: TaskStatus) => void
}

const statusColor: Record<TaskStatus, string> = {
  doing: 'bg-blue-100 text-blue-700',
  done: 'bg-green-100 text-green-700',
  expired: 'bg-red-100 text-red-700',
  pending: 'bg-yellow-100 text-yellow-700',
  in_review: 'bg-purple-100 text-purple-700'
}

const statusLabel: Record<TaskStatus, string> = {
  doing: 'Đang thực hiện',
  done: 'Hoàn thành',
  expired: 'Hết hạn',
  pending: 'Chờ xử lý',
  in_review: 'Chờ review'
}

const priorityColor: Record<string, string> = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700'
}

const priorityLabel: Record<string, string> = {
  low: 'Thấp',
  medium: 'Trung bình',
  high: 'Cao'
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Đóng menu khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN')
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6 flex flex-col gap-3 relative hover:shadow-md transition-shadow">
      {/* Header với title và menu button */}
      <div className="flex items-start justify-between">
        <h3
          className={`font-bold text-lg md:text-xl flex-1 pr-4 ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-800'}`}
        >
          {task.title}
        </h3>

        {/* Menu button */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Menu tác vụ"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </button>
      </div>

      {/* Description */}
      {task.description && <p className="text-gray-600 text-sm md:text-base">{task.description}</p>}

      {/* Metadata section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        {/* Người tạo */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Người tạo:</span>
          <div className="flex items-center gap-1">
            {task.createdBy.avatar ? (
              <img src={task.createdBy.avatar} alt={task.createdBy.name} className="w-5 h-5 rounded-full" />
            ) : (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                {task.createdBy.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-sm font-medium">{task.createdBy.name}</span>
          </div>
        </div>

        {/* Ngày tạo */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Ngày tạo:</span>
          <span className="text-sm">{formatDate(task.createdAt)}</span>
        </div>

        {/* Người assigned (nếu có) */}
        {task.assignee && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Người thực hiện:</span>
            <div className="flex items-center gap-1">
              {task.assignee.avatar ? (
                <img src={task.assignee.avatar} alt={task.assignee.name} className="w-5 h-5 rounded-full" />
              ) : (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                  {task.assignee.name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-sm font-medium">{task.assignee.name}</span>
            </div>
          </div>
        )}

        {/* Due date (nếu có) */}
        {task.dueDate && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Hạn chót:</span>
            <span className={`text-sm ${task.status === 'expired' ? 'text-red-500 font-medium' : ''}`}>
              {formatDate(task.dueDate)}
            </span>
          </div>
        )}
      </div>

      {/* Footer với status và priority */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {/* Status badge */}
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[task.status]}`}>
            {statusLabel[task.status]}
          </span>

          {/* Priority badge (nếu có) */}
          {task.priority && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor[task.priority]}`}>
              Ưu tiên: {priorityLabel[task.priority]}
            </span>
          )}
        </div>

        {/* Action buttons cho mobile */}
        <div className="flex gap-2 sm:hidden">
          <button
            onClick={() => onEdit && onEdit(task.id)}
            className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
          >
            Sửa
          </button>
          <button
            onClick={() => onDelete && onDelete(task.id)}
            className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
          >
            Xóa
          </button>
        </div>
      </div>

      {/* Dropdown menu cho desktop */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute right-2 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px] py-1"
        >
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
            onClick={() => {
              setShowMenu(false)
              onEdit && onEdit(task.id)
            }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Chỉnh sửa
            </div>
          </button>

          {/* Status change options */}
          {onStatusChange && <div className="border-t border-gray-100 my-1"></div>}
          {onStatusChange &&
            Object.entries(statusLabel).map(
              ([status, label]) =>
                task.status !== status && (
                  <button
                    key={status}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700"
                    onClick={() => {
                      setShowMenu(false)
                      onStatusChange(task.id, status as TaskStatus)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${statusColor[status as TaskStatus].split(' ')[0]}`}></div>
                      Đổi thành: {label}
                    </div>
                  </button>
                )
            )}

          <div className="border-t border-gray-100 my-1"></div>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-red-500"
            onClick={() => {
              setShowMenu(false)
              onDelete && onDelete(task.id)
            }}
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Xóa task
            </div>
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskItem
