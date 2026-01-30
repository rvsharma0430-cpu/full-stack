const textInput = document.getElementById("textInput");
const count = document.getElementById("count");
const limit = document.getElementById("limit");
const counterBox = document.querySelector(".counter");

const maxChars = 200;
limit.textContent = maxChars;

textInput.addEventListener("input", () => {
  const currentLength = textInput.value.length;
  count.textContent = currentLength;

  counterBox.classList.remove("warning", "danger");

  if (currentLength > maxChars * 0.8 && currentLength <= maxChars) {
    counterBox.classList.add("warning");
  }

  if (currentLength > maxChars) {
    counterBox.classList.add("danger");
  }
});
