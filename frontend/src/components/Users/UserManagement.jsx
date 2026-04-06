import { useState, useEffect } from 'react';
import api from '../../utils/api';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await api.get('/users');
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleUpdate = async (id, role, status) => {
    await api.patch(`/users/${id}`, { role, status });
    fetchUsers();
  };

  return (
    <div className="glass rounded-3xl p-8">
      <h2 className="text-2xl font-semibold mb-8">User Management</h2>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left p-6">Name</th>
            <th className="text-left p-6">Email</th>
            <th className="text-left p-6">Role</th>
            <th className="text-left p-6">Status</th>
            <th className="p-6"></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b border-white/10">
              <td className="p-6">{user.name}</td>
              <td className="p-6 text-black-200">{user.email}</td>
              <td className="p-6">
                <select value={user.role} onChange={e => handleUpdate(user._id, e.target.value, user.status)}
                        className="bg-transparent border border-white/20 rounded-2xl px-4 py-2">
                  <option value="viewer">Viewer</option>
                  <option value="analyst">Analyst</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="p-6">
                <select value={user.status} onChange={e => handleUpdate(user._id, user.role, e.target.value)}
                        className="bg-transparent border border-white/20 rounded-2xl px-4 py-2">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;