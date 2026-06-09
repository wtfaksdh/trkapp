import { Truck } from '../types/truck';
import { Role } from '../types/truck';

interface TruckCardProps {
  truck: Truck;
  role: Role;
  onEdit: (truck: Truck) => void;
  onDelete: (id: string) => void;
}

export default function TruckCard({ truck, role, onEdit, onDelete }: TruckCardProps) {
  return (
    <div className={`truck-card ${truck.status}`}>
      <div className="truck-card-header">
        <h3>{truck.brand} {truck.model}</h3>
        <span className={`status-badge ${truck.status}`}>
          {truck.status === 'available' ? '✅ Свободен' : '🚚 В рейсе'}
        </span>
      </div>

      <div className="truck-card-body">
        <p><strong>Гос. номер:</strong> {truck.licensePlate}</p>
        {truck.capacity && (
          <p><strong>Грузоподъёмность:</strong> {truck.capacity} т</p>
        )}
        <p className="truck-date">
          <strong>Добавлен:</strong> {new Date(truck.createdAt).toLocaleDateString('ru-RU')}
        </p>
      </div>

      {role === 'admin' && (
        <div className="truck-card-actions">
          <button className="btn btn-secondary" onClick={() => onEdit(truck)}>
            ✏️ Редактировать
          </button>
          <button className="btn btn-danger" onClick={() => onDelete(truck.id)}>
            🗑️ Удалить
          </button>
        </div>
      )}
    </div>
  );
}