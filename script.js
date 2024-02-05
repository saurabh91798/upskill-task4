let serviceDisplay = document.getElementById("serviceDisplay");
let skipbtn = document.querySelector(".skipbtn");
let addbtn = document.querySelector(".addbtn");

let services = [
  { name: "Dry Cleaning", price: 200, image: "./src/dry-clean.png" },
  {
    name: "Leather and Suede Cleaning",
    price: 999,
    image: "./src/leather.png",
  },
  { name: "Ironing", price: 30, image: "./src/iron.png" },
];

let currentServiceIndex = 0;
let selectedItems = [];

function displayCurrentService() {
  serviceDisplay.innerHTML = "";

  let service = services[currentServiceIndex];

  let serviceItem = document.createElement("div");
  serviceItem.className = "service-item";

  let image = document.createElement("img");
  image.src = service.image;
  image.alt = service.name;
  image.className = "service-image";
  serviceItem.appendChild(image);

  let nameAndPrice = document.createElement("div");
  nameAndPrice.textContent = `${service.name} - Rs${service.price}`;
  serviceItem.appendChild(nameAndPrice);

  serviceDisplay.appendChild(serviceItem);
}

function addToCart() {
  let itemsTableBody = document.getElementById("itemsTableBody");
  let totalAmountValue = document.getElementById("totalAmountValue");

  let selectedService = services[currentServiceIndex];

  // Check if the selected item is already in the cart
  if (!selectedItems.some((item) => item.name === selectedService.name)) {
    // Add the selected item to the array
    selectedItems.push(selectedService);

    // Update the main table with the selected items
    let tableRows = selectedItems.map(
      (item, index) => `
          <tr>
              <td class="w-1/6">${index + 1}</td>
              <td class="w-4/6">${item.name}</td>
              <td class="w-1/6">Rs${item.price}</td>
          </tr>`
    );
    itemsTableBody.innerHTML = tableRows.join("");

    // Calculate total amount using reduce
    let totalAmount = selectedItems.reduce(
      (total, item) => total + item.price,
      0
    );
    totalAmountValue.textContent = `Rs${totalAmount}`;
  }

  // Move to the next service
  currentServiceIndex = (currentServiceIndex + 1) % services.length;
  displayCurrentService();
}

function skipItem() {
  // Move to the next service
  currentServiceIndex = (currentServiceIndex + 1) % services.length;
  displayCurrentService();
}

displayCurrentService();

// Attach the event listeners
skipbtn.addEventListener("click", function (event) {
  event.preventDefault();
  skipItem();
});

addbtn.addEventListener("click", function (event) {
  event.preventDefault();
  addToCart();
});
