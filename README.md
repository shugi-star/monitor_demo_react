# Patient Monitoring System — Monitoring Server

## Overview

The Monitoring Server is a dedicated component of a full-stack patient monitoring system designed to support real-time monitoring updates.

Built with Node.js and Express, the service uses WebSockets to maintain communication with connected clients, allowing monitoring information to be delivered without relying exclusively on repeated HTTP requests.

This repository focuses on real-time communication and integration with the Main Backend and React frontend.

It is part of a larger project composed of three interconnected repositories.

## System Architecture

The complete system consists of three independent but interconnected components:

- **Frontend:** A React application providing the user interface.
- **Main Backend:** A Node.js and Express server providing REST API endpoints and patient-related data.
- **Monitoring Server:** A separate Node.js service managing WebSocket connections and monitoring updates.

### Architecture Diagram

```text
                  Hospital Nurses
                         |
                         v
                   React Frontend
                    /          \
                   v            v
              REST API       WebSocket
                   |            |
                   v            v
             Main Backend <--- Monitoring Server
             Node.js/Express    Node.js/Express
                   |
                   v
           Patient-related data
```

## Related Repositories

This project is divided into three repositories:

| Component | Repository | Technology |
|---|---|---|
| Frontend | [client_react_finalProject](https://github.com/shugi-star/client_react_finalProject) | React |
| Main Backend | [server_react_finalProject](https://github.com/shugi-star/server_react_finalProject) | Node.js, Express |
| Monitoring Server | [monitor_demo_react](https://github.com/shugi-star/monitor_demo_react) | Node.js, Express, WebSockets |

## Technologies

- Node.js
- Express.js
- JavaScript
- WebSockets (`ws`)
- HTTP APIs
- npm

## Responsibilities

- Providing monitoring-related HTTP endpoints.
- Establishing and managing WebSocket connections.
- Managing client subscriptions to patient monitoring updates.
- Sending monitoring information to connected clients.
- Communicating with the Main Backend to retrieve patient-related information.

The service also generates simulated vital-sign data for demonstration purposes.

## WebSocket Configuration

The configured WebSocket endpoint is:

```text
/ws/monitorsRealtime
```

The monitoring server uses port `3002` by default.

The local WebSocket address is:

```text
ws://localhost:3002/ws/monitorsRealtime
```

## Running the Complete System Locally

The Monitoring Server is one of three services in the Patient Monitoring System. For complete local operation, the other two repositories must also be running.

### Prerequisites

- Node.js and npm installed.
- The Main Backend available locally.
- The frontend repository available locally.

### 1. Clone the Repositories

```bash
git clone https://github.com/shugi-star/server_react_finalProject.git
git clone https://github.com/shugi-star/monitor_demo_react.git
git clone https://github.com/shugi-star/client_react_finalProject.git
```

### 2. Start the Main Backend

In the `server_react_finalProject` directory:

```bash
npm install
npm start
```

The Main Backend uses port `3001` by default:

```text
http://localhost:3001
```

### 3. Start the Monitoring Server

Open a separate terminal in the `monitor_demo_react` directory:

```bash
npm install
node server.js
```

The monitoring service uses port `3002` by default.

### 4. Start the Frontend

Open another terminal in the `client_react_finalProject` directory:

```bash
npm install
npm start
```

The frontend is typically available at:

```text
http://localhost:3000
```

### Local Services Overview

| Service | Default Port | Local Address |
|---|---:|---|
| Frontend | 3000 | `http://localhost:3000` |
| Main Backend | 3001 | `http://localhost:3001` |
| Monitoring Server | 3002 | `ws://localhost:3002/ws/monitorsRealtime` |

### Integration Configuration

The Monitoring Server retrieves patient-related information from the Main Backend and provides monitoring updates to connected clients.

Before testing the complete application, verify that the patient API path configured in this service matches the actual route exposed by the Main Backend.

The frontend must also use the matching WebSocket endpoint.

## Project Context

The Monitoring Server is part of the **Patient Monitoring System**, demonstrating WebSocket communication, client subscription management, simulated monitoring data, and integration between independent backend and frontend services.
