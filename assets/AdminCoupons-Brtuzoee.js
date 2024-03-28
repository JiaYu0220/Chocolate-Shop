import{m as f,a as E,_ as L,o as _,c as D,w as i,b as e,t as g,n as m,d as s,j as x,I as k,h as l,e as C,F as y,g as $,f as T,r as B}from"./index-Qo5PjSfa.js";import{P as R}from"./PaginationComponent-YA4tJXtS.js";import{l as w}from"./loadingStore--S7_x2aB.js";import{F as P,C as U,T as N,A as O}from"./AdminActionBtns-Di01mAlA.js";import{s as I}from"./swalStore-CDhF8vg1.js";import{L as q}from"./LoadingBtn-DWsPix3f.js";import{h as j}from"./helperStore-BQQjkx9F.js";import{A as H}from"./ActiveBadge-BSIVsGzU.js";import{F as G}from"./FormFloat-yDZpGOgV.js";import"./XBtn-DwqEF5HU.js";import"./scrollStore-DSjfpGxi.js";var z={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"jiayu",BASE_URL:"/Chocolate-Shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:W,VITE_PATH:J}=z,K={components:{FormModal:P,FormFloat:G,ChecksRadio:U},props:{coupon:Object,isNew:Boolean,pagination:Object},data(){return{tempCoupon:{}}},mounted(){this.tempCoupon=this.coupon},watch:{coupon(){this.tempCoupon=this.coupon,String(this.tempCoupon.due_date).length===10&&(this.tempCoupon.due_date*=1e3)}},methods:{showModal(){this.$refs.couponFormModal.showModal()},closeModal(){this.$refs.couponFormModal.closeModal()},resetModalForm(){this.$refs.couponForm.resetForm()},async updateCoupon(){try{let t=`${W}/api/${J}/admin/coupon`,o="post",d=1;this.tempCoupon.code=this.tempCoupon.code.toUpperCase();const b=`已${this.isNew?"新增":"更新"}優惠券「${this.tempCoupon.title}」`;String(this.tempCoupon.due_date).length===13&&(this.tempCoupon.due_date=Math.floor(this.tempCoupon.due_date/1e3)),this.isNew?this.loadingStatus.newCoupon=!0:(t+=`/${this.tempCoupon.id}`,o="put",d=this.pagination.current_page,this.loadingStatus.couponId=this.tempCoupon.id),this.closeModal(),await this.$http[o](t,{data:this.tempCoupon}),this.resetModalForm(),this.$emit("getData",d),this.loadingStatus.couponId="",this.loadingStatus.newCoupon=!1,this.swalToast(b)}catch(t){this.loadingStatus.couponId="",this.loadingStatus.newCoupon=!1,this.apiErrorSwal(t)}},...f(I,["swalToast","apiErrorSwal"]),...f(w,["showLoading","hideLoading"])},computed:{...E(w,["loadingStatus"])}},Q={class:"flex flex-col gap-6 h-full"},X=e("p",{class:"text-stone-500 mt-1"},"※ 優惠碼英文小寫將會被轉成大寫",-1),Y={class:"flex gap-3"},Z={class:"w-1/3"},oo={class:"w-2/3"},eo={class:"mt-5 text-end"},to=e("button",{type:"submit",class:"btn btn-primary"}," 儲存編輯",-1);function no(t,o,d,b,a,p){const h=l("VField"),c=l("FormFloat"),M=l("VueDatePicker"),S=l("ChecksRadio"),V=l("VForm"),F=l("FormModal");return _(),D(F,{target:"coupon",ref:"couponFormModal",onResetForm:p.resetModalForm},{title:i(({titleClass:r})=>[e("h3",{class:m(r)},g(d.isNew?"新增":"編輯")+"優惠券",3)]),default:i(()=>[s(V,{ref:"couponForm",onSubmit:p.updateCoupon},{default:i(({errors:r})=>[e("div",Q,[s(c,{"label-for":"title",label:"名稱",errors:r},{default:i(({inputClass:n})=>[s(h,{type:"text",name:"名稱",id:"title",modelValue:a.tempCoupon.title,"onUpdate:modelValue":o[0]||(o[0]=u=>a.tempCoupon.title=u),class:m(n),rules:"required",placeholder:"",required:""},null,8,["modelValue","class"])]),_:2},1032,["errors"]),e("div",null,[s(c,{"label-for":"code",label:"優惠碼",errors:r},{default:i(({inputClass:n})=>[s(h,{type:"text",name:"優惠碼",id:"code",modelValue:a.tempCoupon.code,"onUpdate:modelValue":o[1]||(o[1]=u=>a.tempCoupon.code=u),class:m(n),rules:"required",placeholder:"",required:""},null,8,["modelValue","class"])]),_:2},1032,["errors"]),X]),e("div",Y,[e("div",Z,[s(c,{"label-for":"percent",label:"折扣 (%)",errors:r},{default:i(({inputClass:n})=>[s(h,{type:"number",min:"0",step:"5",name:"折扣 (%)",id:"percent",modelValue:a.tempCoupon.percent,"onUpdate:modelValue":o[2]||(o[2]=u=>a.tempCoupon.percent=u),modelModifiers:{number:!0},class:m(n),rules:"required",placeholder:"",required:""},null,8,["modelValue","class"])]),_:2},1032,["errors"])]),e("div",oo,[s(c,{"label-for":"due_date",label:"期限"},{default:i(()=>[s(M,{modelValue:a.tempCoupon.due_date,"onUpdate:modelValue":o[3]||(o[3]=n=>a.tempCoupon.due_date=n),"model-type":"timestamp","enable-time-picker":!1,format:"yyyy/MM/dd",locale:"zh-TW","day-names":["一","二","三","四","五","六","日"],"hide-input-icon":"",clearable:!1,"teleport-center":"","auto-apply":"",required:""},null,8,["modelValue"])]),_:1})])]),s(S,{"label-for":"is_enable",label:"是否啟用"},{default:i(({inputClass:n})=>[x(e("input",{id:"is_enable",class:m(n),type:"checkbox","onUpdate:modelValue":o[4]||(o[4]=u=>a.tempCoupon.is_enable=u)},null,2),[[k,a.tempCoupon.is_enable]])]),_:1}),e("div",eo,[e("button",{type:"button",class:"btn btn-outline-primary me-3",onClick:o[5]||(o[5]=n=>{p.closeModal(),p.resetModalForm()})}," 取消編輯"),to])])]),_:1},8,["onSubmit"])]),_:1},8,["onResetForm"])}const ao=L(K,[["render",no]]);var so={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"jiayu",BASE_URL:"/Chocolate-Shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:A,VITE_PATH:v}=so,io={components:{TableComponent:N,PaginationComponent:R,AdminActionBtns:O,ActiveBadge:H,CouponModal:ao,LoadingBtn:q},data(){return{coupons:[],tempCoupon:{},isNew:!1,pagination:{}}},mounted(){this.showLoading(),this.getAdminCoupons()},methods:{async getAdminCoupons(t=1){try{const o=`${A}/api/${v}/admin/coupons?page=${t}`,d=await this.$http.get(o);this.coupons=d.data.coupons,this.pagination=d.data.pagination,this.hideLoading()}catch(o){this.hideLoading(),this.apiErrorSwal(o)}},async delCoupon(t){try{if((await this.delSwal("優惠券",t.title)).isConfirmed){this.loadingStatus.couponId=t.id;const d=`${A}/api/${v}/admin/coupon/${t.id}`;await this.$http.delete(d),this.getAdminCoupons(),this.swalToast(`已刪除優惠券「${t.title}」`),this.loadingStatus.couponId=""}}catch(o){this.loadingStatus.couponId="",this.apiErrorSwal(o)}},openModal(t,o){switch(t){case"new":this.tempCoupon={is_enabled:0,due_date:new Date().getTime()},this.isNew=!0;break;case"edit":this.tempCoupon={...o},this.isNew=!1;break}this.$refs.couponModal.showModal()},...f(I,["delSwal","swalToast","apiErrorSwal"]),...f(w,["showLoading","hideLoading"]),...f(j,["timestampToDate"])},computed:{...E(w,["isLoading","loadingStatus"])}},lo={class:"flex justify-between items-center mb-8"},po=e("h2",{class:"text-2xl font-bold"},"優惠券管理",-1),ro={key:0,class:"bi bi-plus-lg me-1"},uo=e("th",{scope:"col"},"名稱",-1),co=e("th",{scope:"col"},"折扣 (%)",-1),mo=e("th",{scope:"col"},"優惠碼",-1),ho=e("th",{scope:"col"},"期限",-1),_o=e("th",{scope:"col"},"啟用",-1);function go(t,o,d,b,a,p){const h=l("LoadingBtn"),c=l("ActiveBadge"),M=l("AdminActionBtns"),S=l("TableComponent"),V=l("PaginationComponent"),F=l("CouponModal");return _(),C(y,null,[e("div",lo,[po,s(h,{class:"btn btn-primary",isLoading:t.loadingStatus.newCoupon,onClick:o[0]||(o[0]=r=>p.openModal("new"))},{default:i(()=>[t.loadingStatus.newCoupon?$("",!0):(_(),C("i",ro)),T("新增優惠券 ")]),_:1},8,["isLoading"])]),s(S,{class:"mb-8 table-auto"},{th:i(()=>[uo,co,mo,ho,_o]),tr:i(({trClass:r})=>[(_(!0),C(y,null,B(a.coupons,n=>(_(),C("tr",{class:m(r),key:n.id},[e("td",null,g(n.title),1),e("td",null,g(n.percent),1),e("td",null,g(n.code),1),e("td",null,g(t.timestampToDate(n.due_date)),1),e("td",null,[s(c,{active:n.is_enabled},{trueMsg:i(()=>[T("啟用")]),falseMsg:i(()=>[T("未啟用")]),_:2},1032,["active"])]),e("td",null,[s(M,{data:n,loadingId:"couponId",onOpenModal:p.openModal,onDelItem:p.delCoupon},null,8,["data","onOpenModal","onDelItem"])])],2))),128))]),_:1}),s(V,{pagination:a.pagination,onGetData:p.getAdminCoupons},null,8,["pagination","onGetData"]),s(F,{ref:"couponModal",coupon:a.tempCoupon,"is-new":a.isNew,pagination:a.pagination,onGetData:p.getAdminCoupons},null,8,["coupon","is-new","pagination","onGetData"])],64)}const vo=L(io,[["render",go]]);export{vo as default};