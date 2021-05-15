const inputBlurItems = document.querySelectorAll('input[type="text"]');
const selectElement = document.querySelector("#type");

const featuresDiv = document.querySelector("#checkbox");
const heating = document.getElementById("feature1");
const airConditioning = document.getElementById("feature2");
const pool = document.getElementById("feature3");
const sandpit = document.getElementById("feature4");

const selectAll = document.getElementById("select-all");
const checkBoxs = document.getElementsByName("feature");

const resetButton = document.getElementById("reset");
const outputTextarea = document.getElementById("output");

const getAge = (dob) => {
  dob = dob.split("/").join("");
  const day = Number(dob.substring(0, 2));
  const month = Number(dob.substring(2, 4)) - 1;
  const year = Number(dob.substring(4, 9));
  const today = new Date();
  let age = today.getFullYear() - year;
  if (
    today.getMonth() < month ||
    (today.getMonth() === month && today.getDate() < day)
  ) {
    age--;
  }
  return age;
};

const selectOrDeselect = () => {
  if (
    heating.checked &&
    airConditioning.checked &&
    pool.checked &&
    sandpit.checked === true
  ) {
    for (let checkBox of checkBoxs) {
      checkBox.checked = false;
    }
    selectAll.innerHTML = "Select All";
  } else {
    for (let checkBox of checkBoxs) {
      checkBox.checked = true;
    }
    selectAll.innerHTML = "Deselect all";
  }
};

const rendering = () => {
  const streetInput = document.getElementById("streetname");
  const suburbInput = document.getElementById("suburb");
  const postcodeInput = document.getElementById("postcode");
  const dateOfBirthInput = document.getElementById("DOB");
  const buildingTypeSelect = document.getElementById("type");

  const street = streetInput.value;
  const suburb = suburbInput.value;
  const postcode = postcodeInput.value;
  const dateOfBirth = dateOfBirthInput.value;
  const buildingType = buildingTypeSelect.value;
  const regex = new RegExp(
    /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
  );
  selectAll.innerHTML = "Select All";
  let res = [];
  if (heating.checked === true) {
    res.push("Heating");
  }
  if (airConditioning.checked === true) {
    res.push("AirConditioning");
  }
  if (pool.checked === true) {
    res.push("Pool");
  }
  if (sandpit.checked === true) {
    res.push("Sandpit");
  }
  if (res.length === 4) {
    selectAll.innerHTML = "Deselect all";
  }

  if (street.length < 3 || street.length > 50) {
    outputTextarea.value = "Please input a valid street name";
  } else if (suburb.length < 3 || suburb.length > 50) {
    outputTextarea.value = "Please input a valid suburb";
  } else if (postcode.length !== 4 || isNaN(postcode)) {
    outputTextarea.value = "Please input a valid postcode";
  } else if (!regex.test(dateOfBirth)) {
    outputTextarea.value = "Please enter a valid date of birth";
  } else {
    let age = getAge(dateOfBirth);
    let output;
    output = `Your are ${age} years old, and your address is ${street} St, ${suburb}, ${postcode}, Australia.`;
    if (buildingType === "house") {
      output = output + " Your building is a House, ";
    } else if (buildingType === "apartment") {
      output = output + " Your building is an Apartment, ";
    }

    if (res.length === 0) {
      //no features
      output = output + "and it has no features.";
    } else if (res.length === 1) {
      //1 features
      output = output + `just ${res[0]}.`;
    } else if (res.length === 2) {
      //2 features
      output = output + `${res[0]}, and ${res[1]}.`;
    } else if (res.length === 3) {
      //3 features
      output = output + `${res[0]}, ${res[1]},and ${res[2]}.`;
    } else if (res.length === 4) {
      //4 features
      output = output + `${res[0]}, ${res[1]}, ${res[2]}, and ${res[3]}.`;
    }

    outputTextarea.value = output;
  }
};

inputBlurItems.forEach(function (inputItem) {
  inputItem.addEventListener("blur", rendering);
});
selectElement.addEventListener("change", rendering);
featuresDiv.addEventListener("change", rendering);
selectAll.addEventListener("click", selectOrDeselect);
selectAll.addEventListener("click", rendering);
resetButton.addEventListener("click", () => {
  outputTextarea.value = "";
  selectAll.innerHTML = "Select All";
});
