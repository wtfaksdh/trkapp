import axios from 'axios';
import { Truck, CreateTruckData } from '../types/truck';

const BASE_URL = 'http://localhost:3000';

// создаём инстанс axios
const client = axios.create({ baseURL: BASE_URL });

// перехватчик — подставляет роль из localStorage в каждый запрос
client.interceptors.request.use((config) => {
  const raw = localStorage.getItem('role');
  const role = raw ? JSON.parse(raw) : null;
  if (role) config.headers['x-role'] = role;
  return config;
});

// --- Trucks API ---

export const trucksApi = {
  getAll: async (): Promise<Truck[]> => {
    const res = await client.get('/trucks');
    return res.data;
  },

  getOne: async (id: string): Promise<Truck> => {
    const res = await client.get(`/trucks/${id}`);
    return res.data;
  },

  create: async (data: CreateTruckData): Promise<Truck> => {
    const res = await client.post('/trucks', data);
    return res.data;
  },

  update: async (id: string, data: Partial<CreateTruckData>): Promise<Truck> => {
    const res = await client.patch(`/trucks/${id}`, data);
    return res.data;
  },

  remove: async (id: string): Promise<void> => {
    await client.delete(`/trucks/${id}`);
  },
};

// --- Users API ---

export const usersApi = {
  getAll: async () => {
    const res = await client.get('/users');
    return res.data;
  },

  getOne: async (id: string) => {
    const res = await client.get(`/users/${id}`);
    return res.data;
  },

  create: async (data: { name: string; email: string; age?: number }) => {
    const res = await client.post('/users', data);
    return res.data;
  },
};