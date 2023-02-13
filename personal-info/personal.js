const homeBtn = document.getElementById("returnHomePageBtn");
const form = document.getElementById("form");
const username = document.getElementById("name");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phoneNum = document.getElementById("phoneNum");
const nameError = document.getElementById("error-name");
const lastNameError = document.getElementById("error-lastName");
const emailError = document.getElementById("error-email");
const phoneNumError = document.getElementById("error-phoneNum");
const nextBtn = document.querySelector(".button");
const imageInput = document.getElementById("file");
const profile_image = document.querySelector(".profile_image");
const degree = document.getElementById("degree");
const cvContainer = document.querySelector(".cvContainer");

const geoAlphabet = /^[ა-ჰ]+$/g;
const validMail = /^[a-zA-Z0-9.]+@redberry.ge$/;
const phoneRegx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

const cvpage = document.getElementById("cvContainer");
const cvName = document.querySelector(".cvName");
const cvLastName = document.querySelector(".cvLastName");
const cvPhone = document.querySelector(".cvPhone");
const cvEmail = document.querySelector(".cvEmail");
const aboutMe = document.getElementById("personInfo");
const aboutMeHeader = document.querySelector(".aboutMeHeader");
const aboutMeTxt = document.querySelector(".aboutMeTxt");

const containers = document.querySelectorAll(".container");
const personalInfo = document.querySelector(".container--personal-info");
const buttonNextInfo = document.querySelector(".button-next-info");
const experience = document.querySelector(".container--experience");
const buttonNextExperience = document.querySelector(".button-next-experience");
const buttonBackFromExperience = document.querySelector(".button-back");
const buttonForwardFromExperience = document.querySelector(".button-forward");
const personalPage = document.getElementById("personalPage");

const graduate = document.querySelector(".container--graduate");
const buttonBackFromGraduate = document.querySelector(".buttonBack");
const buttonFinish = document.querySelector(".button-finish");

// Fetch helper function
async function getData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    return data;
  } catch (err) {
    throw err;
  }
}

let data = [];

async function loadData() {
  try {
    data = await getData("https://resume.redberryinternship.ge/api/degrees");
    console.log(data);
    data.forEach((user) => {
      const options = `<option class="degree-value" value ="${user.id}">${user.title}</option>`;
      degree.insertAdjacentHTML("beforeend", options);
    });
  } catch (err) {
    console.error(err);
  }
}
loadData();

// data = await getData('https://resume.redberryinternship.ge/api/cvs');

// fetch("https://resume.redberryinternship.ge/api/cvs")
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// buttons for personal.htm page-------------------

buttonNextInfo.addEventListener("click", () => {
  containers.forEach((container) => {
    if (
      validateName() &&
      validateLastName() &&
      validateEmail() &&
      validPhoneNum()
    ) {
      container.classList.add("hidden");
      experience.classList.remove("hidden");
    }
  });
});

//------

homeBtn.addEventListener("click", () => {
  location.href = "../home/home.html";
});

// buttons for experience.html page--------------

buttonBackFromExperience.addEventListener("click", () => {
  containers.forEach((container) => {
    container.classList.add("hidden");
  });
  personalInfo.classList.remove("hidden");
});

buttonForwardFromExperience.addEventListener("click", () => {
  containers.forEach((container) => {
    if (
      validPosition() &&
      validEmploy() &&
      validateDate1() &&
      validateDate2() &&
      validRole()
    ) {
      container.classList.add("hidden");
      graduate.classList.remove("hidden");
    }
  });
});

buttonBackFromExperience.addEventListener("click", () => {
  containers.forEach((container) => {
    container.classList.add("hidden");
  });

  personalInfo.classList.remove("hidden");
});

///---------------------

//butons for graduate.html page--------------------

buttonBackFromGraduate.addEventListener("click", () => {
  containers.forEach((container) => {
    container.classList.add("hidden");
  });

  experience.classList.remove("hidden");
});

// let data = localStorage.setItem("myLocalstorage", form);
// console.log(data);

buttonFinish.addEventListener("click", () => {
  // e.preventDefault();
  // const formData = new FormData(form);
  // console.log(...formData);

  if (validPlace() && validateDate() && validGraduateText()) {
    containers.forEach((container) => {
      container.classList.add("done");
      cvContainer.classList.add("done-cv");
    });
  }
});

//------------------

