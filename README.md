# 🚚 ShipSense

> Real-time supply chain shipment tracking with ETA prediction, delay analysis, and role-based access control.

---

## 🌟 Overview

ShipSense is a full-stack MERN application designed to bring transparency and intelligence to supply chain management. It allows admins, suppliers, and customers to interact with shipment data in real time — tracking orders, monitoring ETAs, and understanding why delays happen through standardized delay reason codes.

The platform is built with a research-style approach to delay categorization, making it useful not just as a tracking tool but as an analytical system for understanding supply chain bottlenecks.

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication
- Role-based access control (RBAC) with 3 roles
- Protected routes per role

### 👑 Admin
- Full dashboard with shipment stats & charts
- Manage all shipments across the system
- Manage users (suppliers & customers)
- Assign & manage delay reason codes
- Flag and monitor delayed shipments

### 🏭 Supplier
- Personal dashboard with shipment stats
- Add and manage their own shipments
- Update shipment status & ETAs
- Assign delay reason codes

### 📦 Customer
- Clean dashboard showing their orders
- Visual shipment timeline
- Real-time ETA & delay reason visibility
- Read-only, no editing

### 🚢 Shipment Tracking
- Visual timeline — Ordered → Dispatched → In Transit → Delivered
- Status badges — 🟢 On Time / 🟡 At Risk / 🔴 Delayed
- Standardized Delay Reason Codes
  - `D01` — Weather Conditions
  - `D02` — Port Congestion
  - `D03` — Customs Hold
  - `D04` — Mechanical Failure
  - `D05` — Documentation Error

### 🎨 UI/UX
- Responsive design
- Dark mode support
- Interactive charts & graphs (Recharts)

### 🤖 AI Phase *(Coming Soon)*
- ETA prediction based on route, carrier & delay history
- AI-suggested delay reason codes
- Predictive insights on dashboard

---

## 👥 Role Access Matrix

| Feature | Admin | Supplier | Customer |
|---------|-------|----------|----------|
| View All Shipments | ✅ | Own Only | Their Orders |
| Add Shipment | ✅ | ✅ | ❌ |
| Update Status | ✅ | ✅ | ❌ |
| Manage Users | ✅ | ❌ | ❌ |
| View Timeline | ✅ | ✅ | ✅ |
| Delay Codes | ✅ | View Only | ❌ |
| Dashboard Charts | ✅ | ✅ | ✅ |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| Charts | Recharts |
| AI *(soon)* | TBD |

---

## 📄 License
This project is licensed under the MIT License.
