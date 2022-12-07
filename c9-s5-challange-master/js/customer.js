let customer = [];
const form = document.getElementById('customerRegistrationForm');
const inputs = form.getElementsByTagName('input');
let validateAll = false;

// Saving user data 
function saveData(customer) {
    axios.post('http://localhost:3001/customers', customer)
        .then((reponse) => {
            alert('Data Saved')
        }).catch((error)=>{
            console.log(error);
        })
}

//Write  password validation code here 
function setPasswordConfirmValidity() {
    let password1 = document.getElementById('custPasword');
    let password2 = document.getElementById('custConfirmPassword');

    if ((password2.value != password1.value) || password2 == '') {
        password2.setAttribute('style', 'border-bottom:1px solid red !important');
        let err = `<span style="color: red; margin-top: 5px">Password and confirm password dosen't match</span>`
        if (password2.nextElementSibling) {
            password2.nextElementSibling.remove();
        }
        password2.insertAdjacentHTML('afterend', err);
        validateAll = false;
    } else {
         if (password2.nextElementSibling) {
            password2.nextElementSibling.remove();
            }
        password2.setAttribute('style', 'border-bottom:1px solid green !important');
        validateAll = true;
    }
}


// Write code to submit customer details 
function submitCustomerDetail(event) {
    event.preventDefault();
    for (let index = 0; index < inputs.length-1; index++) {
        validate(inputs[index])
    }
    let textBox = form.getElementsByTagName('textarea');
    validate(textBox[0]);
    if (validateAll) {
        customer = {
            id: inputs[0].value,
            name: inputs[1].value, 
            pasword: inputs[2].value, 
            email: inputs[4].value, 
            contact: inputs[5].value, 
            address: textBox.address.value,
        }
        saveData(customer);
    }
}

// Validation of form fields
function validate(element) {
    if (element.value == "") {
        element.setAttribute('style', 'border-bottom:1px solid red !important');
        let err = `<span style="color: red; margin-top: 5px">${element.name} is required</span>`
        if (element.nextElementSibling) {
            element.nextElementSibling.remove();
        }
        element.insertAdjacentHTML('afterend', err);
        validateAll = false;
    } else {
          if (element.nextElementSibling) {
            element.nextElementSibling.remove();
            }
        element.setAttribute('style', 'border-bottom:1px solid green !important');
        validateAll = true;
    }
}

