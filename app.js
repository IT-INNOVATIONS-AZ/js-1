let products = [
  {
    id: 1,
    image: "./image/IMAGE (3).png",
    title: "Calabrese Broccoli",
    oldPrice: "$ 25.00 USD",
    price: 21.00,
  },
  {
    id: 2,
    image: "./image/IMAGE (4).png",
    title: "Fresh Corn",
    oldPrice: "$ 21.23 USD",
    price: 18.00,
  },
  {
    id: 3,
    image: "./image/IMAGE (5).png",
    title: "Dried Pistachio",
    oldPrice: "$ 61.00 USD",
    price: 48.00,
  },
  {
    id: 4,
    image: "./image/IMAGE (6).png",
    title: "Vegan Red Tomato",
    oldPrice: "$ 14.00 USD",
    price: 9.37,
  },
  {
    id: 5,
    image: "./image/IMAGE (7).png",
    title: "Organic Almonds",
    oldPrice: "$ 21.00 USD",
    price: 18.00,
  },
  {
    id: 6,
    image: "./image/IMAGE (8).png",
    title: "Brown Hazelnut",
    oldPrice: "$ 43.00 USD",
    price: 34.00,
  },
];

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

cardLists = [];

function app() {
  products.forEach((value, key) => {
    let divElement = document.createElement("div");
    divElement.style.textAlign = "center";
    divElement.style.margin = "auto";
    divElement.innerHTML = `
        <img src ="${value.image}" class="w-11/12"/>
        <div class="title">${value.title}</div>
        <div class ="line-through"> ${value.oldPrice}</div>
        <div class="price m-2.5">$ ${value.price.toLocaleString()} USD</div>
        <button onclick="addToCard(${key})" class="bg-[#7EB693] text-white p-2.5 w-full">Add To Card</button>
        `;

    list.appendChild(divElement);
  });
}
app();

function addToCard(key) {
    console.log("addToCart")
  if (cardLists[key] == null) {
    cardLists[key] = {...products[key], quantity: 1, originalPrice: products[key].price};

  }

  reloadCard();
}

function reloadCard() {
    console.log('reloadCard')
  listCard.innerHTML = ``;
  let count = 0;
  let totalPrice = 0;
  cardLists.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;

    if(value !=null){
        let newDiv =document.createElement('li')
        newDiv.style.display="grid"
        newDiv.style.gridTemplateColumns="100px repeat(3,1fr)"
        newDiv.style.color="#fff"
        newDiv.style.rowGap="10px"
        newDiv.style.marginBottom="20px"
        newDiv.innerHTML=`
        <div class="flex justify-center items-center"><img class="w-[100%]" src="${value.image}"/></div>
        <div class="flex justify-center items-center">${value.title}</div>
        <div class="flex justify-center items-center">${value.price.toLocaleString()}</div>
        <div class="flex justify-center items-center">${value.quantity}</div>
        

        <div class="flex justify-center items-center gap-2">
          <button class="w-auto bg-[#E8BC0E] p-2" onclick="changeQuantity(${key},${value.quantity-1})">-</button>
          <div class="count">${value.quantity}</div>
          <button class="w-auto bg-[#E8BC0E] p-2" onclick="changeQuantity(${key},${value.quantity+1})">+</button>

        </div>
        
        `
        listCard.appendChild(newDiv)
        console.log(listCard)
    }
  });

  total.innerText=totalPrice.toLocaleString()
  quantity.innerText =count
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