import{_ as f,m as o,a as c,e as t,F as _,i as h,d,w as x,b as s,r as l,o as e,f as b}from"./index-C2aWBhNW.js";import{l as g}from"./loadingStore-CaS2FV-7.js";import{P as v,f as n}from"./ProductCard-Bmbzw5kO.js";import{p}from"./productStore-TQuV6c-9.js";import"./cartStore-kEBqvF3p.js";import"./swalStore-DKeR5SB5.js";import"./LoadingBtn-Bu5dDUl7.js";const P={components:{ProductCard:v},data(){return{products:[]}},mounted(){this.filterFavoriteProduct()},methods:{async filterFavoriteProduct(){this.showLoading(),this.getFavorites(),await this.getAllProducts(),this.products=this.allProducts.filter(r=>this.favorites.includes(r.id)),this.hideLoading()},...o(p,["getAllProducts"]),...o(n,["getFavorites"]),...o(g,["showLoading","hideLoading"])},computed:{...c(p,["allProducts"]),...c(n,["favorites"])}},w={class:"container flex h-full flex-col py-10"},y=s("h2",{class:"mb-8 border-b-2 border-primary-200 pb-10 text-center text-4xl font-bold"}," 關注列表 ",-1),k={key:0,class:"-m-4 mb-8 flex flex-wrap *:p-4"},F={key:1,class:"flex grow flex-col items-center justify-center"},L=s("i",{class:"bi bi-heartbreak text-6xl"},null,-1),C=s("p",{class:"py-6 text-lg"},"目前沒有關注的產品",-1);function S(r,A,B,N,a,V){const u=l("ProductCard"),m=l("RouterLink");return e(),t("div",w,[y,a.products.length?(e(),t("ul",k,[(e(!0),t(_,null,h(a.products,i=>(e(),t("li",{class:"w-full md:w-1/2 xl:w-1/3",key:i.id},[d(u,{product:i},null,8,["product"])]))),128))])):(e(),t("div",F,[L,C,d(m,{to:"/products",class:"btn btn-primary"},{default:x(()=>[b("開始購物")]),_:1})]))])}const D=f(P,[["render",S]]);export{D as default};