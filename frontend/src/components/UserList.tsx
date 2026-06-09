import { useState, useEffect } from 'react';
import { usersApi } from '../api/api';
import { Role } from '../types/truck';
import UserForm from './UserForm';

interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
}

interface UserListProps {
  role: Role;
}

export default function UserList({ role }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await usersApi.getAll();
      setUsers(data);
    } catch {
      setError('Ошибка загрузки пользователей');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleCreate = async (data: { name: string; email: string; age?: number }) => {
    try {
      await usersApi.create(data);
      setShowForm(false);
      loadUsers();
    } catch (e: any) {
      const msg = e.response?.data?.message;
      setError(Array.isArray(msg) ? msg.join(', ') : msg ?? 'Ошибка создания');
    }
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-header">
        <h2>Пользователи ({filtered.length})</h2>
        <div className="page-controls">
          <input
            className="search-input"
            placeholder="🔍 Поиск по имени или email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {role === 'admin' && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              + Добавить
            </button>
          )}
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading && <div className="loading">Загрузка...</div>}

      {!loading && (
        <div className="table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Возраст</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="user-name">
                      <span className="user-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                      {user.name}
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.age ?? '—'}</td>
                  <td className="user-id">{user.id.slice(0, 8)}...</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty">
                    {search ? 'Ничего не найдено' : 'Пользователей пока нет'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <UserForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}