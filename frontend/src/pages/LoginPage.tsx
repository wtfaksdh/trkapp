import { Role } from '../types/truck';

interface LoginPageProps {
  onLogin: (role: Role) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">🚛</div>
        <h1>TruckApp</h1>
        <p>Система управления грузовыми перевозками</p>
        <p className="login-subtitle">Выберите роль для входа:</p>

        <div className="login-buttons">
          <button className="btn btn-primary btn-large" onClick={() => onLogin('admin')}>
            👑 Войти как Admin
            <span className="btn-hint">Полный доступ: просмотр, создание, редактирование, удаление</span>
          </button>
          <button className="btn btn-outline btn-large" onClick={() => onLogin('user')}>
            👤 Войти как User
            <span className="btn-hint">Только просмотр</span>
          </button>
        </div>
      </div>
    </div>
  );
}