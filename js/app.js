// js/app.js
// Usamos las versiones web (CDN) para que funcione directo en el navegador
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// TU CONFIGURACIÓN (La que me has pasado)
const firebaseConfig = {
  apiKey: "AIzaSyAm5TX5FY7bUbSQkVe98nFzGw6mU4LL5fI",
  authDomain: "orcabet-7cd40.firebaseapp.com",
  projectId: "orcabet-7cd40",
  storageBucket: "orcabet-7cd40.firebasestorage.app",
  messagingSenderId: "958802524863",
  appId: "1:958802524863:web:8901469faba144099de40a",
  measurementId: "G-N2SZG9JQK5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportamos las herramientas para usarlas en otros archivos
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("🔥 Firebase conectado en Orcabet");