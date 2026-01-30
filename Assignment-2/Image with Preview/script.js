const thumbnails = document.querySelectorAll(".thumb");
const previewImage = document.getElementById("previewImage");

thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    previewImage.src = thumb.src;

    thumbnails.forEach((t) => t.classList.remove("active"));
    thumb.classList.add("active");
  });
});
