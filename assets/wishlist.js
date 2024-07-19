class Wishlist{constructor(){this.isWishlistPage=!1,this.storageKey="m-wishlist-products",this.products=[],this.productNodes={},this.pageTemplate="page.wishlist",this.addedClass="added-to-wishlist",this.hasItemClass="wishlist-has-item",this.selectors={container:".m-wishlist-page-content__wrapper",noProducts:".m-wishlist-no-products",wrapper:".m-wishlist-card",productCard:".m-product-card",wishlistButton:".m-wishlist-button",wishlistText:".m-wishlist-button-text",removeButton:".m-wishlist-remove-button",count:".m-wishlist-count"},this.products=Array.from(new Set(Array.from(JSON.parse(localStorage.getItem(this.storageKey))||[]))),this.isWishlistPage=MinimogSettings.template===this.pageTemplate,this.init()}init=async()=>{this.isWishlistPage&&(await this.renderWishlistPage(),this.addEventToRemoveButtons()),this.setWishlistButtonsState(),this.addEventToWishlistButtons(),this.updateWishlistCount()};saveToStorage=()=>{this.products=Array.from(new Set(this.products)),localStorage.setItem(this.storageKey,JSON.stringify(this.products))};addToWishlist(t){t&&-1===this.products.indexOf(t)&&(this.products.push(t),this.saveToStorage())}removeFromWishlist(t){this.products=this.products.filter((s=>s!==t)),this.saveToStorage()}setWishlistButtonsState=()=>{document.querySelectorAll(this.selectors.wishlistButton).forEach((t=>{const s=t&&t.dataset.productHandle;this.products.indexOf(s)>=0&&t&&!t.classList.contains(this.addedClass)&&(this.toggleButtonState(t,!0),this.isWishlistPage&&(t.classList.remove(this.selectors.wishlistButton.replace(".","")),t.classList.add(this.selectors.removeButton.replace(".",""))))}))};updateWishlistCount=()=>{const t=this.products.length;[...document.querySelectorAll(this.selectors.count)].forEach((s=>{s.textContent=t,t<1?s.classList.add("m:hidden"):s.classList.remove("m:hidden")}));const s=t?"add":"remove";document.body.classList[s](this.hasItemClass)};addEventToWishlistButtons=()=>{addEventDelegate({selector:this.selectors.wishlistButton,handler:(t,s)=>{t.preventDefault();const e=s&&s.dataset.productHandle;if(e){const t=!s.classList.contains(this.addedClass);this.toggleButtonState(s,t),this.updateWishlistCount(),document.querySelectorAll(this.selectors.wishlistButton).forEach((t=>{if(t&&t.dataset.productHandle===e&&t!==s){const s=!t.classList.contains(this.addedClass);this.toggleButtonState(t,s)}}))}}})};toggleButtonState=(t,s)=>{const e=t&&t.dataset.productHandle,i=t&&t.querySelector(this.selectors.wishlistText);if(s?(this.addToWishlist(e),t.classList.add(this.addedClass)):(this.removeFromWishlist(e),t.classList.remove(this.addedClass)),i){const t=i.dataset.revertText;i.dataset.revertText=i.textContent,i.textContent=t}};addEventToRemoveButtons=()=>{addEventDelegate({selector:this.selectors.removeButton,handler:(t,s)=>{t.preventDefault();const e=s&&s.closest(this.selectors.wrapper);e&&e.remove();const i=s&&s.dataset.productHandle;i&&(this.removeFromWishlist(i),this.updateWishlistCount(),this.products.length||this.showNoProductsMessage())}})};wishlistRemoveButton(t){const s=document.createElement("DIV");return s.classList.add("m-tooltip","m-wishlist-remove-button","m:block","md:m:hidden"),s.setAttribute("data-product-handle",t),s.innerHTML='<svg class="m-svg-icon--medium" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>',s}renderWishlistPage=async()=>{const t=document.querySelector(this.selectors.container);if(t){let s=!0;if(this.products.length){const e=this.products.map((async t=>{const e=formatUrl("products",t,"view=grid-card-item"),i=await fetchCache(e),o=document.createElement("DIV");o.classList.add("m:hidden","m:column","m-wishlist-card"),o.innerHTML=i,o.querySelector(this.selectors.productCard)&&(s=!1,o.appendChild(this.wishlistRemoveButton(t)),this.productNodes[t]=o)}));await Promise.all(e),this.products.forEach((s=>{const e=this.productNodes[s];e&&(t.appendChild(e),MinimogTheme.CompareProduct&&MinimogTheme.CompareProduct.setCompareButtonsState(),e.classList.remove("m:hidden"))}))}s?this.showNoProductsMessage():this.setWishlistButtonsState(),t.classList.add("is-visible")}};showNoProductsMessage=()=>{const t=document.querySelector(this.selectors.container),s=document.querySelector(this.selectors.noProducts);t.classList.add("m:hidden"),s.classList.remove("m:hidden")}}MinimogTheme.Wishlist=new Wishlist;