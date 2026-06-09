import { useState } from 'react';

interface UserFormProps {
  onSubmit: (data: { name: string; email: string; age?: number }) => void;
  onCancel: () => void;
}

export default function UserForm({ onSubmit, onCancel }: UserFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name || !email) {
      setError('Имя и email обязательны');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Некорректный email');
      return;
    }
    setError('');
    onSubmit({
      name,
      email,
      age: age ? parseInt(age) : undefined,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Добавить пользователя</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="form-group">
          <label>Имя *</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Иван Иванов"
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="ivan@example.com"
          />
        </div>

        <div className="form-group">
          <label>Возраст</label>
          <input
            type="number"
            value={age}
            onChange={e => setAge(e.target.value)}
            placeholder="25"
            min="18"
            max="100"
          />
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Создать
          </button>
          <button className="btn btn-outline" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}