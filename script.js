const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let items = []
let id

const openModal = (edit = false, index = 0) => {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') != -1) {
            modal.classList.remove('active')
    
        }
    }

    if (edit) {
        sNome.value = items[index].nome
        sFuncao.value = items[index].funcao
        sSalario.value = items[index].salario
        id = index
    } else {
        sNome.value = ''
        sFuncao.value = ''
        sSalario.value = ''
    }
}

const editItem = (index) => {
    openModal(true, index)
}

const deleteItem = (index) => {
    items.splice(index, 1)
    setItemsDB()
    loadItems()
}

function insertItem(item, index) {
    let tr = document.createElement('tr')
    tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>${item.salario}</td>
    <td class='acao'>
        <button onclick='editItem(${index})'><i class='bx bx-edit' ></i></button>
    </td>
    <td class='acao'>
        <button onclick='deleteItem(${index})'><i class='bx bx-trash' ></i></button>
    </td>
    `
    tbody.appendChild(tr)
}

btnSalvar.onclick = e => {

    if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
        return
    }

    e.preventDefault()

    if (id !== undefined) {
        items[id].nome = sNome.value
        items[id].funcao = sFuncao.value
        items[id].salario = sSalario.value
    } else {
        items.push({ 'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value })
    }

    setItemsDB()

    modal.classList.remove('active')
    loadItems()
    id = undefined
}

function loadItems() {
    items = getItemsDB()

    tbody.innerHTML = ''

    items.forEach((item, index) => {
        insertItem(item, index)
    })
}

const getItemsDB = () => JSON.parse(localStorage.getItem('dbfunc')) != null ? items : []
const setItemsDB = () => localStorage.setItem('dbfunc', JSON.stringify(items))



loadItems()