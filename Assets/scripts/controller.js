// import { printOneElement } from "./CartController.js";


window.addEventListener("load", manycalls);

function manycalls() {
  bindEvents();
  getData();
}

function bindEvents() {
  // asap the click event occurs, the respective functions associated with it satrts executing.
  document.getElementById("but").addEventListener("click", openCart);
  document.getElementById("search-btn").addEventListener("click", search);
  document.getElementById("mob").addEventListener("click", printmob);
  document.getElementById("lap").addEventListener("click", printlaptops);
  document.getElementById("all").addEventListener("click", printall);


}

// productArr is the main array in which all the products will be stored after fetching from the api.
let productArr = [];

// cartArr is the array which contains only those elements which are added to the cart.
export let cartArr = [];

// api from where the data is fetched.
const URL =
  "https://raw.githubusercontent.com/brainmentorspvtltd/json-data/main/products.json";


// the getData function will have to work in async way because the time can vary in fetching the data from the api.
const getData = async () => {
  let response = await fetch(URL);
  // await means that we are waiting for the response, so that the program will run with proper functioning.
  console.log(response);

  // await is used because the time will be taken to extract the json from the fetched response.
  let Data = await response.json();
  console.log("Json is", Data);
  fillData(Data);
};

// printmob function is used to print the mobiles only when the user selects the mobile cateogry.
const printmob = () => {
  const newArr = productArr.filter((ele) => ele.category == "smartphones");
  const section = document.getElementById("products-list");
  section.innerHTML = "";
  newArr.map((ele) => printCards(ele));
};

// printlaptops function is used to print the laptops only when the user selects the laptops cateogry.
const printlaptops = () => {
  const newArr = productArr.filter((ele) => ele.category == "laptops");
  const section = document.getElementById("products-list");
  section.innerHTML = "";
  newArr.map((ele) => printCards(ele));
};

// printall function prints all the products available.
const printall = () => {
  const section = document.getElementById("products-list");
  section.innerHTML = "";
  const newArr = productArr.slice();
  newArr.map((ele) => printCards(ele));
};

// search function will run when the user searches the product either using id or title of the product.
const search = () => {
  const textin = document.getElementById("search-text");
  const text = textin.value;

  const newArr = productArr.filter(
    (ele) => ele.id == text || ele.title == text
  );

  console.log(newArr);
  const section = document.getElementById("products-list");

  // when the user searches any product using search bar, then also the products will be shown inside the section area in the html page, so it is firstly made empty using "" . 
  section.innerHTML = "";
// now all the search matched products are added cardwise into the section.
  newArr.map((ele) => printCards(ele));
};


const openCart = () => {
  // window.location is used to move to the cart page
  window.location.href = "Cart.html";
  console.log("Add to Cart ", id);
  let newArr = productArr.filter((ele) => ele.id == id);
  cartArr = [...cartArr, newArr];
  console.log("Cart Arr", cartArr);
  printCart(cartArr);
};

const fillData = (Data) => {
  const { products } = Data;
  productArr = [...products];
  console.log("Pro", productArr);
  showProducts();
};
const printCart = (cartArr) => {
  cartArr.map((ele, index) => {
    console.log(ele[0]);
    printOneElement(ele[0]);
  });
};

const openPage = (id) => {
  let Item = productArr.filter((ele) => ele.id == id);
  // local storage is used to move the selected product to the new page, if not used the localstorage or sessionstorage, then the data will be lost when we will move to the next page.
  localStorage.setItem("Item", JSON.stringify(Item));
  console.log(Item);
  openProduct();
};
const openProduct = () => {
  window.location.href = "Product.html";
};
const addToCart = (id) => {
  console.log("Add to Cart ", id);
  let newArr = productArr.filter((ele) => ele.id == id);
  cartArr = [...cartArr, newArr];
  localStorage.setItem("cartArr", JSON.stringify(cartArr));
  console.log("Cart Arr", cartArr);

  printCart(cartArr);
};

const showProducts = () => {
  productArr.map((ele) => {
    printCards(ele, openPage, addToCart);
  });
};

// object destructing is done in the below line.
const printCards = ({ images, title, rating, price, id }, openPage) => {
  const div = document.createElement("div");
  div.className = "card-div";
  const button = document.createElement("button");
  button.className = "card-but";
  button.onclick = () => openPage(id);
  const imgDiv = document.createElement("div");
  imgDiv.className = "img-div";
  const img = document.createElement("img");
  img.className = "card-img";
  img.src = `${images[0]}`;
  const titleDiv = document.createElement("div");
  titleDiv.className = "title-div";
  const titleHead = document.createElement("h3");
  titleHead.className = "title-head";
  titleHead.innerHTML = title;
  const priceDiv = document.createElement("div");
  priceDiv.className = "price-div";
  const priceHead = document.createElement("h4");
  priceHead.className = "price-head";
  priceHead.innerHTML = `Rs. ${price}`;
  const AdcBut = document.createElement("button");
  AdcBut.className = "AddToCart";
  AdcBut.innerText = "Add to Cart";
  AdcBut.onclick = () => addToCart(id);
  priceDiv.appendChild(priceHead);
  titleDiv.appendChild(titleHead);
  imgDiv.appendChild(img);
  button.appendChild(imgDiv);
  div.appendChild(button);
  div.appendChild(titleDiv);
  div.appendChild(priceDiv);
  div.appendChild(AdcBut);
  const section = document.getElementById("products-list");
  section.appendChild(div);
};
