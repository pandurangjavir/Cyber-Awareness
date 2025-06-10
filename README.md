# Cyber Awareness Platform

A comprehensive cybersecurity awareness platform that combines education, practical tools, and interactive learning experiences.

## Features

- Interactive Learning Modules
- Security Tools
- Educational Videos
- Interactive Games
- Security Challenges
- User Authentication
- Progress Tracking

## Tech Stack

- Frontend: React.js with Vite
- Backend: Node.js with Express
- Database: MongoDB
- UI Framework: Material-UI

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cyber-awareness.git
cd cyber-awareness
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Create .env files:
   - Frontend (.env):
   ```
   VITE_API_URL=http://localhost:5000
   ```
   - Backend (.env):
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

## Development

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

## Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Configure the build settings:
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `cd frontend && npm install`
5. Add environment variables in Vercel dashboard
6. Deploy

### Backend (Vercel)

1. Create a new project in Vercel
2. Configure the build settings:
   - Build Command: `cd backend && npm install`
   - Output Directory: `backend`
   - Install Command: `cd backend && npm install`
3. Add environment variables in Vercel dashboard
4. Deploy

## Environment Variables

### Frontend
- `VITE_API_URL`: Backend API URL

### Backend
- `PORT`: Server port
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: JWT secret key

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 