import{_ as g,m as d,a as x,e as a,b as t,t as c,F as _,r as I,c as p,w as h,n as u,f as l,d as y,g as b,h as v,o as r}from"./index-D3_6LEXB.js";import{l as A}from"./loadingStore-DT-oSTtX.js";import{h as w}from"./helperStore-BA8s8qZr.js";import{a as f}from"./articleStore-Cf4U9olQ.js";var k={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"jiayu",BASE_URL:"/Chocolate-Shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:L,VITE_PATH:S}=k,T={data(){return{article:{},currentId:"",prevId:"",nextId:""}},mounted(){this.init()},watch:{"$route.params.id":{handler(){this.init()},deep:!0}},methods:{async init(){this.showLoading(),window.scrollTo(0,0);const i=[this.getSingleArticle(),this.getAllArticles()];(await Promise.allSettled(i)).forEach(o=>{o.status==="rejected"&&(this.hideLoading(),this.$swal(o.response.data))}),this.getAdjacentArticleId(),this.hideLoading()},async getSingleArticle(){try{this.currentId=this.$route.params.id;const i=`${L}/api/${S}/article/${this.currentId}`,e=await this.$http.get(i);this.article=e.data.article}catch(i){this.hideLoading();const{message:e}=i.response.data;this.$swal(Array.isArray(e)?e[0]:e)}},getAdjacentArticleId(){const i=this.articles.length-1,e=this.articles.findIndex(o=>o.id===this.currentId);e!==0&&(this.prevId=this.articles[e-1].id),e!==i&&(this.nextId=this.articles[e+1].id)},...d(A,["showLoading","hideLoading"]),...d(w,["timestampToDate"]),...d(f,["getAllArticles"])},computed:{...x(f,["articles"])}},E={class:"w-full h-64 md:h-96 relative"},V=["src"],j={class:"absolute bottom-0 left-0 flex justify-center w-full mb-8 md:mb-12"},R={class:"text-primary-50 font-bold p-4 bg-primary-800/60"},D={class:"md:text-lg mb-2"},B={class:"text-xl md:text-4xl"},C={class:"container py-10"},N={class:"md:w-1/2 mx-auto text-wrap mb-6"},P={class:"md:w-1/2 mx-auto mb-20"},O={class:"flex justify-between md:text-lg"},U=t("i",{class:"bi bi-chevron-left me-1"},null,-1),z=t("i",{class:"bi bi-chevron-left me-1"},null,-1),F=t("i",{class:"bi bi-chevron-right ml-1"},null,-1),H=t("i",{class:"bi bi-chevron-right ml-1"},null,-1);function $(i,e,o,M,s,q){const n=v("RouterLink");return Object.keys(s.article).length?(r(),a(_,{key:0},[t("div",E,[t("img",{class:"object-cover h-full w-full",lazy:"loading",src:s.article.image,alt:"文章圖"},null,8,V),t("div",j,[t("div",R,[t("p",D,c(i.timestampToDate(s.article.create_at)),1),t("h2",B,c(s.article.title),1)])])]),t("div",C,[t("pre",N,c(s.article.content),1),t("ul",P,[(r(!0),a(_,null,I(s.article.tag,m=>(r(),a("li",{key:m,class:"text-primary-700"},"# "+c(m),1))),128))]),t("div",O,[s.prevId?(r(),p(n,{key:0,class:"link",to:`/article/${s.prevId}`},{default:h(()=>[U,l("上一篇")]),_:1},8,["to"])):(r(),a("span",{key:1,class:u(["text-stone-500",{link:s.prevId}])},[z,l("上一篇 ")],2)),y(n,{class:"link",to:"/articles"},{default:h(()=>[l("返回文章列表")]),_:1}),s.nextId?(r(),p(n,{key:2,class:"link",to:`/article/${s.nextId}`},{default:h(()=>[l("下一篇"),F]),_:1},8,["to"])):(r(),a("span",{key:3,class:u(["text-stone-500",{link:s.nextId}])},[l(" 下一篇"),H],2))])])],64)):b("",!0)}const W=g(T,[["render",$]]);export{W as default};
