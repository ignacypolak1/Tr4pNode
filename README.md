# 🌍 CyberPot – Cyberthreat Research Platform (WIP)

**CyberPot** is an lightweight, hackable and open-source, research-oriented honeypot platform designed to capture and visualize cyberattacks in real time. It provides an educational-friendly and modular environment that supports threat analysis, DevSecOps training, and public demonstrations of cybersecurity concepts.
With Cowrie as the SSH honeypot, MongoDB for structured data storage, and Grafana (powered by the Infinity plugin) for dashboard-based exploration, CyberPot bridges low-level event capture with high-level visualization.
You can explore real-time logs on an interactive **3D globe** or create **advanced Grafana dashboards** to analyze patterns, sources, and sessions metadata.

---

## 🔥 What It Does?

- Captures unauthorized SSH activity via **Cowrie** and stores data in **MongoDB**
- Visualizes sessions as animated arcs between attacker and honeypot server location on a **3D globe** using **three-globe** (WIP)
- Uses **Grafana dashboards** for session metadata visualization and research purposes

Offers full flexibility for research, visualization, and educational use cases

---

## 📡 MVP Components

- Cowrie (SSH Honeypot) – exposes fake SSH services to attract and log attackers
- MongoDB – stores structured logs for both visualization and analytics
- Backend (Python + FastAPI) – handles API for Grafana and WebSocket data stream for the frontend
- Frontend (React + TypeScript + TailwindCSS) – renders the animated globe and real-time session events
- Grafana – provides powerful dashboards using Infinity plugin connected to backend API (MongoDB data)

---

## 🖥️ Architecture

![Globe Preview](img/structure.png)

---

## 🛰️ Live Sessions Geolocalization View 

![Globe Preview](img/globe.gif)

---

## ⚠️ Disclaimer

This project is provided **for educational and research purposes only**.  
The authors and contributors take **no responsibility** for any use of this software.  
Do not deploy this in environments where it could interfere with production systems or violate legal boundaries.

---

## 🧩 Built With / Credits

CyberPot is built using a combination of powerful and open-source technologies:

- [**Cowrie**](https://github.com/cowrie/cowrie) – SSH and Telnet honeypot used for logging unauthorized access attempts.
- [**MongoDB**](https://www.mongodb.com/) – NoSQL document database for storing structured honeypot session data.
- [**FastAPI**](https://github.com/tiangolo/fastapi) – High-performance web framework powering the backend and WebSocket API.
- [**Motor**](https://github.com/mongodb/motor) – Asynchronous MongoDB driver for Python.
- [**httpx**](https://github.com/encode/httpx) – Async HTTP client used for IP geolocation.
- [**React**](https://react.dev/) + [**TypeScript**](https://www.typescriptlang.org/) – Modern frontend for the globe visualization.
- [**TailwindCSS**](https://tailwindcss.com/) – Utility-first CSS framework for clean, responsive UI.
- [**three-globe**](https://github.com/vasturiano/three-globe) – WebGL globe visualization for animated session arcs.
- [**three.js**](https://threejs.org/) – Core 3D rendering engine powering the globe.
- [**Grafana**](https://grafana.com/) – Interactive dashboard and observability platform.
- [**Grafana Infinity Plugin**](https://github.com/yesoreyeram/grafana-infinity-datasource) – JSON/CSV backend API visualizations without database drivers.
- [**Docker**](https://www.docker.com/) + [**Docker Compose**](https://docs.docker.com/compose/) – Containerized deployment of all services.
- [**Terraform**](https://www.terraform.io/) – Infrastructure-as-code for automated deployments.
- [**Nginx**](https://www.nginx.com/) – Reverse proxy for frontend/backend communication.
- [**Vite**](https://vitejs.dev/) – Fast build tool and dev server for frontend development.
- [**Python**](https://www.python.org/) – Core programming language powering the backend and data processing.

Special thanks to all contributors and maintainers of these tools – you're the real MVPs 🙏
---
