// Variables
const typePerson = document.querySelector('.type-person');
const btnADD = document.querySelector('.btn-add');
const personList = document.querySelector('.person-list');
const personRegister = document.querySelector('.person-register');

let list = [];
let listRegister = [];

let saveList = JSON.parse(localStorage.getItem('list'));
let saveListRegister = JSON.parse(localStorage.getItem('listRegister'));

// Events
window.addEventListener("load", function () {
  if (saveList) list = saveList;

  updateList()
  updateListRegister()
});
btnADD.addEventListener('click', handleAddPerson);

function handleAddPerson  () {
  if (typePerson.value !== '') 
    list.push({label: typePerson.value, id: Date.now()});

  localStorage.setItem('list', JSON.stringify(list));
  typePerson.value = '';
  updateList();
}

function handleRemovePerson (event) {
  const { parentNode } = event.target;
  personList.innerHTML = '';
  
  list = 
   list.filter(item => item.id != parentNode.classList[1]); 

  localStorage.setItem('list', JSON.stringify(list));
  updateList();
}
 
function generateRandomPerson () {
  let random = Math.floor(Math.random() * list.length);
  let date = new Date();

  const day = date.getDay();
  const month = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  listRegister.push({
    label: list[random].label, 
    date: `${day}/${month}/${year} - ${hours}h${minutes}m`
  });

  updateListRegister();
}

// Listas
function updateList () { 
  saveList = JSON.parse(localStorage.getItem('list'));
  personList.innerHTML = '';

  saveList?.map(item => {
    const person = document.createElement("li");
    person.classList = `person-item ${item.id}`;
    
    const personName = document.createElement("p");
    personName.classList = 'person-name';
    personName.innerText = item.label;
    
    const lixeira = document.createElement("img");
    lixeira.classList = 'remove-item';
    lixeira.addEventListener('click', handleRemovePerson)
    lixeira.src = "https://cdn.icon-icons.com/icons2/1489/PNG/512/rubbishbin_102620.png";
    
    person.appendChild(personName)
    person.appendChild(lixeira);
    personList.appendChild(person);
  })
}

function updateListRegister () {
  saveListRegister = JSON.parse(localStorage.getItem('listRegister'));
  personRegister.innerHTML = '';

  listRegister?.map(item => {
    const person = document.createElement("li");
    person.classList = `item-register ${item.date}`;
    
    const personName = document.createElement("p");
    personName.classList = 'register-name';
    personName.innerText = item.label;
    
    const personDate = document.createElement("p");
    personDate.classList = 'remove-date';
    personDate.innerText = item.date;
    
    person.appendChild(personName)
    person.appendChild(personDate);
    personRegister.appendChild(person);
  })
}