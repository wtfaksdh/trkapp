import { useState } from 'react';
import { Role } from '../types/truck';
import TruckList from '../components/TruckList';
import UserList from '../components/UserList';
import Navbar from '../components/Navbar';

interface HomePageProps {
  role: Role;
  onLogout: () => void;
}

export default function HomePage({ role, onLogout }: HomePageProps) {
  const [activePage, setActivePage] = useState<'trucks' | 'users'>('trucks');

  return (
    <div className="app-layout">
      <Navbar
        role={role}
        onLogout={onLogout}
        activePage={activePage}
        onNavigate={setActivePage}
      />
      <main className="main-content">
        {activePage === 'trucks' && <TruckList role={role} />}
        {activePage === 'users' && <UserList role={role} />}
      </main>
    </div>
  );
}