import{m as c,_ as n,o as a,c as m,w as d,b as e,t as s,e as o,F as _,i as u,g as p,r as x}from"./index-SPJMaqR3.js";import{h as f}from"./helperStore-B2m3bXAV.js";const h={props:{article:Object},methods:{...c(f,["timestampToDate"])}},b={class:"relative mb-4 h-64 w-full overflow-hidden rounded-sm"},y=["src"],g={class:"absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-primary-800/30 p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100"},v={class:"mb-4 line-clamp-3 text-justify text-primary-50 hidden sm:block sm:text-lg"},k=e("div",{class:"btn bg-primary-50"},"了解更多",-1),w={class:"mb-2 text-sm text-stone-500 sm:mb-4 sm:text-base"},j={class:"mb-2 text-lg font-bold text-primary-800 sm:mb-4 sm:text-xl xl:text-2xl"},A={class:"mb-2 line-clamp-3 text-justify sm:hidden"},B={key:0,class:"flex gap-1 text-sm sm:text-base"};function C(i,D,t,L,F,N){const l=x("RouterLink");return a(),m(l,{to:`/article/${t.article.id}`,class:"group w-full"},{default:d(()=>[e("div",b,[e("img",{lazy:"loading",class:"h-full w-full object-cover transition-transform duration-300 group-hover:scale-110",src:t.article.image,alt:"文章圖"},null,8,y),e("div",g,[e("p",v,s(t.article.description),1),k])]),e("p",w,s(i.timestampToDate(t.article.create_at)),1),e("h4",j,s(t.article.title),1),e("p",A,s(t.article.description),1),Array.isArray(t.article.tag)?(a(),o("ul",B,[(a(!0),o(_,null,u(t.article.tag,r=>(a(),o("li",{key:r,class:"rounded-sm bg-primary-300 px-2 py-1 text-primary-900"},s(r),1))),128))])):p("",!0)]),_:1},8,["to"])}const T=n(h,[["render",C]]);export{T as A};
