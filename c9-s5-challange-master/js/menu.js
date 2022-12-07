//Write code to get menu data from the json-server using axios API
let data = [];
let getPromise =  function() {
    return new Promise((resolve, reject) => {
        axios.get("http://localhost:3000/menu").then(response => { 
            if (response) {
                resolve(response)
            } else {
                resolve("got nothing")
            }
        })
    })
}

//Write code to load menu data using window onload event: getPromise is the promise result obained from Axios call
window.onload = getPromise().then((resolve) => {
    data = resolve.data;
    findItems('All');
})

//Write code to filter the menu item from list
const category = document.getElementById('category'); 
const menuWrapper = document.getElementById('menu-wrapper');
let tableBody;

category.addEventListener('change', function (e) {
    menuWrapper.innerHTML = "";
    findItems(category.value);
});

function createTable() {
    let table = document.createElement('table')
    table.classList.add('table');
    table.classList.add('table-bordered');
    table.classList.add('mt-5');
    menuWrapper.append(table);
    let thead = document.createElement('thead');
    table.append(thead);
    thead.innerHTML = '<tr><th>Item Name</th><th>Price</th></tr>';
    tableBody = table;
}
function createData(item) {
    let row = document.createElement('tr');
    row.innerHTML = `<td class="p-3">${item.itemName}</td><td class="p-3">$${item.price}<td>`;
    tableBody.append(row);
}
function displayAll() {
    displayMenu(data);
}

// Find Items
function findItems(categoryName) {
    let h4 = document.createElement('h4');
    h4.textContent = categoryName;
    h4.className += "text-center mt-3"
    menuWrapper.prepend(h4)
    if (categoryName === "All") {
        displayMenu(data);
    } else {
        let items = data.filter(item => item.category == categoryName);
        displayMenu(items);
    }
}
function displayMenu(items) {
    createTable();
    for (const key in items) {
        createData(items[key])
    }
}