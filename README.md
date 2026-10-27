# Patient Monitoring System

## Overview

A full-stack patient monitoring system designed to help hospital nurses view patients' monitor data in real time through a centralized interface.

The goal of the system is to make patient monitoring information accessible to nurses through a user-friendly interface, helping them view patient-related information and receive real-time monitoring updates.

The system consists of three interconnected components:

- **Frontend:** A React application that provides the user interface for viewing patient information and monitoring data.
- **Main Backend:** A Node.js and Express server that provides API endpoints for patient, nurse, and bed-related data.
- **Monitoring Server:** A separate Node.js service that uses WebSockets to support real-time monitoring updates.

Together, these components demonstrate a multi-service architecture that combines frontend development, REST API integration, and real-time communication.

## System Architecture

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
          Main Backend   Monitoring Server
          Node.js/Express  Node.js/Express
                |
                v
        Patient-related data
```

## Technologies

- Node.js
- Express.js
- JavaScript
- WebSockets
- HTTP APIs
- npm

## Monitoring Server — This Repository

This repository contains the monitoring service, built with Node.js and Express, that supports real-time communication through WebSockets.

The service is intended to enable connected clients, such as the frontend used by nurses, to receive monitoring updates without repeatedly requesting the data through standard HTTP requests.

### Responsibilities

- Providing a monitoring-related HTTP endpoint.
- Establishing WebSocket connections.
- Managing client subscriptions to patient monitoring updates.
- Sending monitoring data to connected clients.
- Communicating with the main backend to retrieve patient-related information.

### WebSocket Endpoint

The WebSocket path configured in the server is:

```text
/ws/monitorsRealtime
```

The server uses port `3002` by default.

## Running Locally

### Prerequisites

- Node.js and npm installed.
- The main backend available locally.

### 1. Install Dependencies

Open a terminal in the `monitor_demo_react` directory and run:

```bash
npm install
```

### 2. Start the Monitoring Server

Run:

```bash
node server.js
```

The monitoring server uses port `3002` by default.

### 3. Connect to the Main Backend

In the current local development configuration, the monitoring server expects the main backend at:

```text
http://localhost:3001
```

Start the main backend first and verify that it is available before testing monitoring functionality.

### 4. Connect the Frontend

Start the React frontend and ensure its monitoring connection points to the local WebSocket endpoint:

```text
ws://localhost:3002/ws/monitorsRealtime
```

The frontend and backend connection settings must match the actual configuration in the code.

## Integration with the Other Components

The monitoring server works alongside the main backend and the React frontend to support real-time patient monitoring updates.

To test the complete system locally, all three components must be running and correctly configured.

## Future Improvements

- Add automated tests for WebSocket connections and subscriptions.
- Improve handling of disconnected clients.
- Document the WebSocket message format.
- Move service URLs into environment variables.
- Add deployment instructions and a demonstration environment.

## Project Context

This repository demonstrates real-time communication and service integration in a patient monitoring application concept designed for hospital nursing workflows.
