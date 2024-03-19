import{_ as f,m as o,a as i,e as t,F as h,r as _,d,w as x,b as s,h as l,o as e,f as b}from"./index-D3_6LEXB.js";import{l as g}from"./loadingStore-DT-oSTtX.js";import{P as v,f as n}from"./ProductCard-CSQ03JEK.js";import{p as u}from"./productStore-DNM00zK1.js";import"./cartStore-Blp1LSfe.js";import"./LoadingBtn-_Q2in9eb.js";const P={components:{ProductCard:v},data(){return{products:[]}},mounted(){this.filterFavoriteProduct()},methods:{async filterFavoriteProduct(){this.showLoading(),this.getFavorites(),await this.getAllProducts(),this.products=this.allProducts.filter(r=>this.favorites.includes(r.id)),this.hideLoading()},...o(u,["getAllProducts"]),...o(n,["getFavorites"]),...o(g,["showLoading","hideLoading"])},computed:{...i(u,["allProducts"]),...i(n,["favorites"])}},w={class:"container py-10 h-full flex flex-col"},y=s("h2",{class:"text-center text-4xl font-bold pb-10 border-b-2 border-primary-200 mb-8"},"關注列表",-1),k={key:0,class:"flex flex-wrap -m-4 mb-8 *:p-4"},F={key:1,class:"grow flex flex-col justify-center items-center"},L=s("i",{class:"bi bi-heartbreak text-6xl"},null,-1),C=s("p",{class:"py-6 text-lg"},"目前沒有關注的產品",-1);function S(r,A,B,N,a,V){const p=l("ProductCard"),m=l("RouterLink");return e(),t("div",w,[y,a.products.length?(e(),t("ul",k,[(e(!0),t(h,null,_(a.products,c=>(e(),t("li",{class:"w-full md:w-1/2 xl:w-1/3",key:c.id},[d(p,{product:c},null,8,["product"])]))),128))])):(e(),t("div",F,[L,C,d(m,{to:"/products",class:"btn btn-primary"},{default:x(()=>[b("開始購物")]),_:1})]))])}const z=f(P,[["render",S]]);export{z as default};
