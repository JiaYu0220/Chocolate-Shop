import{_ as n,o,e as c,b as s,h as t,c as d,g as p,n as i,r as u,f,t as b}from"./index-hIBv_cFW.js";const m={props:{labelFor:String,label:String,errors:Object},data(){return{inputStyle:"w-full pt-5 form-control  read-only:bg-stone-50 peer"}}},h={class:"relative"},_=["for"];function g(r,y,e,S,a,w){const l=u("ErrorMessage");return o(),c("div",{class:i(r.$attrs.class)},[s("div",h,[t(r.$slots,"default",{inputClass:[{"border-red-600":e.errors&&e.errors[e.label]},a.inputStyle]}),s("label",{for:e.labelFor,class:"absolute left-1 top-3 -translate-y-1/2 scale-90 pl-1 text-stone-500 duration-150 peer-placeholder-shown:top-7 peer-placeholder-shown:scale-100 peer-placeholder-shown:pl-2 peer-placeholder-shown:text-stone-500 peer-required:after:ml-1 peer-required:after:text-red-600 peer-required:after:content-['*'] peer-focus:top-3 peer-focus:scale-90 peer-focus:pl-1 peer-focus:text-stone-400"},[t(r.$slots,"label",{},()=>[f(b(e.label),1)])],8,_),t(r.$slots,"icon",{iconClass:"absolute right-0 p-2 top-1/2 -translate-y-1/2 bg-primary-50 border-r border-stone-300 rounded"})]),e.errors?(o(),d(l,{key:0,name:e.label,class:"ml-3 mt-1 text-red-600"},null,8,["name"])):p("",!0)],2)}const C=n(m,[["render",g]]);export{C as F};