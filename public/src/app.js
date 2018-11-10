class DOM {
  constructor() {
    this.addToCartBtn = document.querySelectorAll("button");
    this.itemsInCart = document.querySelector(".items-in-cart");
    this.navCart = document.querySelector(".nav-cart");
    this.cart = document.querySelector(".cart");
  }
}

class UI {
  constructor(DOM) {
    this.DOMElements = DOM;
    this.current = 0;
  }

  cartItemTracker() {
    this.current++;
    this.DOMElements.itemsInCart.innerText = this.current;
  }

  showInCart(name, price, image) {
    this.DOMElements.navCart.innerHTML += `
        <div class="nav-cart-item">
              <div class="description">
                <p>${name}</p>
                <p>£${price}</p>
                <div class="selectors">
                <div><i class="icon ion-md-add"></i></div>
                <div><i class="icon ion-md-remove"></i></div>
              </div>
              </div>
              <div class="img-wrapper">
                <img src=${image}>
              </div>
        </div>
    `;
  }
}

class Controller {
  constructor(DOM, UI) {
    this.DOMElements = DOM;
    this.UI = UI;
    this.cartItems = [];
  }

  addToCart() {
    let items = this.cartItems;
    let ui = this.UI;

    this.DOMElements.addToCartBtn.forEach(function(btn) {
      btn.addEventListener("click", addItem);
    });

    function addItem(e) {
      const name = e.target.dataset.name;
      const price = e.target.dataset.price;
      const image = e.target.dataset.imgsrc;

      items.forEach(function(item) {
        if (item.name === name) {
          return;
        } else {
          items.push({ name, price, image });
        }
      });

      ui.cartItemTracker();

      ui.showInCart(name, price, image);
    }
  }

  showCart() {
    let navCart = this.DOMElements.navCart;
    this.DOMElements.cart.addEventListener("click", function(e) {
      navCart.classList.toggle("active");
    });
  }
}

const controller = new Controller(new DOM(), new UI(new DOM()));

controller.addToCart();
controller.showCart();
