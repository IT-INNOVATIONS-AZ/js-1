let products = [];

let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");
let card = document.querySelector(".card");

openShopping.addEventListener("click", () => {
  card.style.left = "68%";
});

closeShopping.addEventListener("click", () => {
  card.style.left = "100%";
});

let cardLists = [];

function app() {
  console.log(products);
  products.forEach((value, key) => {
    let divElement = document.createElement("div");
    divElement.style.textAlign = "center";
    divElement.style.margin = "auto";
    divElement.innerHTML = `
        <img src ="${value.images}" class="w-11/12"/>
        <div class="title">${value.title}</div>
        <div class ="line-through">$ ${value.discountPercentage} USD</div>
        <div class="price m-2.5">$ ${value.price.toLocaleString()} USD</div>
        <button onclick="addToCard(${key})" class="bg-[#7EB693] text-white p-2.5 w-full">Add To Card</button>
        `;

    list.appendChild(divElement);
  });
}

fetch("https://dummyjson.com/products", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    products = data.products;
    app();
  })
  .catch((error) => {
    console.error("Ошибка при получении данных:", error);
  });

function addToCard(key) {
  console.log("addToCart");
  if (cardLists[key] == null) {
    cardLists[key] = {
      ...products[key],
      quantity: 1,
      originalPrice: products[key].price,
    };
  }

  reloadCard();
}

function reloadCard() {
  console.log("reloadCard");
  listCard.innerHTML = ``;
  let count = 0;
  let totalPrice = 0;
  cardLists.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;

    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.style.display = "grid";
      newDiv.style.gridTemplateColumns = "100px repeat(3,1fr)";
      newDiv.style.color = "#fff";
      newDiv.style.rowGap = "10px";
      newDiv.style.marginBottom = "20px";
      newDiv.innerHTML = `
        <div class="flex justify-center items-center"><img class="w-[100%]" src="${
          value.image
        }"/></div>
        <div class="flex justify-center items-center">${value.title}</div>
        <div class="flex justify-center items-center">${value.price.toLocaleString()}</div>
        <div class="flex justify-center items-center">${value.quantity}</div>
        

        <div class="flex justify-center items-center gap-2">
          <button class="w-auto bg-[#E8BC0E] p-2" onclick="changeQuantity(${key},${
        value.quantity - 1
      })">-</button>
          <div class="count">${value.quantity}</div>
          <button class="w-auto bg-[#E8BC0E] p-2" onclick="changeQuantity(${key},${
        value.quantity + 1
      })">+</button>

        </div>
        
        `;
      listCard.appendChild(newDiv);
    }
  });

  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    cardLists.splice(key, 1);
  } else {
    cardLists[key].quantity = quantity;
    cardLists[key].price = quantity * cardLists[key].originalPrice;
  }
  reloadCard();
}
