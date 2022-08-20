function insertItem(item, index) {
    let tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>${item.slario}</td>
    <td class='acao'>
        <button onclick='editItem(${index})'><i class='bx bx-edit'></i></button>
    </td>
    <td class='acao'>
        <button onclick='deleteItem(${index})'><i class='bx bx-trash'></i></button>
    </td>
    `;
    tbody.appendChild(tr);
}