// Datos de ejemplo - En una aplicación real vendrían de una API o base de datos
const docentes = [
    { id: 1, nombre: "María García", foto: "/assets/img/elena.avif" },
    { id: 2, nombre: "Juan Pérez", foto: "/assets/img/elena.avif" },
    { id: 3, nombre: "Laura Martínez", foto: "/assets/img/elena.avif" }
];
// materias disponibles
const materias = [
    { id: 1, nombre: "Base de datos" },
    { id: 2, nombre: "Programación" },
    { id: 3, nombre: "Electrónica" },
    { id: 4, nombre: "Física" },
    { id: 5, nombre: "Inglés" }
];

// Asignaciones guardadas
let asignaciones = [
    { id: 1, docente: "María García", materia: "Base de datos", aula: "A-101" },
    { id: 2, docente: "Juan Pérez", materia: "Programación", aula: "B-205" }
];

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarDocentes();
    cargarMaterias();
    renderizarAsignaciones();
    
    // Evento del botón guardar
    document.querySelector('.btn-asignar').addEventListener('click', guardarAsignacion);
});

// Cargar docentes en el select
function cargarDocentes() {
    const select = document.getElementById('select-docente');
    docentes.forEach(docente => {
        const option = document.createElement('option');
        option.value = docente.id;
        option.textContent = docente.nombre;
        select.appendChild(option);
    });
}

// Cargar materias en el select
function cargarMaterias() {
    const select = document.getElementById('select-materia');
    materias.forEach(materia => {
        const option = document.createElement('option');
        option.value = materia.id;
        option.textContent = materia.nombre;
        select.appendChild(option);
    });
}

// Renderizar las tarjetas de asignaciones
function renderizarAsignaciones() {
    const contenedor = document.getElementById('lista-asignaciones');
    contenedor.innerHTML = '';
    
    asignaciones.forEach(asignacion => {
        const card = document.createElement('article');
        card.className = 'Asignacion-card';
        card.innerHTML = `
            <h2>${asignacion.materia}</h2>
            <p><strong>Docente:</strong> ${asignacion.docente}</p>
            <p><strong>Aula:</strong> ${asignacion.aula}</p>
        `;
        contenedor.appendChild(card);
    });
}

// Guardar una nueva asignación
function guardarAsignacion() {
    const selectDocente = document.getElementById('select-docente');
    const selectMateria = document.getElementById('select-materia');
    const inputAula = document.getElementById('input-aula');
    
    const docenteId = selectDocente.value;
    const materiaId = selectMateria.value;
    const aula = inputAula.value.trim();
    
    // Validar que todos los campos estén llenos
    if (!docenteId || !materiaId || !aula) {
        alert('Por favor complete todos los campos');
        return;
    }
    
    // Obtener nombres
    const docenteNombre = docentes.find(d => d.id == docenteId).nombre;
    const materiaNombre = materias.find(m => m.id == materiaId).nombre;
    
    // Crear nueva asignación
    const nuevaAsignacion = {
        id: asignaciones.length + 1,
        docente: docenteNombre,
        materia: materiaNombre,
        aula: aula
    };
    
    asignaciones.push(nuevaAsignacion);
    renderizarAsignaciones();
    
    // Limpiar el formulario
    selectDocente.value = '';
    selectMateria.value = '';
    inputAula.value = '';
    
    alert('Asignación guardada correctamente');
}