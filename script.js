const dessertContainer =document.querySelector(".dessert__container-items");
const cartItemContainer =document.querySelector(".cart__full")
const emptyCart =document.querySelector('.cart__empty')

const cartItems={};


const createItem =(imgDesktop,imgTablet,imgMobile,type,name,price) =>{ 
  const item=
        `<div class="item">
            <picture>
              <source srcset="${imgMobile}" media="(max-width: 400px)" />
              <source srcset="${imgTablet}" media="(max-width: 900px)" />
              <img src="${imgDesktop}" alt="${name}" />
            </picture>
            <button class="add-to-cart">
             <img src="images/icon-add-to-cart.svg" alt="cart icon" />
             Add to Cart
            </button>
            <h4>${type}</h4>
            <h2>${name}</h2>
            <p>$ ${price}</p>
        </div>`
    dessertContainer.insertAdjacentHTML("beforeend",item)
}
const createCartItem = (name,quantity =0,price)=>{
    const totalPrice = (quantity * price).toFixed(2);
    const cartItem =`
       <div class="cart__item">
            <div class="cart__item--text">
              <p class="cart__item--text-name">${name}</p>
              <p class="cart__item--text-price">
                <span class="quantity">${quantity}x</span
                ><span class="item-price">@$${price}</span
                ><span class="total-price">$${totalPrice}</span>
              </p>
            </div>
            <div class="cart__item--icon">
              <img src="/images/icon-remove-item.svg" alt="remove icon" />
            </div>
          </div>`
    cartItemContainer.insertAdjacentHTML("afterbegin",cartItem)
}


fetch("./data.json").then(res=>{
    if(!res.ok){
        throw new Error("Fetching data failed" +res.statusText)
    } return res.json()
}).then(data=>{ 
    // add The Shop Data 
   [...data].map(item=>createItem(item.image.desktop,item.image.tablet,item.image.mobile,item.category,item.name,item.price));

   //add event listener to the buttons
   const addButtons =document.querySelectorAll(".add-to-cart");
   addButtons.forEach(btn=>{
    btn.addEventListener("click",(e)=>{
        cartItemContainer.classList.remove("disable");
        emptyCart.classList.add("disable");
        const parentItem = e.target.closest(".item");
        const itemName = parentItem.querySelector("h2").textContent;
        //remove the dollar sign to be able to use the price mathematically
        const itemPrice = parseFloat(parentItem.querySelector("p").textContent.replace('$', ''));
     
        if(cartItems[itemName]){
            cartItems[itemName].quantity+=1;
        }else{
            cartItems[itemName]={quantity:1,price:itemPrice}
        }

         // Clear and re-render the cart items
      cartItemContainer.innerHTML = '';
      Object.keys(cartItems).forEach(name => {
        createCartItem(name, cartItems[name].quantity, cartItems[name].price);
      });
    })
})
})


