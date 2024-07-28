const dessertContainer =document.querySelector(".dessert__container-items");

fetch("./data.json").then(res=>{
    if(!res.ok){
        throw new Error("Fetching data failed" +res.statusText)
    } return res.json()
}).then(data=>{ 
   console.log(data)
    data.forEach(item=>{
        dessertContainer.insertAdjacentHTML("afterbegin",
            createItem(item["image"]["desktop"],item["image"]["tablet"],item["image"]["mobile"],item["category"],item["name"],item["price"])
        )
    })
})

const createItem =(imgDesktop,imgTablet,imgMobile,type,name,price) =>{ 
    return (
        `
        <div class="item">
            <picture>
             <source
                src="${imgDesktop}"
                media="(max-width:500px)"
              />
              <source
                src="${imgTablet}"
                media="(max-width:900px)"
              />
              <source
                src="${imgMobile}"
                media="(max-width:1500px)"
              />
              <img src="${imgDesktop}" alt="name"/>
            </picture>
            <button class="add-to-cart">
             <img src="images/icon-add-to-cart.svg" alt="cart icon" />
             Add to Cart
            </button>
            <h4>${type}</h4>
            <h2>${name}</h2>
            <p>${price}</p>
        </div>
    `
    )
  
}
