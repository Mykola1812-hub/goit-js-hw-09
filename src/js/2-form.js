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

form.addEventListener("input", () => {
    const formData = new FormData(form)

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
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.removeItem(localStorageKey);
    form.reset();
})