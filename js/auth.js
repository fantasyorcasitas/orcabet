// js/auth.js
import { auth, db } from "./app.js";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// --- REFERENCIAS DOM ---
const registroForm = document.getElementById('registroForm');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');

// --- 1. LÓGICA DE REGISTRO ---
if (registroForm) {
    registroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = document.getElementById('btnRegistro');

        try {
            btn.textContent = "Creando cuenta...";
            btn.disabled = true;

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "usuarios", user.uid), {
                username: username,
                email: email,
                dinero: 1000,
                cartas: [],
                rol: "user",
                fecha_registro: new Date()
            });

            alert("¡Cuenta creada! Redirigiendo...");
            window.location.href = "../index.html";

        } catch (error) {
            console.error(error);
            alert("Error: " + error.message);
            btn.textContent = "Registrarse";
            btn.disabled = false;
        }
    });
}

// --- 2. LÓGICA DE LOGIN (NUEVO) ---
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const btn = document.getElementById('btnLogin');

        try {
            btn.textContent = "Entrando...";
            btn.disabled = true;

            // Iniciar sesión en Firebase
            await signInWithEmailAndPassword(auth, email, password);

            // Si no da error, redirige a la home
            window.location.href = "../index.html";

        } catch (error) {
            console.error(error);
            alert("Error al entrar: Usuario o contraseña incorrectos.");
            btn.textContent = "Entrar";
            btn.disabled = false;
        }
    });
}

// --- 3. LÓGICA DE LOGOUT (CERRAR SESIÓN) ---
// Esta función se puede llamar desde cualquier botón con id="logoutBtn"
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            window.location.href = "pages/login.html";
        } catch (error) {
            console.error("Error al salir", error);
        }
    });
}