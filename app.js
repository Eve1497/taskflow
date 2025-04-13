document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const inputTarea = document.getElementById('nuevaTarea');
    const agregarBtn = document.getElementById('agregarBtn');
    const listaTareas = document.getElementById('listaTareas');
    
    // Cargar tareas desde localStorage
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    
    // Renderizar tareas al cargar la página
    renderizarTareas();
    
    // Event Listeners
    agregarBtn.addEventListener('click', agregarTarea);
    inputTarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') agregarTarea();
    });
    
    // Función para renderizar tareas
    function renderizarTareas() {
        listaTareas.innerHTML = tareas.map((tarea, index) => `
            <li class="${tarea.completada ? 'completed' : ''}">
                <span>${tarea.texto}</span>
                <div class="task-actions">
                    <button class="complete-btn" data-index="${index}">✓</button>
                    <button class="delete-btn" data-index="${index}">×</button>
                </div>
            </li>
        `).join('');
        
        // Agregar event listeners a los botones nuevos
        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', toggleCompletada);
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', eliminarTarea);
        });
    }
    
    // Función para agregar tarea
    function agregarTarea() {
        const texto = inputTarea.value.trim();
        
        if (texto) {
            tareas.push({ texto, completada: false });
            guardarTareas();
            inputTarea.value = '';
            inputTarea.focus();
            renderizarTareas();
        }
    }
    
    // Función para marcar tarea como completada
    function toggleCompletada(e) {
        const index = e.target.dataset.index;
        tareas[index].completada = !tareas[index].completada;
        guardarTareas();
        renderizarTareas();
    }
    
    // Función para eliminar tarea
    function eliminarTarea(e) {
        const index = e.target.dataset.index;
        tareas.splice(index, 1);
        guardarTareas();
        renderizarTareas();
    }
    
    // Función para guardar en localStorage
    function guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
});
