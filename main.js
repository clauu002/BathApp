const selectDia = document.getElementById("select-dia");
const preguntaDia = document.getElementById("pregunta-dia");
const preguntaCantidad = document.getElementById("pregunta-cantidad");
const selectCantidad = document.getElementById("select-cantidad");
const confirmacion = document.getElementById("confirmacion");
const empezarBtn = document.getElementById("empezar");

function fadeOut(element, callback) {
  element.classList.remove("fade-in");
  element.classList.add("fade-out");
  setTimeout(() => {
    element.classList.add("oculto");
    element.classList.remove("fade-out");
    if (callback) callback();
  }, 500); // duración del fade
}

function fadeIn(element) {
  element.classList.remove("oculto");
  element.classList.add("fade-in");
}

// Primera selección: Día
selectDia.addEventListener("change", () => {
  fadeOut(preguntaDia, () => {
    // Mostrar cantidad después del fade
    // Rellenar el select de 1 a 30
    selectCantidad.innerHTML = `<option value="" selected disabled>Selecciona una cantidad</option>`;
    for (let i = 1; i <= 30; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `${i} ${i === 1 ? "vez" : "veces"}`;
      selectCantidad.appendChild(option);
    }

    fadeIn(preguntaCantidad);
  });
});

// Segunda selección: cantidad
selectCantidad.addEventListener("change", () => {
  fadeOut(preguntaCantidad, () => {
    fadeIn(confirmacion);

    // Guardar datos
    const configuracion = {
      dia: parseInt(selectDia.value),
      repeticiones: parseInt(selectCantidad.value)
    };
    localStorage.setItem("configuracionRecordatorio", JSON.stringify(configuracion));
  });
});

// Botón de continuar
empezarBtn.addEventListener("click", () => {
  // Oculta la pantalla de configuración
  document.getElementById("pantalla-configuracion").classList.add("oculto");

  // Muestra la pantalla de recordatorio
  document.getElementById("pantalla-recordatorio").classList.remove("oculto");

  // Ejecuta la función para mostrar el contenido del recordatorio
  mostrarRecordatorio();
});


function mostrarRecordatorio() {
  const config = JSON.parse(localStorage.getItem("configuracionRecordatorio"));
  if (!config) return;

  const hoy = new Date().getDay(); // 0 = domingo, 1 = lunes...
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

  const pantalla = document.getElementById("pantalla-recordatorio");
  const mensaje = document.getElementById("mensaje-dia");
  const preguntaTarea = document.getElementById("pregunta-tarea");
  const mensajeTarea = document.getElementById("mensaje-tarea");
  const contador = document.getElementById("contador-restante");
  const btnSi = document.getElementById("btn-si");
  const btnNo = document.getElementById("btn-no");

  pantalla.classList.remove("oculto");
  pantalla.classList.add("fade-in");

  if (hoy !== config.dia) {
    mensaje.textContent = `¡Tranquilo! No es ${dias[config.dia]}. ¡Buen día! ☀️`;
    return;
  }

  mensaje.textContent = `🎉 ¡Feliz ${dias[config.dia]}!`;
  mensaje.classList.add("fade-in");

  // Mostrar pregunta con animación
  setTimeout(() => {
    preguntaTarea.classList.remove("oculto");
    preguntaTarea.classList.add("fade-in");
    mensajeTarea.textContent = `¿Hiciste tu tarea de ${dias[config.dia]}?`;

    const hechos = parseInt(localStorage.getItem("tareasHechas") || "0");
    contador.textContent = `Te quedan: ${config.repeticiones - hechos} días`;
    contador.classList.remove("oculto");
  }, 1000);

  btnSi.addEventListener("click", () => {
    let hechos = parseInt(localStorage.getItem("tareasHechas") || "0");
    hechos++;
    localStorage.setItem("tareasHechas", hechos);
    contador.textContent = `¡Bien hecho! Te quedan: ${config.repeticiones - hechos} días 🎯`;
  });

  btnNo.addEventListener("click", () => {
    contador.textContent = `Está bien. Aún te quedan: ${config.repeticiones - (parseInt(localStorage.getItem("tareasHechas") || "0"))} días 💪`;
  });
}

mostrarRecordatorio();
