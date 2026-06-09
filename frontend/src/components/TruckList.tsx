import { useState, useEffect } from 'react';
import { Truck, Role } from '../types/truck';
import { trucksApi } from '../api/api';
import TruckCard from './TruckCard';
import TruckForm from './TruckForm';

interface TruckListProps {
  role: Role;
}

export default function TruckList({ role }: TruckListProps) {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTruck, setEditingTruck] = useState<Truck | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'on_route'>('all');

  const loadTrucks = async () => {
    try {
      setLoading(true);
      const data = await trucksApi.getAll();
      setTrucks(data);
    } catch {
      setError('Ошибка загрузки грузовиков');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTrucks(); }, []);

  const handleCreate = async (data: any) => {
    try {
      await trucksApi.create(data);
      setShowForm(false);
      loadTrucks();
    } catch (e: any) {
      setError(e.response?.data?.message ?? 'Ошибка создания');
    }
  };

  const handleUpdate = async (data: any) => {
    if (!editingTruck) return;
    try {
      await trucksApi.update(editingTruck.id, data);
      setEditingTruck(null);
      loadTrucks();
    } catch (e: any) {
      setError(e.response?.data?.message ?? 'Ошибка обновления');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить грузовик?')) return;
    try {
      await trucksApi.remove(id);
      loadTrucks();
    } catch {
      setError('Ошибка удаления');
    }
  };

  const filtered = trucks.filter(t =>
    filterStatus === 'all' ? true : t.status === filterStatus
  );

  return (
    <div className="page">
      <div className="page-header">
        <h2>Грузовики ({filtered.length})</h2>
        <div className="page-controls">
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as any)}>
            <option value="all">Все</option>
            <option value="available">Свободные</option>
            <option value="on_route">В рейсе</option>
          </select>
          {role === 'admin' && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              + Добавить
            </button>
          )}
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading && <div className="loading">Загрузка...</div>}

      <div className="truck-grid">
        {filtered.map(truck => (
          <TruckCard
            key={truck.id}
            truck={truck}
            role={role}
            onEdit={setEditingTruck}
            onDelete={handleDelete}
          />
        ))}
        {!loading && filtered.length === 0 && (
          <p className="empty">Грузовики не найдены</p>
        )}
      </div>

      {showForm && (
        <TruckForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}
      {editingTruck && (
        <TruckForm
          initial={editingTruck}
          onSubmit={handleUpdate}
          onCancel={() => setEditingTruck(null)}
        />
      )}
    </div>
  );
}