import{m as P,a as T,_ as E,o as p,c as N,w as a,b as t,t as f,n as m,d as s,e as h,j as y,D as I,F as w,f as V,r as F,g as B,I as j,h as n}from"./index-BBoj-WCo.js";import{l as C}from"./loadingStore-B4P190Xb.js";import{s as D}from"./swalStore-DONvkEHU.js";import{h as O}from"./helperStore-C7eKa9jE.js";import{F as H,C as G,a as z}from"./CopyBtn-D_ZwnBsz.js";import{F as J}from"./FormFloat-B1KU6-Da.js";import{L as R}from"./LoadingBtn-D5iP72ir.js";import{F as K,C as Q,A as W,T as X}from"./AdminActionBtns-B1p6uOS3.js";import{P as Y}from"./PaginationComponent-BDniV4gc.js";import{A as Z}from"./ActiveBadge-CTp9SowT.js";import"./XBtn-C7bgza4u.js";import"./scrollStore-DskXxJGw.js";var $={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"jiayu",BASE_URL:"/Chocolate-Shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:tt,VITE_PATH:et}=$,ot={components:{FormModal:K,FormFloat:J,FileInput:H,CopyBtn:G,LoadingBtn:R,CropperComponent:z,ChecksRadio:Q},props:{product:Object,categories:Array,isNew:Boolean,pagination:Object},data(){return{tempProduct:{},tempImageUrl:"",tempImagesUrl:""}},mounted(){this.tempProduct=this.product},watch:{product(){this.tempProduct=this.product}},methods:{showModal(){this.$refs.productFormModal.showModal()},closeModal(){this.$refs.productFormModal.closeModal()},resetModalForm(){this.$refs.productForm.resetForm()},addImageUrl(i){this.tempProduct.imageUrl=i},addImagesUrl(i){this.tempProduct.imagesUrl.push(i),this.tempImagesUrl=""},addImagesUrlArray(i){this.tempProduct.imagesUrl.push(...i)},async updateProduct(){try{let i=`${tt}/api/${et}/admin/product`,e="post",d=1;const M=`已${this.isNew?"新增":"更新"}產品「${this.tempProduct.title}」`;this.isNew?this.loadingStatus.newProduct=!0:(i+=`/${this.tempProduct.id}`,e="put",d=this.pagination.current_page,this.loadingStatus.productId=this.tempProduct.id),this.closeModal(),await this.$http[e](i,{data:this.tempProduct}),this.resetModalForm(),this.$emit("getData",d),this.loadingStatus.productId="",this.loadingStatus.newProduct=!1,this.swalToast(M)}catch(i){this.loadingStatus.productId="",this.loadingStatus.newProduct=!1,this.apiErrorSwal(i)}},...P(D,["swalToast","apiErrorSwal"]),...P(C,["showLoading","hideLoading"])},computed:{...T(C,["loadingStatus"])}},st={class:"flex justify-between items-end mb-3"},lt=t("h4",{class:"text-xl font-bold text-primary-800"},"圖片",-1),rt=t("p",{class:"text-stone-500 mb-3"},"※ 請先使用裁剪小工具將圖片裁剪成適當長寬比 (4:3) 再上傳！",-1),it={class:"pb-4 md:pb-8 mb-4 border-b border-primary-700"},at=t("h5",{class:"text-lg mb-1"},"- 主圖 -",-1),nt=t("p",{class:"mb-2"},"請選擇圖片檔案或貼上圖片網址：",-1),dt={class:"flex mb-5"},ct=["disabled"],mt={key:1,class:"mb-3 md:w-1/2"},ut={class:"relative border-2 border-primary-300 rounded-md p-1"},pt=["src"],ht=t("i",{class:"bi bi-trash-fill"},null,-1),gt=[ht],_t=t("hr",null,null,-1),bt=t("h5",{class:"text-lg mt-3 mb-1"},"- 其他圖片 -",-1),ft=t("p",{class:"mb-2"},"請選擇圖片檔案或貼上圖片網址：",-1),yt={class:"flex mb-3"},Pt={key:2,class:"grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3"},wt=["src"],xt=["onClick"],Ut=t("i",{class:"bi bi-trash-fill"},null,-1),vt=[Ut],It=t("h4",{class:"text-xl font-bold text-primary-800 mb-4"},"文字",-1),Vt={class:"flex flex-col gap-3"},Ct={class:"flex gap-3"},Mt={class:"w-2/3"},St={class:"w-1/3"},At={class:"flex gap-3"},Ft={class:"w-2/3"},Lt={id:"categoryList"},kt=["value"],Tt={class:"w-1/3"},Et={class:"flex gap-3"},Bt={class:"w-2/3"},Dt={class:"w-1/3"},Rt=t("hr",null,null,-1),qt={class:"mt-5 text-end"},Nt=t("button",{type:"submit",class:"btn btn-primary"}," 儲存編輯",-1);function jt(i,e,d,M,o,c){const S=n("CropperComponent"),x=n("FileInput"),u=n("FormFloat"),U=n("CopyBtn"),A=n("LoadingBtn"),_=n("VField"),v=n("ChecksRadio"),g=n("VForm"),q=n("FormModal");return p(),N(q,{target:"product",ref:"productFormModal",onResetForm:c.resetModalForm},{title:a(({titleClass:b})=>[t("h3",{class:m(b)},f(d.isNew?"新增":"編輯")+"產品",3)]),default:a(()=>[s(g,{ref:"productForm",onSubmit:c.updateProduct},{default:a(({errors:b})=>[t("div",st,[lt,s(S,{"down-name":o.tempProduct.title},null,8,["down-name"])]),rt,t("div",it,[at,o.tempProduct.imageUrl?(p(),h("div",mt,[t("div",ut,[t("img",{loading:"lazy",src:o.tempProduct.imageUrl,class:"object-cover rounded-sm",alt:"產品圖"},null,8,pt),s(U,{text:o.tempProduct.imageUrl,msg:"圖片網址",class:"absolute right-0 bottom-0 p-1 rounded-md bg-primary-50 text-primary-800 duration-150 hover:text-primary-300"},null,8,["text"]),t("button",{type:"button",class:"absolute right-0 top-0 p-1 rounded-md bg-primary-50 text-primary-800 duration-150 hover:text-red-500 focus:text-red-500",onClick:e[2]||(e[2]=r=>o.tempProduct.imageUrl="")},gt)])])):(p(),h(w,{key:0},[nt,s(x,{"return-url":!0,onEmitChange:c.addImageUrl,class:"mb-3",isLoading:i.loadingStatus.imageUrl},null,8,["onEmitChange","isLoading"]),t("div",dt,[s(u,{"label-for":"imageUrl",label:"圖片網址",class:"flex-grow"},{default:a(({inputClass:r})=>[y(t("input",{type:"text",name:"圖片",id:"imageUrl",class:m([r,"rounded-r-none"]),"onUpdate:modelValue":e[0]||(e[0]=l=>o.tempImageUrl=l),placeholder:""},null,2),[[I,o.tempImageUrl]])]),_:1}),t("button",{type:"button",class:"btn btn-primary rounded-l-none text-nowrap",disabled:!o.tempImageUrl,onClick:e[1]||(e[1]=r=>o.tempProduct.imageUrl=o.tempImageUrl)},"加入圖片",8,ct)])],64)),_t,bt,ft,s(x,{"return-url":!0,isMultiple:!0,onEmitChange:c.addImagesUrlArray,isLoading:i.loadingStatus.imagesUrl,class:"mb-3"},null,8,["onEmitChange","isLoading"]),t("div",yt,[s(u,{"label-for":"imageUrl",label:"圖片網址",class:"flex-grow"},{default:a(({inputClass:r})=>[y(t("input",{type:"text",name:"圖片",id:"imageUrl",class:m([r,"rounded-r-none"]),placeholder:"","onUpdate:modelValue":e[3]||(e[3]=l=>o.tempImagesUrl=l)},null,2),[[I,o.tempImagesUrl]])]),_:1}),s(A,{class:"btn btn-primary rounded-l-none text-nowrap",isLoading:i.loadingStatus.imagesUrl,disabled:!o.tempImagesUrl,onClick:e[4]||(e[4]=r=>c.addImagesUrl(o.tempImagesUrl))},{default:a(()=>[V("加入圖片")]),_:1},8,["isLoading","disabled"])]),Array.isArray(o.tempProduct.imagesUrl)?(p(),h("div",Pt,[(p(!0),h(w,null,F(o.tempProduct.imagesUrl,(r,l)=>(p(),h("div",{key:`img${l}`,class:"relative border-2 border-primary-300 rounded-md p-1"},[t("img",{loading:"lazy",src:r,class:"object-cover",alt:"產品圖"},null,8,wt),t("button",{type:"button",class:"absolute right-0 top-0 p-1 rounded-md bg-primary-50 text-primary-800 duration-150 hover:text-red-500 focus:text-red-500",onClick:ie=>o.tempProduct.imagesUrl.splice(l,1)},vt,8,xt),s(U,{text:o.tempProduct.imagesUrl[l],msg:"圖片網址",class:"absolute right-0 bottom-0 p-1 rounded-md bg-primary-50 text-primary-800 duration-150 hover:text-primary-300"},null,8,["text"])]))),128))])):B("",!0)]),It,t("div",Vt,[t("div",Ct,[t("div",Mt,[s(u,{"label-for":"title",label:"名稱",errors:b},{default:a(({inputClass:r})=>[s(_,{type:"text",name:"名稱",id:"title",modelValue:o.tempProduct.title,"onUpdate:modelValue":e[5]||(e[5]=l=>o.tempProduct.title=l),class:m(r),rules:"required",placeholder:"",required:""},null,8,["modelValue","class"])]),_:2},1032,["errors"])]),t("div",St,[s(u,{"label-for":"stock",label:"庫存",errors:b},{default:a(({inputClass:r})=>[s(_,{type:"number",name:"庫存",min:"0",id:"stock",modelValue:o.tempProduct.stock,"onUpdate:modelValue":e[6]||(e[6]=l=>o.tempProduct.stock=l),modelModifiers:{number:!0},class:m(r),rules:"required",placeholder:"",required:""},null,8,["modelValue","class"])]),_:2},1032,["errors"])])]),t("div",At,[t("div",Ft,[s(u,{"label-for":"category",label:"類別",errors:b},{default:a(({inputClass:r})=>[s(_,{type:"text",name:"類別",id:"category",list:"categoryList",modelValue:o.tempProduct.category,"onUpdate:modelValue":e[7]||(e[7]=l=>o.tempProduct.category=l),class:m(r),rules:"required",placeholder:"",required:""},null,8,["modelValue","class"]),t("datalist",Lt,[(p(!0),h(w,null,F(d.categories,l=>(p(),h("option",{key:l,value:l},f(l),9,kt))),128))])]),_:2},1032,["errors"])]),t("div",Tt,[s(u,{"label-for":"origin_price",label:"原價",errors:b},{default:a(({inputClass:r})=>[s(_,{type:"number",name:"原價",min:"0",id:"origin_price",modelValue:o.tempProduct.origin_price,"onUpdate:modelValue":e[8]||(e[8]=l=>o.tempProduct.origin_price=l),modelModifiers:{number:!0},class:m(r),rules:"required",placeholder:"",required:""},null,8,["modelValue","class"])]),_:2},1032,["errors"])])]),t("div",Et,[t("div",Bt,[s(u,{"label-for":"unit",label:"單位",errors:b},{default:a(({inputClass:r})=>[s(_,{type:"text",name:"單位",id:"unit",modelValue:o.tempProduct.unit,"onUpdate:modelValue":e[9]||(e[9]=l=>o.tempProduct.unit=l),class:m(r),rules:"required",placeholder:"",required:""},null,8,["modelValue","class"])]),_:2},1032,["errors"])]),t("div",Dt,[s(u,{"label-for":"price",label:"售價",errors:b},{default:a(({inputClass:r})=>[s(_,{type:"number",name:"售價",min:"0",id:"price",modelValue:o.tempProduct.price,"onUpdate:modelValue":e[10]||(e[10]=l=>o.tempProduct.price=l),modelModifiers:{number:!0},class:m(r),rules:"required",placeholder:"",required:""},null,8,["modelValue","class"])]),_:2},1032,["errors"])])]),Rt,s(u,{"label-for":"description",label:"產品描述"},{default:a(({inputClass:r})=>[y(t("textarea",{type:"text",name:"產品描述",id:"description","onUpdate:modelValue":e[11]||(e[11]=l=>o.tempProduct.description=l),class:m(r),placeholder:""},`
              `,2),[[I,o.tempProduct.description]])]),_:1}),s(u,{"label-for":"content",label:"說明內容"},{default:a(({inputClass:r})=>[y(t("textarea",{type:"text",name:"說明內容",id:"content","onUpdate:modelValue":e[12]||(e[12]=l=>o.tempProduct.content=l),class:m(r),placeholder:""},`
              `,2),[[I,o.tempProduct.content]])]),_:1}),s(v,{"label-for":"is_enabled",label:"是否上架"},{default:a(({inputClass:r})=>[y(t("input",{id:"is_enabled",class:m(r),type:"checkbox","true-value":1,"false-value":0,"onUpdate:modelValue":e[13]||(e[13]=l=>o.tempProduct.is_enabled=l)},null,2),[[j,o.tempProduct.is_enabled]])]),_:1})]),t("div",qt,[t("button",{type:"button",class:"btn btn-outline-primary me-3",onClick:e[14]||(e[14]=r=>{c.closeModal(),c.resetModalForm()})}," 取消編輯"),Nt])]),_:1},8,["onSubmit"])]),_:1},8,["onResetForm"])}const Ot=E(ot,[["render",jt]]);var Ht={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"jiayu",BASE_URL:"/Chocolate-Shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:L,VITE_PATH:k}=Ht,Gt={components:{ProductModal:Ot,PaginationComponent:Y,AdminActionBtns:W,TableComponent:X,ActiveBadge:Z,LoadingBtn:R},data(){return{products:[],tempProduct:{},categories:[],isNew:!1,pagination:{}}},mounted(){this.showLoading(),this.getAdminProducts()},methods:{async getAdminProducts(i=1){try{const e=`${L}/api/${k}/admin/products?page=${i}`,{data:d}=await this.$http.get(e);this.products=d.products,this.pagination=d.pagination,this.categories=this.handleArrayInData(this.products,"category"),this.loadingStatus.productId="",this.hideLoading()}catch(e){this.hideLoading(),this.apiErrorSwal(e)}},async delProduct(i){if((await this.delSwal("產品",i.title)).isConfirmed)try{this.loadingStatus.productId=i.id;const d=`${L}/api/${k}/admin/product/${i.id}`;await this.$http.delete(d),this.getAdminProducts(this.pagination.current_page),this.swalToast(`已刪除產品「${i.title}」`),this.loadingStatus.productId=""}catch(d){this.loadingStatus.productId="",this.$swals(d.data.message||"發生錯誤，請稍後再試")}},openModal(i,e){switch(i){case"new":this.tempProduct={imagesUrl:[],is_enabled:0},this.isNew=!0;break;case"edit":this.tempProduct={...e},Array.isArray(this.tempProduct.imagesUrl)||(this.tempProduct.imagesUrl=[]),this.isNew=!1;break}this.$refs.productModal.showModal()},...P(C,["showLoading","hideLoading"]),...P(D,["swalToast","delSwal","apiErrorSwal"]),...P(O,["handleArrayInData"])},computed:{...T(C,["loadingStatus"])}},zt={class:"flex justify-between items-center mb-8"},Jt=t("h2",{class:"text-2xl font-bold"},"產品管理",-1),Kt={key:0,class:"bi bi-plus-lg me-1"},Qt=t("th",{scope:"col",class:"min-w-8"}," 分類 ",-1),Wt=t("th",{scope:"col",class:"min-w-24"},"產品名稱",-1),Xt=t("th",{scope:"col",class:"text-end min-w-9"}," 原價 ",-1),Yt=t("th",{scope:"col",class:"text-end min-w-9"}," 售價 ",-1),Zt=t("th",{scope:"col",class:"text-end min-w-9"}," 庫存 ",-1),$t=t("th",{scope:"col",class:"text-center"}," 狀態 ",-1),te=t("th",{scope:"col"},null,-1),ee={class:"text-end"},oe={class:"text-end"},se={class:"text-end"},le={class:"text-center"};function re(i,e,d,M,o,c){const S=n("LoadingBtn"),x=n("ActiveBadge"),u=n("AdminActionBtns"),U=n("TableComponent"),A=n("PaginationComponent"),_=n("ProductModal");return p(),h(w,null,[t("div",zt,[Jt,s(S,{class:"btn btn-primary",isLoading:i.loadingStatus.newProduct,onClick:e[0]||(e[0]=v=>c.openModal("new"))},{default:a(()=>[i.loadingStatus.newProduct?B("",!0):(p(),h("i",Kt)),V("新增產品 ")]),_:1},8,["isLoading"])]),s(U,{class:"mb-8"},{th:a(()=>[Qt,Wt,Xt,Yt,Zt,$t,te]),tr:a(({trClass:v})=>[(p(!0),h(w,null,F(o.products,g=>(p(),h("tr",{class:m(v),key:g.id},[t("td",null,f(g.category),1),t("td",null,f(g.title),1),t("td",ee,f(g.origin_price),1),t("td",oe,f(g.price),1),t("td",se,f(g.stock),1),t("td",le,[s(x,{active:g.is_enabled},{trueMsg:a(()=>[V("上架")]),falseMsg:a(()=>[V("下架")]),_:2},1032,["active"])]),t("td",null,[s(u,{data:g,loadingId:"productId",onOpenModal:c.openModal,onDelItem:c.delProduct},null,8,["data","onOpenModal","onDelItem"])])],2))),128))]),_:1}),s(A,{pagination:o.pagination,onGetData:c.getAdminProducts},null,8,["pagination","onGetData"]),s(_,{ref:"productModal",product:o.tempProduct,"is-new":o.isNew,pagination:o.pagination,categories:o.categories,onGetData:c.getAdminProducts},null,8,["product","is-new","pagination","categories","onGetData"])],64)}const ye=E(Gt,[["render",re]]);export{ye as default};
