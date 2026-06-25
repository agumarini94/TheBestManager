# TheBestManager ⚽

A fullstack fantasy football web application inspired by Gran DT (Argentina). Users can create an account, build a virtual team with real players, buy and sell players within a budget, and visualize their squad on an interactive pitch.

---

## 🚀 Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Protected routes with auth middleware
- Player market with real Argentine football players (Boca Juniors & River Plate)
- Buy and sell players with budget management
- Virtual team displayed on an interactive football pitch
- Players grouped by position (Goalkeeper, Defender, Midfielder, Forward)
- Private budget tracking per user
- "Bought" button state for already-purchased players

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- Axios
- CSS (custom variables, Flexbox, Grid)

**Backend**
- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcrypt

**Database**
- PostgreSQL (hosted on Neon)

---

## 📁 Project Structure

```
TheBestManager/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic (auth, market, team)
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/       # JWT auth middleware
│   │   └── db/              # PostgreSQL connection
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/      # React components
    │   └── index.css        # Global styles
    └── package.json
```

---

## 🗄️ Database Schema

10 tables designed from scratch:

- `users` — registered users with budget and role
- `jugador` — real football players with position and price
- `equipo` — real football clubs
- `equipo_virtual` — each user's virtual team
- `transferencia` — purchase history linking users and players
- `fecha` — match rounds
- `estadistica` — player stats per round
- `puntajes` — scoring rules by position and event
- `liga` — private leagues
- `liga_usuario` — users per league

---

## 🔐 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/register | Register new user | ❌ |
| POST | /api/login | Login and get JWT token | ❌ |
| GET | /api/jugadores | Get all players | ❌ |
| GET | /api/equipos | Get all teams | ❌ |
| GET | /api/miEquipoVirtual | Get user's virtual team | ✅ |
| GET | /api/presupuesto | Get user's budget | ✅ |
| POST | /api/mercadoJugadores | Buy a player | ✅ |
| DELETE | /api/mercadoJugadores | Sell a player | ✅ |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- A Neon PostgreSQL database

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret_key
PORT=5006
```

Start the server:

```bash
node src/index.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📚 What I Learned

This project was built as a learning exercise covering:

- Designing a relational database schema from scratch (entity relationships, foreign keys, junction tables)
- Building a REST API with Express.js following a routes/controllers architecture
- Implementing JWT authentication and protected routes with middleware
- Connecting a Node.js backend to a PostgreSQL database using `pg`
- Managing state in React with `useState` and `useEffect`
- Consuming a REST API from a React frontend using `fetch` and `axios`
- Organizing a fullstack project with separated frontend and backend

---

## 🔮 Upcoming Features

- Player statistics per round (goals, assists, cards)
- Points calculation system based on player performance
- Global and private league rankings
- Admin panel for managing rounds and stats
- Selling players back to the market

---

## 👤 Author

Agustín Marini — [GitHub](https://github.com/agumarini94)
