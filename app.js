document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const welcomeScreen = document.getElementById('welcome-screen');
    const durationScreen = document.getElementById('duration-screen');
    const confirmationScreen = document.getElementById('confirmation-screen');
    const daySelector = document.getElementById('day-selector');
    const daysCount = document.getElementById('days-count');
    const nextBtn1 = document.getElementById('next-btn-1');
    const nextBtn2 = document.getElementById('next-btn-2');
    const startBtn = document.getElementById('start-btn');
    const confirmationMessage = document.getElementById('confirmation-message');

    // Al inicio de app.js (después del DOMContentLoaded)
if (localStorage.getItem('remainingDays')) {
    const savedDays = localStorage.getItem('remainingDays');
    if (savedDays > 0) {
        // Mostrar pantalla de confirmación con días guardados
        confirmationScreen.classList.add('active');
        confirmationMessage.textContent = `Tienes ${savedDays} día${savedDays !== 1 ? 's' : ''} restante${savedDays !== 1 ? 's' : ''}.`;
    }
}

    // Generar opciones de días (1-20)
    for (let i = 1; i <= 20; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i === 1 ? `${i} día` : `${i} días`;
        daysCount.appendChild(option);
    }

    // Evento para el primer botón "Continuar"
    nextBtn1.addEventListener('click', function() {
        if (!daySelector.value) {
            alert('Por favor selecciona un día');
            return;
        }
        
        welcomeScreen.classList.remove('active');
        welcomeScreen.style.display = 'none';
        durationScreen.classList.add('active');
        durationScreen.style.display = 'block';
    });

    // Evento para el segundo botón "Confirmar"
    nextBtn2.addEventListener('click', function() {
        if (!daysCount.value) {
            alert('Por favor selecciona la cantidad de días');
            return;
        }
        
        const selectedDay = daySelector.options[daySelector.selectedIndex].text;
        const days = daysCount.value;
        
        confirmationMessage.textContent = `Recordarás ${selectedDay} por ${days} ${days === '1' ? 'día' : 'días'}.`;
        
        durationScreen.classList.remove('active');
        durationScreen.style.display = 'none';
        confirmationScreen.classList.add('active');
        confirmationScreen.style.display = 'block';
    });

    // Evento para el botón "Comenzar"
// Reemplaza el evento click del startBtn en app.js
startBtn.addEventListener('click', function() {
    const selectedDay = daySelector.value;
    const daysCount = document.getElementById('days-count').value;
    window.location.href = `main.html?day=${selectedDay}&days=${daysCount}`;
});
});