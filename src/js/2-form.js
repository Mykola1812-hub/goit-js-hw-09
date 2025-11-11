const form = document.querySelector(".feedback-form");
const email = form.elements.email;
const message = form.elements.message;
const localStorageKey = "input-elements";

function saveToLS(key, value) {
    const zip = JSON.stringify(value);
    const item = localStorage.setItem(key, zip);
}

function loadFromLS(key) {
    const zip = localStorage.getItem(key);

    try {
        return JSON.parse(zip);
    } catch (error) {
      return zip;
    }
}

let formData = new FormData(form);

form.addEventListener("input", () => {
    formData.set('email', email.value)
    formData.set('message', message.value)

    const values = {
        email: formData.get('email'),
        message: formData.get('message'),
    }

    saveToLS(localStorageKey, values);
})


const savedData = loadFromLS(localStorageKey);
if (savedData) {
    email.value = savedData.email || "";
    message.value = savedData.message || "";
    formData.set('email', email.value);
    formData.set('message', message.value);
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!email.value || !message.value) {
        return alert("Fill all fields!");
    }

    console.log({
        email: email.value,
        message: message.value,
    });
    
    localStorage.removeItem(localStorageKey);
    form.reset();
})