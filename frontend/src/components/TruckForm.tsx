import { useState, useEffect } from 'react';
import { Truck, CreateTruckData, TruckStatus } from '../types/truck';

interface TruckFormProps {
  initial?: Truck | null;
  onSubmit: (data: CreateTruckData) => void;
  onCancel: () => void;
}

export default function TruckForm({ initial, onSubmit, onCancel }: TruckFormProps) {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [status, setStatus] = useState<TruckStatus>('available');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initial) {
      setBrand(initial.brand);
      setModel(initial.model);
      setLicensePlate(initial.licensePlate);
      setCapacity(initial.capacity?.toString() ?? '');
      setStatus(initial.status);
    }
  }, [initial]);

  const handleSubmit = () => {
    if (!brand || !model || !licensePlate) {
      setError('Заполните все обязательные поля');
      return;
    }
    setError('');
    onSubmit({
      brand,
      model,
      licensePlate,
      capacity: capacity ? parseFloat(capacity) : undefined,
      status,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{initial ? 'Редактировать грузовик' : 'Добавить грузовик'}</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="form-group">
          <label>Марка *</label>
          <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="КАМАЗ" />
        </div>

        <div className="form-group">
          <label>Модель *</label>
          <input value={model} onChange={e => setModel(e.target.value)} placeholder="5490" />
        </div>

        <div className="form-group">
          <label>Гос. номер * (пример: А123ВС77)</label>
          <input value={licensePlate} onChange={e => setLicensePlate(e.target.value)} placeholder="А123ВС77" />
        </div>

        <div className="form-group">
          <label>Грузоподъёмность (т)</label>
          <input
            type="number"
            value={capacity}
            onChange={e => setCapacity(e.target.value)}
            placeholder="20"
            min="0.1"
          />
        </div>

        <div className="form-group">
          <label>Статус *</label>
          <select value={status} onChange={e => setStatus(e.target.value as TruckStatus)}>
            <option value="available">Свободен</option>
            <option value="on_route">В рейсе</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" onClick={handleSubmit}>
            {initial ? 'Сохранить' : 'Создать'}
          </button>
          <button className="btn btn-outline" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}