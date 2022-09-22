const API_URL = "https://dummy-apis.netlify.app/api/contact-suggestions?count=";
const contactListElement = document.querySelector(".contact-list");

// store
let contacts = [];

async function getDataFromApi() {
  const response = await fetch(API_URL + 8);
  contacts = await response.json();
}

function generateName(nameData) {
  let output = "";

  if (nameData?.title) {
    output += nameData.title;
  }

  if (nameData?.first) {
    output += " " + nameData.first;
  }

  if (nameData?.last) {
    output += " " + nameData.last;
  }

  return output;
}

async function addNewPersonFromApi() {
  const response = await fetch(API_URL + 1);
  return await response.json();
}

async function removePerson(index) {
  contacts = contacts.filter((item, i) => i !== index);

  const newPerson = await addNewPersonFromApi();
  contacts.push(newPerson[0]);
  render();
}

function generatePersonHtml(
  index,
  { picture, name, title, mutualConnections, backgroundImage }
) {
  console.log();
  return `<li class="contact-person" style="background-image: url(${backgroundImage}?i=${index})">
      <button class="btn-remove-person">x</button>
      <img src="${picture}" alt="Bild von Name der Person">
      <h2>${generateName(name)}</h2>
      <p>${title}</p>
      <p>${mutualConnections} Mutual connect</p>
      <button>Connect / Pending</button>
    </li>`;
}

function render() {
  contactListElement.innerHTML = "";

  let output = "";
  let index = 0;

  for (let contact of contacts) {
    output += generatePersonHtml(index, contact);
    index++;
  }

  document.querySelector(".contact-list").innerHTML = output;

  document.querySelectorAll(".btn-remove-person").forEach((button, index) => {
    button.addEventListener("click", () => removePerson(index));
  });
}

async function initApp() {
  await getDataFromApi();
  render();
}

initApp();
