# 🛠️ Maintenance Tracker Pro

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-blue?logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.0-purple?logo=prisma&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.4-green?logo=playwright&logoColor=white)

A full-stack maintenance management system with equipment tracking, maintenance records, and data visualization.

## ✨ Key Features

- **Equipment Management**:
  - 📋 Add/edit equipment with detailed specs
  - 🔍 Filterable equipment table
  - 🏷️ Categorization system

- **Maintenance Tracking**:
  - 📅 Record maintenance activities
  - ⚠️ Alert system for pending services
  - 📊 Dashboard with maintenance history

- **Advanced Functionality**:
  - 📄 PDF report generation (jsPDF)
  - 📈 Data visualization (Chart.js)
  - ✅ End-to-end testing (Playwright)

## 🛠 Tech Stack

| Component          | Technology                          |
|--------------------|-------------------------------------|
| **Frontend**       | Next.js 14, React 18               |
| **Styling**        | Tailwind CSS 3.3                   |
| **Database**       | Prisma ORM (SQL/PostgreSQL)        |
| **Testing**        | Playwright 1.4                     |
| **PDF Generation** | jsPDF                              |

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL (or compatible database)
- npm v9+ or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ryanhui30/maintenance-tracker.git
   cd maintenance-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   Set up environment variables:
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Update with your database credentials
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```
   
5. Start the development server:
   ```bash
   npm run dev
   ```

🧪 Testing
Run end-to-end tests:
   ```bash
   npx playwright test
   ```

Need Help?
📩 Contact: ryanhui30@gmail.com
