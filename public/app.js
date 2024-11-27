const agregarTarea = async () => {
    const descripcion = document.querySelector('#nuevaTarea').value;
    if (descripcion.trim() === '') {
      alert('Por favor, ingresa una descripción para la tarea');
      return;
    }
  
    const response = await fetch('http://localhost:3000/tareas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descripcion }),
    });
  
    const tarea = await response.json();
    agregarTareaALista(tarea);
  };
  
  const obtenerTareas = async () => {
    const response = await fetch('http://localhost:3000/tareas');
    const data = await response.json();
    data.tareas.forEach((tarea) => agregarTareaALista(tarea));
  };
  
  const agregarTareaALista = (tarea) => {
    const lista = document.querySelector('#listaTareas');
    const item = document.createElement('li');
    item.textContent = tarea.descripcion;
    const boton = document.createElement('button');
    boton.textContent = 'Eliminar';
    boton.onclick = () => eliminarTarea(tarea.id, item);
    item.appendChild(boton);
    lista.appendChild(item);
  };
  
  const eliminarTarea = async (id, item) => {
    await fetch(`http://localhost:3000/tareas/${id}`, { method: 'DELETE' });
    item.remove();
  };
  
  document.addEventListener('DOMContentLoaded', obtenerTareas);
  