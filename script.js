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
    return item;
}
const dessertContainer =document.querySelector(".dessert__container-items");

fetch("./data.json").then(res=>{
    if(!res.ok){
        throw new Error("Fetching data failed" +res.statusText)
    } return res.json()
}).then(data=>{ 
   [...data].map(item=>{
        dessertContainer.insertAdjacentHTML("beforeend",
            createItem(item.image.desktop,item.image.tablet,item.image.mobile,item.category,item.name,item.price)
        )
    })
})
