const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");

addBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const course = document.getElementById("course").value.trim();

  if (name === "" || age === "" || course === "") {
    alert("Please fill all fields");
    return;
  }

  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${name}</td>
    <td>${age}</td>
    <td>${course}</td>
    <td><button class="deleteBtn">Delete</button></td>
  `;

  tableBody.appendChild(row);

  row.querySelector(".deleteBtn").addEventListener("click", () => {
    row.remove();
  });

  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("course").value = "";
});
