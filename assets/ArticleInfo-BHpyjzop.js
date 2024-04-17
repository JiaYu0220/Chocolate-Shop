import{_ as x,m as l,a as v,c as m,w as n,r as p,o,j as I,v as w,b as t,t as c,e as d,i as b,F as y,f as a,n as u,d as A}from"./index-C2aWBhNW.js";import{l as k}from"./loadingStore-CaS2FV-7.js";import{h as S}from"./helperStore-8FkoNKpf.js";import{a as f}from"./articleStore-BF6gn55g.js";import{s as T}from"./swalStore-DKeR5SB5.js";import{T as L}from"./TransitionFade-Du5nzGOQ.js";var E={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"jiayu",BASE_URL:"/Chocolate-Shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:j,VITE_PATH:V}=E,D={components:{TransitionFade:L},data(){return{article:{},currentId:"",prevId:"",nextId:""}},mounted(){this.init()},watch:{"$route.params.id":{handler(){this.init()},deep:!0}},methods:{async init(){this.showLoading(),window.scrollTo(0,0);const s=[this.getSingleArticle(),this.getAllArticles()];(await Promise.allSettled(s)).forEach(r=>{r.status==="rejected"&&(this.hideLoading(),this.$swal(r.response.data))}),this.getAdjacentArticleId(),this.hideLoading()},async getSingleArticle(){try{this.currentId=this.$route.params.id;const s=`${j}/api/${V}/article/${this.currentId}`,i=await this.$http.get(s);this.article=i.data.article}catch(s){this.hideLoading(),this.apiErrorSwal(s)}},getAdjacentArticleId(){const s=this.articles.length-1,i=this.articles.findIndex(r=>r.id===this.currentId);i!==0&&(this.prevId=this.articles[i-1].id),i!==s&&(this.nextId=this.articles[i+1].id)},...l(k,["showLoading","hideLoading"]),...l(S,["timestampToDate"]),...l(f,["getAllArticles"]),...l(T,["apiErrorSwal"])},computed:{...v(f,["articles"])}},R={class:"relative h-64 w-full md:h-96"},B=["src"],F={class:"absolute bottom-0 left-0 mb-8 flex w-full justify-center md:mb-12"},C={class:"bg-primary-800/60 p-4 font-bold text-primary-50"},P={class:"mb-2 md:text-lg"},N={class:"text-xl md:text-4xl"},O={class:"container py-10"},U={class:"mx-auto mb-6 text-wrap md:w-1/2"},z={class:"mx-auto mb-20 md:w-1/2"},H={class:"flex justify-between md:text-lg"},M=t("i",{class:"bi bi-chevron-left me-1"},null,-1),$=t("i",{class:"bi bi-chevron-left me-1"},null,-1),q=t("i",{class:"bi bi-chevron-right ml-1"},null,-1),G=t("i",{class:"bi bi-chevron-right ml-1"},null,-1);function J(s,i,r,K,e,Q){const h=p("RouterLink"),g=p("TransitionFade");return o(),m(g,{mode:"out-in"},{default:n(()=>[I(t("div",null,[t("div",R,[t("img",{class:"h-full w-full object-cover",lazy:"loading",src:e.article.image,alt:"文章圖"},null,8,B),t("div",F,[t("div",C,[t("p",P,c(s.timestampToDate(e.article.create_at)),1),t("h2",N,c(e.article.title),1)])])]),t("div",O,[t("pre",U,c(e.article.content),1),t("ul",z,[(o(!0),d(y,null,b(e.article.tag,_=>(o(),d("li",{key:_,class:"text-primary-700"},"# "+c(_),1))),128))]),t("div",H,[e.prevId?(o(),m(h,{key:0,class:"link",to:`/article/${e.prevId}`},{default:n(()=>[M,a("上一篇 ")]),_:1},8,["to"])):(o(),d("span",{key:1,class:u(["text-stone-500",{link:e.prevId}])},[$,a("上一篇 ")],2)),A(h,{class:"link",to:"/articles"},{default:n(()=>[a("返回文章列表")]),_:1}),e.nextId?(o(),m(h,{key:2,class:"link",to:`/article/${e.nextId}`},{default:n(()=>[a("下一篇"),q]),_:1},8,["to"])):(o(),d("span",{key:3,class:u(["text-stone-500",{link:e.nextId}])},[a(" 下一篇"),G],2))])])],512),[[w,Object.keys(e.article).length]])]),_:1})}const st=x(D,[["render",J]]);export{st as default};