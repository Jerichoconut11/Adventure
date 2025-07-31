const input = document.querySelector(".input");
const button = document.querySelector(".generate");
const output = document.querySelector(".output");
const colorContainer = document.querySelector(".color-container");

button.addEventListener("click", () => {
  const inputValue = input.value;

  const isValidColor = (val) => {
    const test = new Option().style;
    test.color = val;
    return test.color !== "";
  };

  if (isValidColor(inputValue)) {
    colorContainer.style.backgroundColor = inputValue;
    output.textContent = `You chose: ${inputValue}`;
  } else if (inputValue === "") {
    Swal.fire({
      title: "Oops!",
      text: "You need to enter something first",
      icon: "error",
      confirmButtonText: "Got it",
    });
  } else {
    Swal.fire({
      title: "Oops!",
      text: "That's not a valid color. try again.",
      icon: "error",
      confirmButtonText: "Got it",
    });
  }
});
