import { useLocalStorage } from './hooks/useLocalStorage';
import { Role } from './types/truck';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

export default function App() {
  const [role, setRole, removeRole] = useLocalStorage<Role | null>('role', null);

  if (!role) {
    return <LoginPage onLogin={setRole} />;
  }

  return <HomePage role={role} onLogout={removeRole} />;
}