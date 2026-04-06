import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="glass max-w-md w-full rounded-3xl p-12">
        <h1 className="text-4xl font-semibold text-center mb-10">Create an account</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                 className="w-full bg-transparent border border-black/200 rounded-3xl px-8 py-6 focus:outline-none focus:border-primary" required />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                 className="w-full bg-transparent border border-black/200 rounded-3xl px-8 py-6 focus:outline-none focus:border-primary" required />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                 className="w-full bg-transparent border border-black/200 rounded-3xl px-8 py-6 focus:outline-none focus:border-primary" required />
          <button type="submit" className="w-full bg-primary text-black-200 font-bold py-6 rounded-3xl text-lg border border-black/200 hover:bg-black/20">
            Register
          </button>
        </form>
        <p className="text-center mt-8 text-black-200">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;