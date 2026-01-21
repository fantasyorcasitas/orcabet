import { auth, db } from "./app.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc, updateDoc, arrayUnion, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { generarCartaAleatoria } from "./datosCartas.js";

let usuarioActualId = null;
let dineroActual = 0;

// 1. CARGAR DATOS DEL USUARIO
onAuthStateChanged(auth, async (user) => {
    if (user) {
        usuarioActualId = user.uid;
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            dineroActual = docSnap.data().dinero;
            document.getElementById('saldoUsuario').textContent = `${dineroActual} 🪙`;
        }
    } else {
        window.location.href = "login.html";
    }
});

// 2. FUNCIÓN DE COMPRA (Se exporta al window para usarla en el HTML)
window.comprarSobre = async (tipo, precio) => {
    if (!usuarioActualId) return;

    if (dineroActual < precio) {
        alert("¡No tienes suficiente dinero! Vete a apostar un poco.");
        return;
    }

    // Definir cuántas cartas da cada sobre
    let cantidadCartas = 0;
    if (tipo === 'basico') cantidadCartas = 3;
    if (tipo === 'oro') cantidadCartas = 5;
    if (tipo === 'gratis') cantidadCartas = 1;

    // Generar las cartas
    let cartasNuevas = [];
    let cartasNuevasIDs = []; // Solo guardamos los IDs en la base de datos para ahorrar espacio

    for (let i = 0; i < cantidadCartas; i++) {
        const carta = generarCartaAleatoria();
        cartasNuevas.push(carta);
        cartasNuevasIDs.push(carta.id);
    }

    try {
        // ACTUALIZAR BASE DE DATOS (Transacción atómica)
        const usuarioRef = doc(db, "usuarios", usuarioActualId);

        await updateDoc(usuarioRef, {
            dinero: increment(-precio), // Restar dinero de forma segura
            cartas: arrayUnion(...cartasNuevasIDs) // Añadir cartas sin borrar las que tenía
        });

        // Actualizar interfaz local
        dineroActual -= precio;
        document.getElementById('saldoUsuario').textContent = `${dineroActual} 🪙`;

        // MOSTRAR APERTURA
        mostrarCartas(cartasNuevas);

    } catch (error) {
        console.error("Error al comprar:", error);
        alert("Hubo un error en la transacción.");
    }
};

// 3. MOSTRAR ANIMACIÓN
function mostrarCartas(cartas) {
    const contenedor = document.getElementById('contenedorCartasGanadas');
    contenedor.innerHTML = ''; // Limpiar anterior

    cartas.forEach(c => {
        const div = document.createElement('div');
        div.className = 'carta-visual';
        // Borde según rareza
        let colorBorde = 'gray';
        if(c.rareza === 'Rara') colorBorde = 'blue';
        if(c.rareza === 'Épica') colorBorde = 'purple';
        if(c.rareza === 'Legendaria') colorBorde = 'gold';

        div.style.border = `4px solid ${colorBorde}`;
        div.innerHTML = `
            <img src="${c.img}" alt="${c.nombre}">
            <strong>${c.nombre}</strong>
            <small>${c.rareza}</small>
            <span>Media: ${c.media}</span>
        `;
        contenedor.appendChild(div);
    });

    document.getElementById('modalApertura').style.display = 'flex';
}

window.cerrarModal = () => {
    document.getElementById('modalApertura').style.display = 'none';
};