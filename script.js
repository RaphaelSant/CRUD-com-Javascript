const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m-nome');
const sArmadura = document.querySelector('#m-armadura');
const sHierarquia = document.querySelector('#m-hierarquia');
const sPerfil = document.querySelector('#m-perfil');


const fPerfil = document.querySelector('#m-imgPerfil');

const btnSalvar = document.querySelector('#btnSalvar');
const btnCancelar = document.querySelector('#btnCancelar');

let itens;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  }

  if (edit) {
    sNome.value = itens[index].nome;
    sArmadura.value = itens[index].armadura;
    sHierarquia.value = itens[index].hierarquia;
    sPerfil.value = itens[index].perfil;
    fPerfil.innerHTML = `<img src="${itens[index].perfil}" class="img-perfil">`;
    id = index;
  } else {
    sNome.value = '';
    sArmadura.value = '';
    sHierarquia.value = '';
    sPerfil.value = '';
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement('tr');

  tr.innerHTML = `
    <td class="acao">${item.nome}</td>
    <td class="acao">${item.armadura}</td>
    <td class="acao">${item.hierarquia}</td>
    <td class="acao"><img src="${item.perfil}" alt="Imagem do cavaleiro ${item.nome} de ${item.armadura}" class="img-perfil"></td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr);
}

btnCancelar.onclick = e => {
  document.location.reload(true);
}

btnSalvar.onclick = e => {
  if (sNome.value == '' || sArmadura.value == '' || sHierarquia.value == '' || sPerfil.value == '') {
    return;
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value;
    itens[id].armadura = sArmadura.value;
    itens[id].hierarquia = sHierarquia.value;
    itens[id].perfil = sPerfil.value;
  } else {
    itens.push({'nome': sNome.value, 'armadura': sArmadura.value, 'hierarquia': sHierarquia.value, 'perfil': sPerfil.value});
  }

  setItensBD();

  modal.classList.remove('active');
  loadItens();
  id = undefined;
  document.location.reload(true);
}

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = '';
  itens.forEach((item, index) => {
    insertItem(item, index);
  });

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

loadItens();
