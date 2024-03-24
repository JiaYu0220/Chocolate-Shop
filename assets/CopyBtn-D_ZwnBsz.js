import{F as U}from"./FormFloat-B1KU6-Da.js";import{I}from"./LoadingBtn-D5iP72ir.js";import{m as M,a as D,_ as b,o as l,e as u,g,b as n,d,n as _,h as f,f as N,w as c,K as k,j as y,D as w,c as F,F as B,i as T,T as L,t as E}from"./index-BBoj-WCo.js";import{l as V}from"./loadingStore-B4P190Xb.js";import{s as R}from"./swalStore-DONvkEHU.js";import{F as z}from"./AdminActionBtns-B1p6uOS3.js";var A={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"jiayu",BASE_URL:"/Chocolate-Shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:C,VITE_PATH:v}=A,j={data(){return{isDragfile:!1}},components:{IconLoading:I},props:{returnUrl:{type:Boolean,default:!1},isMultiple:{type:Boolean,default:!1},isLoading:{type:Boolean}},methods:{handleChange(o){this.returnUrl?this.isMultiple?this.uploadMultiImg(o):this.uploadImg(o):this.$emit("emitChange",o)},async uploadImg(o){try{this.loadingStatus.imageUrl=!0;const t=o.target.files[0],i=new FormData;i.append("file-to-upload",t);const p=`${C}/api/${v}/admin/upload`,{data:e}=await this.$http.post(p,i);this.$emit("emitChange",e.imageUrl),this.loadingStatus.imageUrl=!1}catch(t){this.loadingStatus.imageUrl=!1;const i=o.target.closest("dialog");this.apiErrorSwal(t,i)}},async uploadMultiImg(o){try{this.loadingStatus.imagesUrl=!0;const{files:t}=o.target,i=`${C}/api/${v}/admin/upload`,p=Object.values(t).map(async m=>{const s=new FormData;return s.append("file-to-upload",m),(await this.$http.post(i,s)).data.imageUrl}),e=await Promise.all(p);this.$emit("emitChange",e);const a=o.target;a.value="",this.loadingStatus.imagesUrl=!1}catch(t){this.loadingStatus.imagesUrl=!1;const i=o.target.closest("dialog");this.apiErrorSwal(t,i)}},...M(R,["apiErrorSwal"])},computed:{...D(V,["loadingStatus"])}},P=n("i",{class:"bi bi-file-earmark-image-fill text-2xl"},null,-1),H=n("p",null,"請拖曳圖片檔案到此區，或點擊後選取圖片檔案",-1),O={key:0},W=n("p",null,"PNG、JPG、JPEG，檔案大小須為 3MB 以下",-1),G=["multiple","disabled"],J={key:1,class:"absolute w-full h-full bg-primary-50 opacity-80 flex items-center justify-center"};function K(o,t,i,p,e,a){const m=f("IconLoading");return l(),u("label",{ref:"input",for:"imageInput",class:_(["flex flex-col items-center justify-center p-4 text-stone-400 text-center border-4 rounded-md cursor-pointer w-full relative duration-150 text-sm md:text-base hover:bg-stone-100",e.isDragfile?"border-primary-300":"border-stone-300 border-dashed"])},[P,H,i.isMultiple?(l(),u("p",O,"可上傳多個檔案")):g("",!0),W,n("input",{class:"opacity-0 absolute w-full h-full cursor-pointer",type:"file",accept:".png, .jpg, .jpeg",id:"imageInput",ref:"imageFile",title:"",multiple:i.isMultiple,disabled:i.isLoading,onChange:t[0]||(t[0]=(...s)=>a.handleChange&&a.handleChange(...s)),onDragover:t[1]||(t[1]=s=>e.isDragfile=!0),onDrop:t[2]||(t[2]=s=>e.isDragfile=!1),onDragleave:t[3]||(t[3]=s=>e.isDragfile=!1)},null,40,G),i.isLoading?(l(),u("div",J,[d(m,{size:"lg"})])):g("",!0)],2)}const q=b(j,[["render",K]]),Q={data(){return{previews:{},cropperUrl:"",fileName:this.downName,option:{img:"",info:!0,outputSize:1,full:!0,outputType:"png",original:!1,canScale:!1,canMove:!1,canMoveBox:!0,autoCrop:!0,autoCropWidth:750,autoCropHeight:500,centerBox:!0,high:!0,maxImgSize:99999,mode:"contain"},fixed:!0,fixedNumber:[4,3]}},components:{FormFloat:U,FileInput:q,FormModal:z},props:{downName:String},watch:{downName(){this.fileName=this.downName}},methods:{upload(o){if(o.target.files.length){const t=o.target.files[0],i=new FileReader;i.onload=p=>{const e=window.URL.createObjectURL(new Blob([p.target.result]));this.option.img=e},i.readAsArrayBuffer(t)}},download(){const o=document.createElement("a");o.download=this.fileName,this.$refs.cropper.getCropBlob(t=>{this.cropperUrl=window.URL.createObjectURL(t),o.href=this.cropperUrl,o.click()})},clear(){this.option.img=""}}},X=n("i",{class:"bi bi-scissors mr-1"},null,-1),Y=n("p",{class:"mb-2"},"請選擇圖片檔案或貼上圖片網址：",-1),Z=n("i",{class:"bi bi-x text-xl"},null,-1),$=[Z],ee={key:0,class:"w-full h-[200px] md:h-[400px]"},te={class:"flex mt-5"};function oe(o,t,i,p,e,a){const m=f("FileInput"),s=f("FormFloat"),x=f("VueCropper"),S=f("FormModal");return l(),u(B,null,[n("button",{type:"button",class:"btn btn-primary-light",onClick:t[0]||(t[0]=r=>o.$refs.cropperModal.showModal())},[X,N("裁剪圖片小工具 ")]),d(S,{ref:"cropperModal",target:"cropperModal",onResetForm:a.clear},{title:c(({titleClass:r})=>[n("h3",{class:_(r)},"裁剪圖片小工具",2)]),default:c(()=>[Y,d(m,{onEmitChange:a.upload,class:"mb-3"},null,8,["onEmitChange"]),d(s,{"label-for":"imgUrl",label:"圖片網址",class:"mb-3"},k({default:c(({inputClass:r})=>[y(n("input",{type:"text",name:"圖片",id:"imgUrl",class:_(r),"onUpdate:modelValue":t[1]||(t[1]=h=>e.option.img=h),placeholder:""},null,2),[[w,e.option.img]])]),_:2},[e.option.img?{name:"icon",fn:c(({iconClass:r})=>[n("button",{type:"button",class:_(r),onClick:t[2]||(t[2]=(...h)=>a.clear&&a.clear(...h))},$,2)]),key:"0"}:void 0]),1024),e.option.img?(l(),u("div",ee,[d(x,{ref:"cropper",img:e.option.img,"center-wrapper":"","output-size":e.option.outputSize,"output-type":e.option.outputType,info:e.option.info,full:e.option.full,fixed:e.fixed,"fixed-number":e.fixedNumber,"can-move":e.option.canMove,"can-move-box":e.option.canMoveBox,"can-scale":e.option.canScale,original:e.option.original,"auto-crop":e.option.autoCrop,autoCropWidth:e.option.autoCropWidth,autoCropHeight:e.option.autoCropHeight,"center-box":e.option.centerBox,high:e.option.high,"max-img-size":e.option.maxImgSize,mode:e.option.mode},null,8,["img","output-size","output-type","info","full","fixed","fixed-number","can-move","can-move-box","can-scale","original","auto-crop","autoCropWidth","autoCropHeight","center-box","high","max-img-size","mode"])])):g("",!0),n("div",te,[e.option.img?(l(),F(s,{key:0,"label-for":"fileName",label:"下載的檔案名稱",class:"flex-grow"},{default:c(({inputClass:r})=>[y(n("input",{type:"text",name:"檔案名稱",id:"fileName",class:_(["rounded-r-none",r]),"onUpdate:modelValue":t[3]||(t[3]=h=>e.fileName=h),placeholder:""},null,2),[[w,e.fileName]])]),_:1})):g("",!0),e.option.img?(l(),u("button",{key:1,type:"button",class:"btn btn-primary rounded-l-none text-nowrap",onClick:t[4]||(t[4]=(...r)=>a.download&&a.download(...r))},"下載")):g("",!0)])]),_:1},8,["onResetForm"])],64)}const _e=b(Q,[["render",oe]]),ie={};function ne(o,t){return l(),F(L,{name:"fade","enter-active-class":"animate__animated animate__fadeIn animate__faster","leave-active-class":"animate__animated animate__fadeOut animate__faster",onAfterLeave:t[0]||(t[0]=i=>o.$emit("onAfterLeave"))},{default:c(()=>[T(o.$slots,"default")]),_:3})}const ae=b(ie,[["render",ne]]),se={data(){return{isCopy:!1,isFail:!1}},components:{TransitionFade:ae},props:{text:{type:String},msg:{type:String}},methods:{async copy(o){try{await navigator.clipboard.writeText(o),this.isFail=!1,this.isCopy=!0,setTimeout(()=>{this.isCopy=!1},700)}catch{this.isFail=!0}}}},re={class:"relative"},le=n("i",{class:"bi bi-copy"},null,-1),pe={key:0,class:"isolate absolute bottom-full right-0 p-1 m-1 bg-primary-100 text-primary-800 rounded z-10 text-nowrap text-sm shadow-sm"};function ue(o,t,i,p,e,a){const m=f("TransitionFade");return l(),u("button",{type:"button",onClick:t[0]||(t[0]=s=>a.copy(i.text))},[n("div",re,[le,d(m,null,{default:c(()=>[e.isCopy?(l(),u("div",pe,E(e.isFail?"複製失敗":`已複製${i.msg}`),1)):g("",!0)]),_:1})])])}const be=b(se,[["render",ue]]);export{be as C,q as F,_e as a};
