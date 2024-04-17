import{m as l,_,o as s,e as a,b as e,D as r,F as p,i as h,t as d,g}from"./index-C2aWBhNW.js";import{l as y}from"./loadingStore-CaS2FV-7.js";const m={props:{pagination:Object},methods:{prePage(){this.showLoading(),this.$emit("getData",this.pagination.current_page-1)},specifyPage(c){this.showLoading(),this.$emit("getData",c)},nextPage(){this.showLoading(),this.$emit("getData",this.pagination.current_page+1)},...l(y,["showLoading"])}},x={key:0,class:"block text-center","aria-label":"Pagination"},b={class:"mx-auto inline-flex justify-center overflow-hidden rounded-lg border border-stone-200 bg-primary-50 text-sm md:text-lg"},u={class:"border-r border-stone-200"},k=e("span",{class:"sr-only"},"上一頁",-1),f=e("span",{"aria-hidden":"true"},"<",-1),v=[k,f],P={key:1,class:"block bg-stone-100 px-4 py-2 text-stone-500"},w=e("span",{class:"sr-only"},"上一頁",-1),C=e("span",{"aria-hidden":"true"},"<",-1),D=[w,C],L=["onClick"],B={key:1,class:"block bg-stone-100 px-4 py-2 text-stone-500"},j=e("span",{class:"sr-only"},"下一頁",-1),F=e("span",{"aria-hidden":"true"},">",-1),N=[j,F],S={key:1,class:"block bg-stone-100 px-4 py-2 text-stone-500"},V=e("span",{class:"sr-only"},"下一頁",-1),A=e("span",{"aria-hidden":"true"},">",-1),E=[V,A];function M(c,i,o,O,q,n){return o.pagination.total_pages!==1?(s(),a("nav",x,[e("ul",b,[e("li",u,[o.pagination.has_pre?(s(),a("a",{key:0,href:"#",class:"block px-4 py-2 duration-150 hover:bg-primary-700 hover:text-primary-100",onClick:i[0]||(i[0]=r((...t)=>n.prePage&&n.prePage(...t),["prevent"]))},v)):(s(),a("span",P,D))]),(s(!0),a(p,null,h(o.pagination.total_pages,t=>(s(),a("li",{class:"border-r border-stone-200",key:`page${t}`},[t!==o.pagination.current_page?(s(),a("a",{key:0,href:"#",class:"block px-4 py-2 duration-150 hover:bg-primary-700 hover:text-primary-100",onClick:r(z=>n.specifyPage(t),["prevent"])},d(t),9,L)):(s(),a("span",B,d(t),1))]))),128)),e("li",null,[o.pagination.has_next?(s(),a("a",{key:0,href:"#",class:"block px-4 py-2 duration-150 hover:bg-primary-700 hover:text-primary-100",onClick:i[1]||(i[1]=r((...t)=>n.nextPage&&n.nextPage(...t),["prevent"]))},N)):(s(),a("span",S,E))])])])):g("",!0)}const I=_(m,[["render",M]]);export{I as P};