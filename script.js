document.addEventListener("DOMContentLoaded", () => {
  // Año automático
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  console.log("JS cargado correctamente");

  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");

  if (!form) {
    console.error("No se encontró el formulario");
    return;
  }

  // 👉 Función para mostrar toast
  function showToast(message, type = "success") {
    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
      toast.className = "toast";
    }, 4000);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Submit interceptado");

    // Formato compatible con Google Apps Script
    const params = new URLSearchParams({
      name: form.name.value,
      company: form.company.value,
      email: form.email.value,
      phone: form.number.value,
      service: form.service.value,
      message: form.message.value
    });

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycby_6HVbVFBmhga-pyNUjlTIXtfsZJGoyMxmFIANPCRvbLgbndNkBw54xQcSD1-1SqnYSQ/exec",
        {
          method: "POST",
          body: params
        }
      );

      showToast(
        "Mensaje enviado correctamente. Te contactaremos pronto ✅",
        "success"
      );

      form.reset();

    } catch (error) {
      console.error(error);

      showToast(
        "Error al enviar el mensaje ❌ Intenta más tarde",
        "error"
      );
    }
  });
});


const botonesVideo = document.querySelectorAll(".ver-video");
const modal = document.getElementById("videoModal");
const video = document.getElementById("videoPlayer");
const cerrar = document.querySelector(".cerrar-video");

botonesVideo.forEach(boton => {

  boton.addEventListener("click", () => {

    const ruta = boton.getAttribute("data-video");

    video.src = ruta;

    modal.style.display = "flex";

  });

});

cerrar.addEventListener("click", () => {

  modal.style.display = "none";
  video.pause();
  video.currentTime = 0;

});

const canvas = document.getElementById("loader-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "010101DATA";
const fontSize = 18;
const columns = canvas.width / fontSize;

const drops = [];

for(let i=0;i<columns;i++){
  drops[i] = Math.random()*canvas.height;
}

function draw(){
  ctx.fillStyle = "rgba(0,0,0,0.15)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#00eaff";
  ctx.font = fontSize + "px monospace";

  for(let i=0;i<drops.length;i++){

    const text = chars[Math.floor(Math.random()*chars.length)];

    ctx.fillText(text,i*fontSize,drops[i]);

    drops[i]+=fontSize;

    if(drops[i] > canvas.height){
      drops[i] = 0;
    }
  }
}

setInterval(draw,40);

window.addEventListener("load",function(){

  setTimeout(()=>{
    document.getElementById("loader").classList.add("hidden");
  },200);

});