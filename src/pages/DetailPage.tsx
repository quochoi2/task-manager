import React from 'react'
import { useParams } from 'react-router-dom'
import MemberList from '../components/MemberList'
import TaskItem from '../components/TaskItem'
import type { Task } from '../components/TaskItem'

const members = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', image: 'https://i.pravatar.cc/40?img=1' },
  { id: 2, name: 'Trần Thị B', email: 'b@example.com', image: 'https://i.pravatar.cc/40?img=2' },
  { id: 3, name: 'Lê Văn C', email: 'c@example.com', image: 'https://i.pravatar.cc/40?img=3' },
  { id: 4, name: 'Phạm Văn D', email: 'd@example.com', image: 'https://i.pravatar.cc/40?img=4' },
  { id: 5, name: 'Hoàng Thị E', email: 'e@example.com', image: 'https://i.pravatar.cc/40?img=5' }
]

const tasks: Task[] = []

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Project #{id}</h1>
        <div className="flex items-center gap-4">
          <MemberList members={members} />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Danh sách nhiệm vụ</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition">
          Tạo nhiệm vụ
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TaskItem
          task={{
            id: 1,
            title: 'Thiết kế giao diện dashboard',
            description: 'Thiết kế giao diện dashboard cho ứng dụng quản lý task',
            status: 'doing',
            createdBy: {
              id: 1,
              name: 'Nguyễn Văn A',
              avatar: 'https://i.pravatar.cc/150?img=1'
            },
            createdAt: '2024-01-15',
            dueDate: '2024-01-25',
            priority: 'high',
            assignee: {
              id: 2,
              name: 'Trần Thị B'
            }
          }}
          onEdit={(id) => console.log('Edit task:', id)}
          onDelete={(id) => console.log('Delete task:', id)}
          onStatusChange={(id, newStatus) => console.log('Change status:', id, newStatus)}
        />
        <TaskItem
          task={{
            id: 1,
            title: 'Thiết kế giao diện dashboard',
            description: 'Thiết kế giao diện dashboard cho ứng dụng quản lý task',
            status: 'doing',
            createdBy: {
              id: 1,
              name: 'Nguyễn Văn A',
              avatar: 'https://i.pravatar.cc/150?img=1'
            },
            createdAt: '2024-01-15',
            dueDate: '2024-01-25',
            priority: 'high',
            assignee: {
              id: 2,
              name: 'Trần Thị B'
            }
          }}
          onEdit={(id) => console.log('Edit task:', id)}
          onDelete={(id) => console.log('Delete task:', id)}
          onStatusChange={(id, newStatus) => console.log('Change status:', id, newStatus)}
        />
        <TaskItem
          task={{
            id: 1,
            title: 'Thiết kế giao diện dashboard',
            description: 'Thiết kế giao diện dashboard cho ứng dụng quản lý task',
            status: 'doing',
            createdBy: {
              id: 1,
              name: 'Nguyễn Văn A',
              avatar: 'https://i.pravatar.cc/150?img=1'
            },
            createdAt: '2024-01-15',
            dueDate: '2024-01-25',
            priority: 'high',
            assignee: {
              id: 2,
              name: 'Trần Thị B'
            }
          }}
          onEdit={(id) => console.log('Edit task:', id)}
          onDelete={(id) => console.log('Delete task:', id)}
          onStatusChange={(id, newStatus) => console.log('Change status:', id, newStatus)}
        />
      </div>
    </div>
  )
}

export default DetailPage
