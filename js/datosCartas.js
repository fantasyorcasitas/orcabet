// js/datosCartas.js

// Lista de todas las cartas posibles
export const TODAS_LAS_CARTAS = [
    { id: 1, nombre: "Usain Bolt", rareza: "Legendaria", media: 99, img: "https://placehold.co/150x200/gold/white?text=Bolt" },
    { id: 2, nombre: "Eliud Kipchoge", rareza: "Épica", media: 95, img: "https://placehold.co/150x200/purple/white?text=Kipchoge" },
    { id: 3, nombre: "Yulimar Rojas", rareza: "Épica", media: 94, img: "https://placehold.co/150x200/purple/white?text=Yulimar" },
    { id: 4, nombre: "Duplantis", rareza: "Rara", media: 89, img: "https://placehold.co/150x200/blue/white?text=Duplantis" },
    { id: 5, nombre: "Jakob I.", rareza: "Rara", media: 88, img: "https://placehold.co/150x200/blue/white?text=Jakob" },
    { id: 6, nombre: "Atleta Local", rareza: "Común", media: 70, img: "https://placehold.co/150x200/gray/white?text=Local" },
    { id: 7, nombre: "Corredor Popular", rareza: "Común", media: 65, img: "https://placehold.co/150x200/gray/white?text=Popular" },
    // ... añade las que quieras
];

// Función para obtener una carta aleatoria según rareza (Simulada simple)
export function generarCartaAleatoria() {
    const rand = Math.random();
    let cartasPosibles = [];

    // 5% Legendaria, 15% Épica, 30% Rara, 50% Común
    if (rand < 0.05) cartasPosibles = TODAS_LAS_CARTAS.filter(c => c.rareza === "Legendaria");
    else if (rand < 0.20) cartasPosibles = TODAS_LAS_CARTAS.filter(c => c.rareza === "Épica");
    else if (rand < 0.50) cartasPosibles = TODAS_LAS_CARTAS.filter(c => c.rareza === "Rara");
    else cartasPosibles = TODAS_LAS_CARTAS.filter(c => c.rareza === "Común");

    // Si no hay cartas de esa rareza (por si borraste alguna), devuelve una común
    if (cartasPosibles.length === 0) cartasPosibles = TODAS_LAS_CARTAS;

    const indice = Math.floor(Math.random() * cartasPosibles.length);
    return cartasPosibles[indice];
}