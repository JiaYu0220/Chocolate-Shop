import{P as i,r as n}from"./ProductCard-v9bmaIJ-.js";import{a as c,_ as d,o as r,e as t,F as p,r as u,d as l,h as _}from"./index-BBoj-WCo.js";import{p as m}from"./productStore-CrkNMb8F.js";const f={components:{ProductCard:i},mounted(){n(),Object.assign(this.$refs.productSwiper,{slidesPerView:1,spaceBetween:12,setWrapperSize:!0,navigation:{enabled:!1},scrollbar:{enabled:!0,draggable:!0},grabCursor:!0,breakpoints:{480:{slidesPerView:2},768:{slidesPerView:3,spaceBetween:16,navigation:{enabled:!0}},1280:{slidesPerView:4}}}),this.$refs.productSwiper.initialize()},computed:{products(){return this.allProducts.filter(e=>e.origin_price!==e.price)},...c(m,["allProducts"])}},w={init:"false",ref:"productSwiper"};function P(e,g,b,S,h,o){const a=_("ProductCard");return r(),t("swiper-container",w,[(r(!0),t(p,null,u(o.products,s=>(r(),t("swiper-slide",{key:s.id},[l(a,{product:s},null,8,["product"])]))),128))],512)}const k=d(f,[["render",P],["__scopeId","data-v-39a90596"]]);export{k as P};
