let tareas = [];

function agregarTarea() {
    const input = document.getElementById('nuevaTarea');
    const texto = input.value.trim();
    
    if (texto !== "") {
        tareas.push(texto);
        renderizarTareas();
        input.value = "";
    }
}

function renderizarTareas() {
    const lista = document.getElementById('listaTareas');
    lista.innerHTML = tareas.map(tarea => 
        `<li>${tarea} <button onclick="eliminarTarea('${tarea}')">×</button></li>`
    ).join('');
}

function eliminarTarea(tarea) {
    tareas = tareas.filter(t => t !== tarea);
    renderizarTareas();
}
