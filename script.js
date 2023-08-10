const name = document.getElementById("name");
const phone = document.getElementById("phone");
const table = document.getElementById("numberList");

const savedDirectoryJSON = localStorage.getItem("directory");
const savedDirectory = savedDirectoryJSON ? JSON.parse(savedDirectoryJSON) : [];

for (const directory of savedDirectory) {
  addDirectoryList(directory);
}

function addDirectory() {
  const nameInput = name.value.trim();
  const phoneInput = phone.value.trim();

  if (nameInput === "" || phoneInput === "") {
    alert("Lütfen verileri doldurnuz.");
  } else {
    const directory = {
      id: Date.now(),
      text: nameInput,
      phone: phoneInput,
    };
    savedDirectory.push(directory);
    localStorage.setItem("directory", JSON.stringify(savedDirectory));
    addDirectoryList(directory);
    name.value = "";
    phone.value = "";
  }
}

function addDirectoryList(directory) {
  const tr = document.createElement("tr");
  tr.setAttribute("id", directory.id);

  tr.innerHTML = `
    <td ><span>${directory.text}</span></td>
    <td> <span>${directory.phone}</span> </td>
    <td><button class = "btnList" onClick = "removeNumber(${directory.id})"><i class="fa-regular fa-trash-can"></i></button>
    <button class = "btnList" onClick = "editName(${directory.id})"><i class="fa-solid fa-user-pen"></i></button></td>
    
  `;

  table.appendChild(tr);
}

function removeNumber(id) {
  const numberElement = document.getElementById(id);

  savedDirectory.splice(
    savedDirectory.findIndex((directory) => directory.id === id),
    1
  );
  localStorage.setItem("directory", JSON.stringify(savedDirectory));
  numberElement.remove();
}

function editName(id) {
  const changeName = savedDirectory.find((directory) => directory.id === id);
  const newName = prompt("Yeni İsim Giriniz");

  if (newName.trim() === "") {
    alert("Lütfen Boş değer girmeyiniz");
  } else {
    changeName.text = newName.trim();
    localStorage.setItem("directory", JSON.stringify(savedDirectory));
    const nameElement = document.getElementById(id);
    nameElement.querySelector("span").textContent = newName;
  }
}
