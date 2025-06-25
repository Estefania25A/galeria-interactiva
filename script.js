const imageUrlInput = document.getElementById('imageUrl');
const addImageBtn = document.getElementById('addImageBtn');
const removeImageBtn = document.getElementById('removeImageBtn');
const gallery = document.getElementById('gallery');

let selectedImage = null;

// Función para seleccionar imágenes
function setupImage(img) {
  img.addEventListener('click', () => {
    if (selectedImage) selectedImage.classList.remove('selected');
    img.classList.add('selected');
    selectedImage = img;
  });
}

// Activar selección en imágenes ya existentes
document.querySelectorAll('.gallery img').forEach(setupImage);

// Agregar imagen desde URL
addImageBtn.addEventListener('click', () => {
  const url = imageUrlInput.value.trim();
  if (!url) return;

  const img = document.createElement('img');
  img.src = url;
  img.alt = "Imagen nueva";

  // Si no carga, alerta y no la añade
  img.onerror = () => {
    alert("❌ No se pudo cargar la imagen. Asegúrate de que la URL sea directa (jpg, png).");
    img.remove();
  };

  // Si carga bien, se añade a la galería
  img.onload = () => {
    setupImage(img);
    gallery.appendChild(img);
  };

  imageUrlInput.value = '';
});

// Eliminar imagen seleccionada
removeImageBtn.addEventListener('click', () => {
  if (selectedImage) {
    gallery.removeChild(selectedImage);
    selectedImage = null;
  }
});

// Atajo con Enter
imageUrlInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addImageBtn.click();
  }
});