function validateName() {
  let nameVal = username.value.trim();
  if (nameVal === "" || nameVal.length < 2) {
    nameError.innerText = "მინიმუმ 2 ასო,ქართული ასოები";
    nameError.parentElement.classList.add("error");
    nameError.parentElement.classList.remove("success");
    return false;
  } else if (!nameVal.match(geoAlphabet)) {
    nameError.innerText = "მინიმუმ 2 ასო,ქართული ასოები";
    nameError.parentElement.classList.add("error");
    nameError.parentElement.classList.remove("success");
    return true;
  } else {
    nameError.innerText = "მინიმუმ 2 ასო,ქართული ასოები";
    nameError.parentElement.classList.add("success");
    nameError.parentElement.classList.remove("error");
    return true;
  }
}
username.addEventListener("focusout", () => {
  cvName.innerHTML = `<p>${username.value.trim()}<p>`;
});

function validateLastName() {
  let lastNameVal = lastName.value.trim();
  if (lastNameVal === "" || lastNameVal.length < 2) {
    lastNameError.innerText = "მინიმუმ 2 ასო,ქართული ასოები";
    lastNameError.parentElement.classList.add("error");
    lastNameError.parentElement.classList.remove("success");
    return false;
  } else if (!lastNameVal.match(geoAlphabet)) {
    lastNameError.innerText = "მინიმუმ 2 ასო,ქართული ასოები";
    lastNameError.parentElement.classList.add("error");
    lastNameError.parentElement.classList.remove("success");
    return false;
  } else {
    lastNameError.innerText = "მინიმუმ 2 ასო,ქართული ასოები";
    lastNameError.parentElement.classList.add("success");
    lastNameError.parentElement.classList.remove("error");
    return true;
  }
}

lastName.addEventListener("focusout", () => {
  cvLastName.innerHTML = `<p>${lastName.value.trim()}</p>`;
});

aboutMe.addEventListener("focusout", () => {
  aboutMeHeader.innerHTML = `<p>ჩემს შესახებ</p>`;
  aboutMeTxt.innerHTML = `<p>${aboutMe.value.trim()}`;
});

//upload image---------------

let uploaded_image = "";

imageInput.addEventListener("change", function () {
  const reader = new FileReader();
  reader.readAsDataURL(this.files[0]);
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    profile_image.style.backgroundImage = `url(${uploaded_image})`;
  });
});

function validateEmail() {
  let emailVal = email.value.trim();
  if (!emailVal.match(validMail)) {
    emailError.innerText = "უნდა მთავრდებოდეს @redberry.ge-ით";
    emailError.parentElement.classList.add("error");
    emailError.parentElement.classList.remove("success");
    return false;
  } else {
    emailError.innerText = "უნდა მთავრდებოდეს @redberry.ge-ით";
    emailError.parentElement.classList.add("success");
    emailError.parentElement.classList.remove("error");
    return true;
  }
}

email.addEventListener("focusout", () => {
  // console.log(email.value.trim().toLowerCase());
  // console.log(email.value.trim());
  cvEmail.innerHTML = `<p> <i class="fa-solid fa-at"</i> ${email.value.trim()}</p>`;
});

function validPhoneNum() {
  let phoneVal = phoneNum.value.split(" ").join("");
  if (phoneVal.length === 13 && phoneVal.match(phoneRegx)) {
    phoneNumError.parentElement.classList.add("success");
    phoneNumError.parentElement.classList.remove("error");
    return true;
  } else {
    phoneNumError.parentElement.classList.add("error");
    phoneNumError.parentElement.classList.remove("success");
    return false;
  }
}

phoneNum.addEventListener("focusout", () => {
  cvPhone.innerHTML = `<p> <i class="fa-solid fa-phone"> ${phoneNum.value.trim()}</p>`;
  personalPage.classList.add("active");
});

// experince --------------------------
const position = document.getElementById("position");
const employ = document.getElementById("employ");
const date1 = document.getElementById("date1");
const date2 = document.getElementById("date2");
const roleAtWork = document.getElementById("roleAtWork");
const experienceHeader = document.querySelector(".experience-header");
const experienceParagrap = document.querySelector(".experience-paragrap");
const experienceCompany = document.querySelector(".experience-company");
const startDate = document.querySelector(".start-date");
const dueDate = document.querySelector(".due-date");
const experienceDescription = document.querySelector(".experience-description");
const experienceCv = document.querySelector(".experinece-cv");

function validPosition() {
  const positionVal = position.value;
  if (positionVal.length < 2) {
    position.parentElement.classList.add("error");
    position.parentElement.classList.remove("success");
    return false;
  } else {
    position.parentElement.classList.add("success");
    position.parentElement.classList.remove("error");
    return true;
  }
}

