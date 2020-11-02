
let carts=document.querySelectorAll('.add-cart');

let products = [
    {
        name:'Mega Ripped Jeans',
        tag:'megarippedjeans',
        price:19.99,
        inCart:0
    },
    {
        name:'Ripped Jeans',
        tag:'rippedjeans',
        price:19.99,
        inCart:0
        
    },
    
    {
        name:'Vintage Skinny Jeans',
        tag:'vintageSkinny',
        price:14.99,
        inCart:0
    },

    {
        name:'Vin Skinny Jeans',
        tag:'Vinskinny',
        price:14.99,
        inCart:0
    },

    {
        name:'Wash Skinny Jeans',
        tag:'washskinny',
        price:20.50,
        inCart:0
    },

   { name:'Skinny Jeans',
    tag:'skinny',
    price:20.50,
    inCart:0
}
];
for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }

}


function cartNumbers(product){
    let productNumbers=localStorage.getItem('cartNumbers');

    productNumbers=parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1);
        document.querySelector('.cart span').textContent=productNumbers+1;
    }
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent=1;
    }
    setItems(product);
}
function setItems(product){
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    
    if(cartItems !=null){
        if(cartItems[product.tag]==undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart+=1;
    }
    else{
        product.inCart=1;
        cartItems={
            [product.tag]:product
        }
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}
function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartcost is",cartCost);
    console.log(typeof cartCost);

    if(cartCost!=null){
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost+product.price);
    }
    else{
        localStorage.setItem("totalCost",product.price);
    }
}
function displayCart(){
    let cartItems=localStorage.getItem("productsInCart");
    cartitems=JSON.parse(cartItems);
    let productContainer=document.querySelector
    (".products");

    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML='';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML+=`
            <div class="product">
            <ion-icon name="close-circle"></ion-icon>
            <img src=".Lower1.jpg">
            <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
            <ion-icon class="decrease"
            name="arrow-dropleft-circle"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon class="increase" name="allow-dropright-circle"></ion-icon>
            </div>
            <div class="total">
            $${item.inCart * item.price},00
            </div>
            `;
        });
        productContainer.innerHTML+=`
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
        Basket Total
        </h4>
        <h4 class="backetTotal">
        $${cartCost},00
        </h4>
        `;
    }
}



onLoadCartNumbers();
displayCart();