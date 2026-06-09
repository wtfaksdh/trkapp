import { Role } from '../types/truck';

interface NavbarProps {
  role: Role | null;
  onLogout: () => void;
  activePage: 'trucks' | 'users';
  onNavigate: (page: 'trucks' | 'users') => void;
}

export default function Navbar({ role, onLogout, activePage, onNavigate }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">🚛 TruckApp</div>

      <div className="navbar-links">
        <button
          className={activePage === 'trucks' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('trucks')}
        >
          Грузовики
        </button>
        <button
          className={activePage === 'users' ? 'nav-link active' : 'nav-link'}
          onClick={() => onNavigate('users')}
        >
          Пользователи
        </button>
      </div>

      <div className="navbar-right">
        <span className={`role-badge ${role}`}>
          {role === 'admin' ? '👑 Admin' : '👤 User'}
        </span>
        <button className="btn btn-outline" onClick={onLogout}>
          Выйти
        </button>
      </div>
    </nav>
  );
}