position.addEventListener("focusout", () => {
  experienceHeader.innerHTML = `<p>გამოცდილება</p>`;
  experienceParagrap.innerHTML = `<p>${position.value.trim()}</p>`;
});

function validEmploy() {
  const employVal = employ.value;
  if (employVal.length < 2) {
    employ.parentElement.classList.add("error");
    employ.parentElement.classList.remove("success");
    return false;
  } else {
    employ.parentElement.classList.add("success");
    employ.parentElement.classList.remove("error");
    return true;
  }
}

employ.addEventListener("focusout", () => {
  experienceCompany.innerHTML = `<p>,  ${employ.value.trim()}</p>`;
});

function validateDate1() {
  const dateVal = date1.value;
  if (dateVal.length === 10) {
    date1.parentElement.classList.add("success");
    date1.parentElement.classList.remove("error");
    return true;
  } else {
    date1.parentElement.classList.add("error");
    date1.parentElement.classList.remove("success");
    return false;
  }
}

date1.addEventListener("focusout", () => {
  startDate.innerHTML = `<p>${date1.value}&nbsp;-&nbsp;</p>`;
});

function validateDate2() {
  const dateVal = date2.value;
  if (dateVal.length === 10) {
    date2.parentElement.classList.add("success");
    date2.parentElement.classList.remove("error");
    return true;
  } else {
    date2.parentElement.classList.add("error");
    date2.parentElement.classList.remove("success");
    return false;
  }
}

date2.addEventListener("focusout", () => {
  dueDate.innerHTML = `<p>${date2.value}</p>`;
});

function validRole() {
  const roleVal = roleAtWork.value;
  let required = 20;
  let sum = required - roleVal.length;
  if (sum > 0) {
    roleAtWork.parentElement.classList.add("error");
    roleAtWork.parentElement.classList.remove("success");
    return false;
  } else {
    roleAtWork.parentElement.classList.add("success");
    roleAtWork.parentElement.classList.remove("error");
    return true;
  }
}

roleAtWork.addEventListener("focusout", () => {
  experienceDescription.innerHTML = `<p>${roleAtWork.value.trim()}</p>`;
  experienceCv.classList.add("active");
});

////graduate----------------------

const institute = document.getElementById("institute");
const date = document.getElementById("date");
const graduateTxt = document.getElementById("graduateText");

const graduateHeadrer = document.querySelector(".graduate-header");
const graduateInstitute = document.querySelector(".graduate-institute");
const graduateDegree = document.querySelector(".graduate-degree");
const dueDateParagrap = document.querySelector(".due-date-paragrap");
const descriptionGgraduate = document.querySelector(".description-graduate");
const logo = document.querySelector(".logo");

function validPlace() {
  let placeVal = institute.value;
  if (placeVal.length < 2) {
    institute.parentElement.classList.add("error");
    institute.parentElement.classList.remove("success");
    return false;
  } else {
    institute.parentElement.classList.add("success");
    institute.parentElement.classList.remove("error");
    return true;
  }
}

institute.addEventListener("focusout", () => {
  graduateHeadrer.innerHTML = `<p>განათლება</p>`;
  graduateInstitute.innerHTML = `<p>${institute.value.trim()}</p>`;
});

// function validDegree() {
//   let degreeVal = degree.value;
//   console.log(degreeVal);
// }

// console.log(degree.value);



function validateDate() {
  let dateVal = date.value;
  if (dateVal.length === 10) {
    date.parentElement.classList.add("success");
    date.parentElement.classList.remove("error");
    return true;
  } else {
    date.parentElement.classList.add("error");
    date.parentElement.classList.remove("success");
    return false;
  }
}

date.addEventListener("focusout", () => {
  dueDateParagrap.innerHTML = `<p>${date.value}</p>`;
});

function validGraduateText() {
  let graduateTxtVal = graduateTxt.value;
  let required = 20;
  let sum = required - graduateTxtVal.length;
  if (sum > 0) {
    graduateTxt.parentElement.classList.add("error");
    graduateTxt.parentElement.classList.remove("success");
    return false;
  } else {
    graduateTxt.parentElement.classList.add("success");
    graduateTxt.parentElement.classList.remove("error");
    return true;
  }
}

graduateTxt.addEventListener("focusout", () => {
  descriptionGgraduate.innerHTML = `<p>${graduateTxt.value.trim()}</p>`;
});
