// Variables
const typePerson = document.querySelector('.type-person');
const btnADD = document.querySelector('.btn-add');
const personListSelected = document.querySelector('.selected-list');
const selectedPlaceholder = document.querySelector('.selected-placeholder').style;
const personRegister = document.querySelector('.person-register');
const personList = document.querySelector('.person-list');

let listSelected = [];
let listRegister = [];
let list = [
  {
    label: 'Luan',
    id: 1
  },
  {
    label: 'Maykon',
    id: 2
  },
  {
    label: 'Lucas',
    id: 3
  },
  {
    label: 'Beatriz',
    id: 4
  },
  {
    label: 'Aline',
    id: 5
  },
  {
    label: 'Carolina',
    id: 6
  },
  {
    label: 'Nanah',
    id: 7
  },
  {
    label: 'Ryan',
    id: 8
  }
];

let saveList = JSON.parse(localStorage.getItem('list'));
let saveListRegister = JSON.parse(localStorage.getItem('listRegister'));

// Events
window.addEventListener("load", function () {
  if (saveList) list = saveList;

  handleAddPerson();
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
  let random = Math.floor(Math.random() * listSelected.length);
  let date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  listSelected.length && listRegister.push({
    label: listSelected[random].label, 
    date: `${day}/${month}/${year} - ${hours}h${minutes}m`
  });

  updateListRegister();
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag (ev) {
  const { classList } = ev.target;
  ev.dataTransfer.setData("personID", classList[1]);
}

function drop (ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("personID");
  const filter = saveList.filter(item => item.id === Number(data))

  listSelected.push(...filter);
  updateListSelected();
}

function handleDisablePerson () {
  listSelected?.map(item => {
    const teste = document.getElementById(`${item.id}`);
    teste?.classList?.add('active'); 
    console.log(teste);
  })
}

// Listas
function updateListSelected () { 
  personListSelected.innerHTML = '';

  if (listSelected.length)
    selectedPlaceholder.display = 'none';
  else selectedPlaceholder.display = 'flex';

  listSelected?.map(item => {
    const person = document.createElement("li");
    person.classList = `person-selected-item ${item.id}`;
    
    const personName = document.createElement("p");
    personName.classList = 'person-selected-name';
    personName.innerText = item.label;
  
    person.appendChild(personName)
    personListSelected.appendChild(person);
  })

  handleDisablePerson();
}

function updateList () { 
  saveList = JSON.parse(localStorage.getItem('list'));
  personList.innerHTML = '';

  saveList?.map(item => {
    const person = document.createElement("li");
    person.classList = `person-item ${item.id}`;
    person.id = item.id;
    person.draggable = true;
    person.addEventListener('dragstart', drag)
    
    const personName = document.createElement("p");
    personName.classList = 'person-name';
    personName.innerText = item.label;
    
    const lixeira = document.createElement("img");
    lixeira.classList = 'remove-item';
    lixeira.addEventListener('click', handleRemovePerson)
    lixeira.src = "https://icon-library.com/images/delete-icon-png-16x16/delete-icon-png-16x16-4.jpg";
    
    person.appendChild(personName)
    person.appendChild(lixeira);
    personList.appendChild(person);
  })

  handleDisablePerson();
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
    personDate.classList = 'register-date';
    personDate.innerText = item.date;
    
    person.appendChild(personName)
    person.appendChild(personDate);
    personRegister.appendChild(person);
  })
}