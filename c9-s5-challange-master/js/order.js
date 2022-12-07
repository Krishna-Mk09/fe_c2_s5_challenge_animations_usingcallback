// Write solution code here to dynamically add the form fields
let orderItems = [];
let orderDetails = [];


const addOrder = document.getElementById('addOrder');
const form = document.getElementById('orderform');
const items = document.getElementById('itemDetails');

//Save the order details captured from the form in json-server using Axios API
function saveOrder(orderItems) {
    axios.post('http://localhost:3002/order', orderItems)
        .then((reponse) => {
            alert('Data Saved')
        }).catch((error)=>{
            console.log(error);
        })
}

// Reuse the solution created to dynamically create order form fields developed 
// in the previous sprint challenge


// Dynamic Order Id
let validted = false;

// Saving Items in Arrary
function saveItem(inputs, textbox) {
    orderItems.push({
        "id": `${inputs[0].value}`,
        "customerName": `${inputs[1].value}`,
        "email": `${inputs[2].value}`,
        "contact": `${inputs[3].value}`,
        "orderDate": `${inputs[4].value}`,
        "address": `${textbox.value}`,
    });
}
// Helper Class for validation
function validToggle(element, value) {
    if (value != 'is-invalid') {
        element.classList.remove('is-invalid')
        element.classList.add(value);
        validted = false;
    } else {
        element.classList.remove('is-valid')
        element.classList.add(value)
        validted = true;
    }
}
// Validating All the values from form
function validateData() {
    inputs = document.getElementsByTagName('input');
    for (let index = 0; index < inputs.length - 1; index++) {
        // Checking the inputs is valid or not
        if (inputs[index].value == "") { validToggle(inputs[index], 'is-invalid'); validted = false}
        else {
            validToggle(inputs[index], 'is-valid'); validted = true;
        }
        // Checking text box is empty or not
        textbox = document.getElementById('address');
        if (textbox.value == "") { validToggle(textbox, 'is-invalid'); validted = false; }
        else {validToggle(textbox, 'is-valid'); validted = true; }
    }
    if (validted) {
        saveItem(inputs, textbox);
    }
}

// Creating and deleteting inputs
function createInputs() {
    let element = `<tr id="items-input"><th><input type="text" class="form-control" id="category" placeholder="Category"></th><th><input type="text" class="form-control" id="item" placeholder="Item Name"></th><th><input type="number" min="0" value="0" class="form-control" id="price" placeholder="Price"></th><th><input type="number" min="0" value="0" class="form-control" id="quantity" placeholder="Quantity"></th><th><input type="number" class="form-control" id="total" placeholder="0" disabled></th></tr>`
    items.insertAdjacentHTML('beforeend', element);
}
createInputs(); // Self call for the first time 

// Loard Orders on open
function loadOrder() {
    items.innerHTML = "";
    for (const key in orderDetails) {
        items.innerHTML += `<tr><td>${orderDetails[key].category}</td><td>${orderDetails[key].name}</td><td>${orderDetails[key].price}</td><td>${orderDetails[key].quantity}</td><td>${orderDetails[key].amount}</td></tr>`;
    }
    diplayTotal();
    createInputs();
}

// Adding data to objects
function addItem(item) {
    orderDetails.push({
        category: `${item[0].value}`,
        name: `${item[1].value}`,
        price: item[2].value,
        quantity: item[3].value,
        amount: (item[2].value * item[3].value).toFixed(2),
    })
    loadOrder();
}

// Calculate Total and display 
function diplayTotal() {
    let total = orderDetails.reduce((a, b) => a + parseInt(b.amount), 0);
    document.getElementById('total').setAttribute('value', total);
}
// Adding inputs in Table
document.getElementById('addItem').addEventListener('click', () => {
    let inputs = items.getElementsByTagName('input');
    for (let index = 0; index < inputs.length-1;index++) {
        if ((inputs[index].value == "") || (inputs[index].value == 0)) { validToggle(inputs[index], 'is-invalid'); validted = false;}
        else {validToggle(inputs[index], 'is-valid'); validted = true;} 
    }
    if (validted) {
        addItem(inputs);
    }
})  

//addOrder.addEventListener('click', addInput)
document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();
    validateData();
    if (validted) {
        document.getElementById('items-input').remove();
        let val = confirm("Press Ok to Confirm Your Order");
        if (val == true) {
                saveOrder(orderItems);
            } else {
                alert("Order cancelled !!");
            }
    } else {
        alert("All the fields are required");
    }
});
