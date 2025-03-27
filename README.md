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

## 🧩 Next Steps (WIP)

- [ ] IP geolocation via GeoLite2 or IP2Location
- [ ] Threat feed export (STIX, JSON, etc.)
- [ ] Tagging and enriching session metadata
- [ ] Improved alerting and monitoring capabilities
- [ ] Public deployment on Hetzner
- [ ] Additional Grafana dashboards and UI improvements

## 🤝 Credits / Open Source Acknowledgements

CyberPot wouldn’t be possible without the power of these amazing open-source projects:

    Cowrie – SSH and Telnet honeypot used for logging unauthorized access attempts.

    MongoDB – NoSQL database used for storing structured honeypot session data.

    FastAPI – High-performance Python web framework powering the backend and WebSocket API.

    Motor – Async MongoDB driver for Python.

    httpx – Asynchronous HTTP client used for IP geolocation.

    React + TypeScript – For building the modern, modular frontend.

    TailwindCSS – Utility-first CSS framework for UI styling.

    three-globe – 3D globe visualization library for animated arcs and session mapping.

    three.js – WebGL-based 3D library for rendering the globe and interactive graphics.

    Grafana – Dashboard and observability platform for visualizing MongoDB data.

    Infinity Plugin – Grafana plugin used to visualize JSON API responses from the backend.

Special thanks to all contributors and maintainers of these tools – you're the real MVPs. 🙏
---
