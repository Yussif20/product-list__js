const dessertContainer = document.querySelector(".dessert__container-items");
const cartItemContainer = document.querySelector(".cart__items");
const fullCart = document.querySelector(".cart__full")
const emptyCart = document.querySelector('.cart__empty');
const totalPriceContainer = document.querySelector(".cart__total .total-price");

const cartItems = {};

// Function to update the total price
const updateTotalPrice = () => {
  let total = 0;
  Object.values(cartItems).forEach(item => {
    total += item.quantity * item.price;
  });
  totalPriceContainer.textContent = `$${total.toFixed(2)}`;
};

const createItem = ( img, type, name, price) => {
  const item =
    `<div class="item">         
        <div class="item__image">
          <img src="${img}" alt="${name}">
          <button class="add-to-cart">
              <img src="images/icon-add-to-cart.svg" alt="cart icon" />
               Add to Cart
        </button>
        </div>    
        <h4>${type}</h4>
        <h2>${name}</h2>
        <p>$ ${price}</p>
    </div>`;

  dessertContainer.insertAdjacentHTML("beforeend", item);
}

const createCartItem = (name, quantity = 0, price) => {
  const totalPrice = (quantity * price).toFixed(2);
  const cartItem = `
     <div class="cart__item">
          <div class="cart__item--text">
            <p class="cart__item--text-name">${name}</p>
            <p class="cart__item--text-price">
              <span class="quantity">${quantity}x</span>
              <span class="item-price">@$${price}</span>
              <span class="total-price">$${totalPrice}</span>
            </p>
          </div>
          <div class="cart__item--icon">
            <img src="/images/icon-remove-item.svg" alt="remove icon" />
          </div>
        </div>
        `;
  cartItemContainer.insertAdjacentHTML("beforeend", cartItem);
}

fetch("./data.json").then(res => {
  if (!res.ok) {
    throw new Error("Fetching data failed" + res.statusText);
  }
  return res.json()
}).then(data => {
  // add The Shop Data 
  data.forEach(item => createItem(item.image["tablet"],item.category, item.name, item.price));
  // add event listener to the buttons
  const addButtons = document.querySelectorAll(".add-to-cart");
  addButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      fullCart.classList.remove("disable");
      emptyCart.classList.add("disable");
      const parentItem = e.target.closest(".item");
      const itemName = parentItem.querySelector("h2").textContent;
      const itemPrice = parseFloat(parentItem.querySelector("p").textContent.replace('$', ''));

      if (cartItems[itemName]) {
        cartItems[itemName].quantity += 1;
      } else {
        cartItems[itemName] = { quantity: 1, price: itemPrice };
      }

      // Clear and re-render the cart items
      cartItemContainer.innerHTML = '';
      Object.keys(cartItems).forEach(name => {
        createCartItem(name, cartItems[name].quantity, cartItems[name].price);
      });

      // Update the total price
      updateTotalPrice();
    });
  });
});
