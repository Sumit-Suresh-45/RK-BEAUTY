# 🌸 RK Beauty & Bridal Studio

A premium, full-stack salon appointment scheduling and management web application. **RK Beauty** provides a sleek, interactive client interface for choosing services, scheduling appointments, and managing user profiles, combined with a robust Express & MySQL backend database.

---

## ✨ Features

- **🌸 Stunning, Responsive UI/UX**: Designed with a curated luxury color palette (gold, blush pink, and sleek dark modes) and modern typography.
- **📅 Interactive Booking System**: Select services, choose preferred date, time, and stylist, and book seamlessly.
- **🛒 Dynamic Service Cart**: Select multiple salon and bridal packages before finalizing the booking.
- **🔒 Secure Customer Accounts**: JWT-based user authentication, password hashing with `bcryptjs`, and secure cookie/local storage management.
- **👤 Customer Dashboard**: Access your profile details, edit contact info, and track the status of all your bookings (Scheduled vs. Cancelled).
- **💌 Interactive Gallery & Contact**: Showcase beauty looks and enable direct customer messages with validation.

---

## 🛠️ Tech Stack

### Frontend
- **React (v19)** & **Vite**: Ultra-fast next-generation frontend build tool.
- **React Router (v7)**: Declarative, component-based routing.
- **Lucide React**: Modern, clean iconography.
- **Vanilla CSS**: Custom, highly-optimized styling system featuring glassmorphic components and smooth micro-animations.

### Backend
- **Node.js** & **Express.js**: Lightweight and fast REST API layer.
- **MySQL (via `mysql2`)**: Reliable relational database with connection pooling for performant queries.
- **JWT (JSON Web Tokens)**: Secure token-based API authentication middleware.
- **Express Validator**: Server-side request schema validation.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MySQL](https://www.mysql.com/) database server

### Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/rk-beauty.git
   cd rk-beauty
   ```

2. **Install Dependencies:**
   Install packages for both frontend and backend from the root directory:
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   # Server Port
   PORT=5000

   # Database Credentials
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=rk_beauty_db

   # Authentication Secret
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Initialize Database Schema:**
   Import the SQL schema file found at `server/db.sql` into your MySQL instance:
   ```bash
   mysql -u your_mysql_user -p rk_beauty_db < server/db.sql
   ```

5. **Start the Development Server:**
   Run the concurrent dev script to launch both the frontend Vite server and backend Express API simultaneously:
   ```bash
   npm run dev
   ```
   - Client is running at: `http://localhost:5173`
   - Server API is running at: `http://localhost:5000`

---

## 📁 Project Structure

```text
rk-beauty/
├── public/                 # Static assets for frontend
├── server/                 # Express backend API
│   ├── config/             # DB configuration & pool
│   ├── middleware/         # Auth verify token middleware
│   ├── routes/             # API endpoints (auth, bookings, reviews)
│   ├── db.sql              # MySQL schema export
│   └── server.js           # API server entrypoint
├── src/                    # React frontend application
│   ├── components/         # Reusable layouts (Header, Footer, Cart)
│   ├── context/            # AuthContext & CartContext state
│   ├── pages/              # View pages (Home, About, Booking, Profile)
│   ├── App.jsx             # Main Router and routes
│   └── main.jsx            # Entry point
└── package.json            # Scripts and dependencies
```

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
