if(document.readyState=="loading"){
    document.addEventListener("DOMContentLoaded",ready)

}
else{
    ready()
}

data={
    "id": 42,
    "SaleDate": "2020-06-02",
    "MedUID": {
        "id": 6,
        "Name": "Azee 500",
        "Desc": "Azee 500 Tablet is an antibiotic used to treat various types of bacterial infections of the respiratory tract, ear, nose, throat, lungs, skin, and eye in adults and children. It is also effective in typhoid fever and some sexually transmitted diseases like gonorrhea.",
        "Price": 45,
        "ExpiryDate": "2021-11-10",
        "vendor": 3,
        "created_at": "2020-06-10T17:15:09.392Z",
        "updated_at": "2020-06-11T07:22:59.698Z"
    },
    "QuantitySold": 10,
    "Revenue": null,
    "created_at": "2020-06-11T14:00:27.128Z",
    "updated_at": "2020-06-11T14:00:27.172Z"
}

function ready() {
    var RemoveCartItemButtons = document.getElementsByClassName('btn-danger')
        /* console.log(RemoveCartItemButtons) */
    for(var i=0 ;i<RemoveCartItemButtons.length; i++){
        var button = RemoveCartItemButtons[i]
        button.addEventListener('click' , removeCartItem)
    }

    var quantityInputs=document.getElementsByClassName('cart-quantity-input')
    for(var i=0;i<quantityInputs.length;i++)
    {
        var input=quantityInputs[i]
        input.addEventListener('change',quantitychanged)
    }
    
    var addToCartButtons=document.getElementsByClassName('shop-item-button')
    for(var i=0 ; i<addToCartButtons.length;i++){
        var button=addToCartButtons[i]
        button.addEventListener('click',addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)
}

function purchaseClicked(){
    alert('Thank you for purchasing these Items')
    var cartItems=document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem (event) {
    var buttonclicked=event.target
    buttonclicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer=document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0 
    for(var i=0 ; i<cartRows.length;i++){
        var cartRow = cartRows[i]
        var PriceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(PriceElement.innerText.replace('$',''))
        var quantity=quantityElement.value
        total=total+ (price*quantity)
    }

    total=Math.round(total*100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText='$'+total
}

function quantitychanged(event){
    var input=event.target
    if(isNaN(input.value)||input.value<=0){
        input.value=1

    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    
    var title = data["MedUID"]["Name"]
    var price = data["MedUID"]["Price"]
    var quantity=data["QuantitySold"]
    // var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price,quantity )
    updateCartTotal()
}

function addItemToCart(title, price ,quantity){

    var cartRow=document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems=document.getElementsByClassName('cart-items')[0]
    var cartItemNames=cartItems.getElementsByClassName('cart-item-title')
    for(var i=0 ; i<cartItemNames.length;i++){
        if(cartItemNames[i].innerText==title){
            alert("This Item Is Already In The Cart")
            return
        }
    }
    var cartRowContents=`<div class="cart-item cart-column">
                            
                            <span class="cart-item-title">${title}</span>
                        </div>
                        <span class="cart-price cart-column">$${price}</span>
                        <div class="cart-quantity cart-column">
                            <input class="cart-quantity-input" type="number" value="${quantity}">
                            <button class="btn btn-danger " type="button">REMOVE</button>
                        </div>
    `
    cartRow.innerHTML=cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantitychanged)
}