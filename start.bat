@echo off
echo Starting backend...
start cmd /k "cd backend && npm run start:dev"

echo Starting frontend...
start cmd /k "cd frontend && npm run dev"

echo Both servers started!
echo Backend:  http://localhost:3000
echo Frontend: http://localhost:5173