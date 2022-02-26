// Variables
const typePerson = document.querySelector('.type-person');
const btnADD = document.querySelector('.btn-add');
const personList = document.querySelector('.person-list');

let list = [];

// Events
window.addEventListener("load", updateList);
btnADD.addEventListener('click', handleAddPerson);

function handleAddPerson  () {
  if (typePerson.value !== '')
    list.push({label: typePerson.value, id: Date.now()});

    typePerson.value = '';
    updateList();
}

function handleRemovePerson () {
  const parent = this.parentNode;
  const _class = parent.classList[1];
  
  const teste = list.filter(item => item.id != _class)
  list = teste;
  console.log(list);

  updateList();  
}
 
function updateList () {
  personList.innerHTML = '';

  list.map(item => {
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

function generateRandomPerson () {
  let teste = Math.floor(Math.random() * list.length)
  alert(list[teste].label);
}