
const db = {
    alumnos: [
        { id: "24040912", nombre: "Valeria Mendizábal" },
        { id: "24040913", nombre: "Carlos Gómez" }
    ],
    materias: [
        { id: "MAT101", nombre: "Álgebra", creditos: 5 },
        { id: "PRG201", nombre: "Programación I", creditos: 6 },
        { id: "BD301", nombre: "Base de Datos", creditos: 5 }
    ]
};

let creditosActuales = 0;

// 1. Llenar los selectores al cargar la página
window.onload = () => {
    const sAlumno = document.getElementById('select-alumno');
    const sMateria = document.getElementById('select-materia');

    db.alumnos.forEach(a => sAlumno.innerHTML += `<option value="${a.id}">${a.nombre}</option>`);
    db.materias.forEach(m => sMateria.innerHTML += `<option value="${m.id}">${m.nombre} (${m.creditos} cr)</option>`);
};

// 2. Lógica para INSCRIBIR (Botón Cargar)
document.getElementById('form-carga').addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const materiaId = document.getElementById('select-materia').value;
    const materiaInfo = db.materias.find(m => m.id === materiaId);

    if (materiaInfo) {
        agregarTarjeta(materiaInfo);
        actualizarCreditos(materiaInfo.creditos);
    }
});

function agregarTarjeta(materia) {
    const lista = document.getElementById('lista-carga');
    const card = document.createElement('article');
    card.className = 'Carga-card';
    card.innerHTML = `
        <h2>${materia.nombre}</h2>
        <p><strong>Clave:</strong> ${materia.id}</p>
        <p><strong>Créditos:</strong> ${materia.creditos}</p>
        <button class="btn-eliminar-carga" onclick="eliminarMateria(this, ${materia.creditos})">Dar de baja</button>
    `;
    lista.appendChild(card);
}

function actualizarCreditos(cantidad) {
    creditosActuales += cantidad;
    document.getElementById('total-creditos').innerText = creditosActuales;
}

function eliminarMateria(boton, creditos) {
    boton.parentElement.remove();
    actualizarCreditos(-creditos);
}