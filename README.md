# 🌍 Wanderlust StayHere: Stay, Explore & Experience

**Wanderlust StayHere** is a full-stack MERN web application designed to help property owners list their properties and allow users to explore and book unique stays. The platform aims to create a seamless experience for both travelers and hosts, inspired by Airbnb.

---

## ✨ Features

### 🔐 Authentication
- User & Property Owner Registration/Login
- JWT-based secure authentication

### 🏡 Property Listings
- Property owner can:
  - Add property details (title, price, description, location, amenities)
  - Upload images
  - Manage availability and bookings

### 🔎 User Experience
- Browse listings by location, price, and type
- View detailed property pages
- Book properties with preferred dates
- Manage your bookings

### 🛠 Admin Dashboard
- View and manage all users & listings
- Ban/unban property owners
- Monitor bookings and platform stats

---

## ⚙️ Tech Stack

| Tech       | Used For        |
|------------|------------------|
| React.js   | Frontend UI      |
| TailwindCSS / Bootstrap | Styling |
| Node.js    | Backend Server   |
| Express.js | REST API         |
| MongoDB    | Database         |
| JWT & bcrypt | Authentication |
| Multer / Cloudinary | Image Uploads (optional) |
| Netlify / Vercel | Frontend Hosting |
| Render / Railway / Cyclic | Backend Hosting |

---

## 🚀 Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/wanderlust-stayhere.git







# Frontend
cd client
npm install

# Backend
cd ../server
npm install



MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret





# Start backend
cd server
npm run dev

# Start frontend (in a new terminal)
cd client
npm start
