if(!customElements.get("m-recently-viewed")){class e extends HTMLElement{constructor(){super()}connectedCallback(){this.selectors={slideControls:".m-slider-controls",slideContainer:".m-mixed-layout__wrapper"},this.domNodes=queryDomNodes(this.selectors,this),this.enableSlider="true"===this.dataset.enableSlider,this.showPagination="true"===this.dataset.showPagination,this.showNavigation="true"===this.dataset.showNavigation,this.items=this.dataset.productsPerRow,this.mobileDisableSlider="true"===this.dataset.mobileDisableSlider,this.productsToshow=parseInt(this.dataset.productsToShow),MinimogTheme.initWhenVisible({element:this,callback:this.init.bind(this),threshold:600})}init(){fetch(this.dataset.url+this.getQueryString()).then((e=>e.text())).then((e=>{const t=document.createElement("div");t.innerHTML=e;const i=t.querySelector("m-recently-viewed");this.products=i.querySelectorAll(".m-product-card").length,this.products<=0&&this.classList.add("m:hidden"),i&&i.innerHTML.trim().length&&(this.innerHTML=i.innerHTML,this.initByScreenSize(),document.addEventListener("matchMobile",(()=>{this.initByScreenSize()})),document.addEventListener("unmatchMobile",(()=>{this.initByScreenSize()})),MinimogTheme.CompareProduct.setCompareButtonsState(),MinimogTheme.Wishlist.setWishlistButtonsState())})).catch((e=>{}))}initByScreenSize(){if(!this.enableSlider)return;const{slideContainer:e,slideControls:t}=queryDomNodes(this.selectors,this);MinimogTheme.config.mqlMobile&&this.mobileDisableSlider?(t&&t.classList.add("m:hidden"),e&&e.classList.remove("swiper-container"),this.swiper&&this.swiper.destroy(!1,!0)):(t&&t.classList.remove("m:hidden"),this.initSlider()),this.products<=parseInt(this.items)&&t&&t.classList.add("m:hidden")}initSlider(){const{slideContainer:e}=queryDomNodes(this.selectors,this),t=this.querySelector(".m-slider-controls"),i=t&&t.querySelector(".m-slider-controls__button-prev"),s=t&&t.querySelector(".m-slider-controls__button-next"),r=e.querySelector(".swiper-wrapper").childElementCount;e&&e.classList.add("swiper-container"),this.slider=new MinimogLibs.Swiper(e,{slidesPerView:2,showPagination:this.showPagination,showNavigation:this.showNavigation,loop:!(this.products<=parseInt(this.items)),pagination:!!this.showPagination&&{el:this.querySelector(".swiper-pagination"),clickable:!0},breakpoints:{768:{slidesPerView:parseInt(this.items)>=3?3:parseInt(this.items)},1024:{slidesPerView:parseInt(this.items)>=4?4:parseInt(this.items)},1280:{slidesPerView:parseInt(this.items)}},threshold:2,on:{init:()=>{setTimeout((()=>{const e=this.querySelector(".m-image")||this.querySelector(".m-placeholder-svg");if(e&&t){const r=e.clientHeight;t.style.setProperty("--offset-top",parseInt(r)/2+"px"),i&&i.classList.remove("m:hidden"),s&&s.classList.remove("m:hidden")}}),200)},breakpoint:(e,i)=>{if(t){const{slidesPerView:s}=i;r>s?(t.classList.remove("m:hidden"),e.allowTouchMove=!0):(t.classList.add("m:hidden"),e.allowTouchMove=!1)}}}}),this.slider&&this.showNavigation&&(i&&i.addEventListener("click",(()=>this.slider.slidePrev())),s&&s.addEventListener("click",(()=>this.slider.slideNext()))),this.swiper=e&&e.swiper}getQueryString(){const e=JSON.parse(window.localStorage.getItem("minimog-recently-viewed")||"[]");return this.dataset.productId&&e.includes(parseInt(this.dataset.productId))&&e.splice(e.indexOf(parseInt(this.dataset.productId)),1),e.map((e=>"id:"+e)).slice(0,this.productsToshow).join(" OR ")}}customElements.define("m-recently-viewed",e)}