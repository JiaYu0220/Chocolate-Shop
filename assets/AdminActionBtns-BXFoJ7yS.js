import{M as b,X as g}from"./XBtn-ngnlz1FS.js";import{_ as r,o,c as $,w as c,b as a,h as d,d as m,r as p,e as n,t as C,a as y,g as h}from"./index-C2aWBhNW.js";import{L as M}from"./LoadingBtn-Bu5dDUl7.js";import{l as k}from"./loadingStore-CaS2FV-7.js";const x={components:{ModalComponent:b,XBtn:g},data(){return{modal:null}},mounted(){this.modal=this.$refs.modal},methods:{showModal(){this.modal.showModal()},closeModal(){this.modal.closeModal()}}},B={class:"mb-6 flex justify-between"};function w(t,e,i,_,f,s){const l=p("XBtn"),u=p("ModalComponent");return o(),$(u,{ref:"modal",class:"w-full rounded-md bg-primary-50 p-8 shadow-md md:w-2/3 lg:w-1/2"},{default:c(()=>[a("div",B,[d(t.$slots,"title",{titleClass:"text-2xl font-bold"}),m(l,{class:"-mt-2",onClick:e[0]||(e[0]=q=>{s.closeModal(),t.$emit("resetForm")})})]),d(t.$slots,"default")]),_:3},512)}const K=r(x,[["render",w]]),S={props:{labelFor:String,label:String}},L={class:"flex items-center"},I=["for"];function v(t,e,i,_,f,s){return o(),n("div",L,[d(t.$slots,"default",{inputClass:"rounded-sm border-stone-400 bg-primary-50 text-primary-800 mr-2 focus:ring focus:ring-primary-800 focus:ring-opacity-50 focus:border-primary-80"}),a("label",{for:i.labelFor},C(i.label),9,I)])}const P=r(S,[["render",v]]),F={},X={class:"w-full text-left align-middle text-sm md:text-base"},j={class:"border-b-2 border-primary-700"},A={class:"*:pr-1 *:md:px-2 first:*:md:pl-4 last:*:md:pr-4"},N={class:"*:border-b-2 *:border-primary-200 hover:*:bg-primary-100/50"};function V(t,e){return o(),n("table",X,[a("thead",j,[a("tr",A,[d(t.$slots,"th")])]),a("tbody",N,[d(t.$slots,"tr",{trClass:"*:pr-1 *:py-2 *:md:px-2 first:*:md:pl-4 last:*:md:pr-4"})])])}const Q=r(F,[["render",V]]),T={props:{data:[Object,String],loadingId:String},components:{LoadingBtn:M},methods:{openModal(){this.loadingId==="orderId"?this.$emit("openModal",this.data):this.$emit("openModal","edit",this.data)},delItem(){this.$emit("delItem",this.data)}},computed:{isLoading(){return this.loadingStatus[this.loadingId]===this.data.id},...y(k,["loadingStatus"])}},D={class:"flex justify-end gap-2"},E={key:0,class:"bi bi-pencil-fill"},O={key:0,class:"bi bi-trash3-fill"};function R(t,e,i,_,f,s){const l=p("LoadingBtn");return o(),n("div",D,[m(l,{class:"btn btn-link p-1 md:p-2","is-loading":s.isLoading,onClick:s.openModal},{default:c(()=>[s.isLoading?h("",!0):(o(),n("i",E))]),_:1},8,["is-loading","onClick"]),m(l,{class:"btn btn-link p-1 md:p-2","is-loading":s.isLoading,onClick:s.delItem},{default:c(()=>[s.isLoading?h("",!0):(o(),n("i",O))]),_:1},8,["is-loading","onClick"])])}const U=r(T,[["render",R]]);export{U as A,P as C,K as F,Q as T};