import React, { useState } from 'react'

export interface Member {
  id: number
  name: string
  email: string
  image: string
}

interface MemberListProps {
  members: Member[]
}

const MemberList: React.FC<MemberListProps> = ({ members }) => {
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')

  const visibleMembers = members.slice(0, 3)
  const hiddenCount = members.length - visibleMembers.length
  const filteredMembers = members.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="flex items-center gap-2">
        {visibleMembers.map((member) => (
          <span key={member.id} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            {member.name}
          </span>
        ))}
        {hiddenCount > 0 && (
          <button className="bg-gray-200 px-2 py-1 rounded-full text-sm font-medium" onClick={() => setShowModal(true)}>
            ...
          </button>
        )}
      </div>
      {/* Modal danh sách thành viên */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold">Danh sách thành viên</h2>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm thành viên..."
              className="border rounded-lg px-3 py-2 mb-2 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
              {filteredMembers.length === 0 && (
                <span className="text-gray-400 text-sm">Không tìm thấy thành viên nào.</span>
              )}
              {filteredMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
                  <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MemberList
