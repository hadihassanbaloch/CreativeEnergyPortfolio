# ⚡ Creative Energy Portfolio (Vite + Node.js)

A modern and dynamic **portfolio website** designed to showcase creative energy projects and services.  
Built with **Vite** on the frontend and a lightweight **Node.js server** on the backend for scalability and performance.  

---

## ✨ Features

- 🎨 Elegant portfolio design with responsive layout  
- ⚡ Built with Vite for lightning-fast development  
- 🖼️ Image gallery & project showcase  
- 🔗 Smooth navigation and clean routing  
- 📱 Mobile-friendly responsive design  
- 🌐 SEO-friendly structure  
- 🛠️ Configurable environment setup with `.env.production`  
- 📤 Deployment-ready build  

---

## 🛠 Tech Stack

- **Frontend**: Vite, JavaScript, HTML, CSS  
- **Backend**: Node.js / Express (in `server/`)  
- **Deployment**: Environment variables, optimized static build  

---

## 📂 Project Structure

CreativeEnergyPortfolio/
├── .github/ # GitHub workflows
├── public/ # Static assets (images, icons, etc.)
├── server/ # Backend (Node.js / Express)
├── src/ # Frontend code
├── .env.production # Production environment variables
├── vite.config.js # Vite configuration
├── package.json # Dependencies & scripts
└── README.md


---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/hadihassanbaloch/CreativeEnergyPortfolio.git
cd CreativeEnergyPortfolio


2️⃣ Install dependencies
npm install


3️⃣ Run in development
npm run dev

4️⃣ Build for production
npm run build
npm run start


🔑 Environment Variables
Create a .env.production file in the root directory with variables such as:

PORT=5000
API_URL=https://api.creativeenergy.com
NODE_ENV=production


📤 Deployment

1. Run npm run build to create a production build

2. Ensure .env.production is configured correctly

3. Deploy to platforms like Vercel, Netlify, or Heroku


🤝 Contributing

Contributions are welcome!

Fork the repo

Create a new branch (feature/your-feature)

Commit your changes

Submit a pull request