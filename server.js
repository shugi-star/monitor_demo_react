const http = require("http");
const express = require("express");
const { WebSocketServer } = require("ws");

const PORT = 3002;

const app = express();
app.use(express.json());
app.use(express.static("public"));

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/ws/monitorsRealtime" });

/* -----------------------------
   🧠 זיכרון שרת (state)
------------------------------ */

// מטופלים נטענים פעם אחת (אפשר גם DB)
let patients = [];

//מערך של מי משמחובר
const clients = new Map(); 
// ws -> { patientId }

/* -----------------------------
   📡 HTTP: שליפת מטופלים
------------------------------ */

app.get("/patients", async (req, res) => {
  try {
    const response = await fetch("http://localhost:3001/patientsRoutse/AllPatients");
    const data = await response.json();
    console.log("data patients from monitor: ",data)
    patients = data; // שומרים בשרת לשימוש בזמן אמת
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load patients" });
  }
});

/* -----------------------------
   🎲 יצירת נתונים רנדומליים
------------------------------ */

function randomVitals(patientId) {
  return {
    patient_id: patientId,
    heart_rate: 60 + Math.floor(Math.random() * 40),
    oxygen_level: 92 + Math.floor(Math.random() * 8),
    blood_pressure: `${110 + Math.floor(Math.random() * 20)}/${70 + Math.floor(Math.random() * 15)}`,
    temperature: Number((36.5 + Math.random() * 1.2).toFixed(1)),
    ecg: ["normal", "irregular"][Math.floor(Math.random() * 2)],
    timestamp: new Date().toISOString(),
  };
}

/* -----------------------------
    WebSocket connection
------------------------------ */

wss.on("connection", (ws) => {
  console.log("Client connected");

  /* -------------------------
      הודעות מהקליינט
  -------------------------- */
  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);

      // האחות אומרת איזה מטופל היא רוצה לראות
      if (data.type === "subscribe") {

        //מי שמחובר עכשיו
        const current = clients.get(ws) || { patientIds: [] };

        //בדיקה שהוא לא קיים כבר
    if (!current.patientIds.includes(data.patientId)) {
      current.patientIds.push(data.patientId);
    }
        clients.set(ws, current);
        console.log("Subscribed to patient:", data.patientId);
      }
   
    //סגירת מאזין
    if (data.type === "unsubscribe") {
      const current = clients.get(ws);
      current.patientIds = current.patientIds.filter(
        id => id !== data.patientId
      );
      clients.set(ws, current);

      console.log("Unsubscribed:", data.patientId);
  }
  }
  catch(err){
    console.error("Invalid WS message:", err);
  }
}
  );

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected");
  });
});

/* -----------------------------
   ⏱️ לולאת זמן אמת
------------------------------ */
setInterval(() => {

  for (const ws of wss.clients) {
    if (ws.readyState !== 1) continue;
    const alerts =[];
    const state = clients.get(ws);
    if (!state?.patientIds) continue;

    const vitals = randomVitals(state.patientId);

    // בדיקות חריגות
    if (vitals.heart_rate < 50) {
      alerts.push("דופק נמוך");
  }
  
  if (vitals.heart_rate > 100) {
      alerts.push("דופק גבוה");
  }
  
  if (vitals.oxygen_level < 92) {
      alerts.push("סטורציה נמוכה");
  }
  
  if (vitals.temperature > 38) {
      alerts.push("חום גבוה");
  }
  
  if (vitals.temperature < 35) {
      alerts.push("חום גוף נמוך");
  }
  //פירוק הלחץ דם
  const [sys, dia] = vitals.blood_pressure
    .split("/")
    .map(Number);

    if (sys > 140 || dia > 90) {
      alerts.push("לחץ דם גבוה");
  }
  
  if (sys < 90 || dia < 60) {
      alerts.push("לחץ דם נמוך");
  }

  if (vitals.ecg !== "normal")
  alerts.push("חריגה באק״ג");

    ws.send(
      JSON.stringify({
        type: "vitals",
        patient_id: state.patientId,
        data: vitals,
        alerts:alerts
      })
    );
  }
}, 1000);

/* -----------------------------
   🚀 הפעלת שרת
------------------------------ */

server.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
  console.log(`WS: ws://localhost:${PORT}/ws/monitorsRealtime`);
});