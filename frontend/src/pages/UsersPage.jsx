import UserManagement from '../components/Users/UserManagement';

const UsersPage = () => {
  return (
    <div>
      <h1 className="text-4xl font-semibold mb-8">Manage Users</h1>
      <UserManagement />
    </div>
  );
};

export default UsersPage;