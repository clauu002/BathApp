document.addEventListener('DOMContentLoaded', function() {
    // Obtener parámetros de la URL (día seleccionado y días restantes)
    const urlParams = new URLSearchParams(window.location.search);
    const selectedDay = urlParams.get('day');
    let remainingDays = parseInt(urlParams.get('days')) || 0;

    // Elementos del DOM
    const dayMessage = document.getElementById('day-message');
    const taskContainer = document.getElementById('task-container');
    const resultMessage = document.getElementById('result-message');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const btnExit = document.getElementById('btn-exit');


    // Obtener el día actual en español
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const today = new Date().getDay();
    const todayName = days[today];

    // Mostrar mensaje según coincida el día
    if (selectedDay === todayName && remainingDays > 0) {
        dayMessage.textContent = `¡Hoy es ${selectedDay}!`;
        taskContainer.style.display = 'block';
    } else {
        dayMessage.textContent = `No te preocupes, hoy no es ${selectedDay}.`;
        resultMessage.innerHTML = `<p class="info-message">Días restantes: ${remainingDays}</p>`;
    }

    // Evento para botón "Sí"
    btnYes.addEventListener('click', function() {
    remainingDays--;
    resultMessage.innerHTML = `
        <p class="success-message">¡Muy bien! Te quedan ${remainingDays} día${remainingDays !== 1 ? 's' : ''}.</p>
        ${remainingDays > 0 ? '<p>¡Sigue así!</p>' : '<p class="congrats">🎉 ¡Meta completada! 🎉</p>'}
    `;
    taskContainer.style.display = 'none';
    btnExit.style.display = 'block'; // Mostrar botón de salir
    updateURLParams();
});

    // Evento para botón "No"
    btnNo.addEventListener('click', function() {
        resultMessage.innerHTML = `
            <p class="warning-message">Pues haz tu tarea para descontar un día.</p>
            <p>Días restantes: ${remainingDays}</p>
        `;
    });

    // Evento para boton "Salir"
    btnExit.addEventListener('click', function() {
        // Método infalible para redirección
        const pathParts = window.location.pathname.split('/');
        pathParts.pop(); // Elimina "main.html"
        const newPath = pathParts.join('/') + '/index.html';
        window.location.href = newPath;
});

    // Actualizar parámetros en la URL
    function updateURLParams() {
    const newUrl = `${window.location.pathname}?day=${selectedDay}&days=${remainingDays}`;
    window.history.replaceState({}, '', newUrl);
    localStorage.setItem('remainingDays', remainingDays); // Guardar en localStorage
}
});