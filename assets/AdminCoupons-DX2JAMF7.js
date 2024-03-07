import{m as g,h as L,_ as D,o as _,e as $,w as i,b as o,t as C,n as m,a as l,j as k,l as x,r as d,c as b,F as T,g as E,d as A,k as B}from"./index-CQupeNWV.js";import{M as R,C as P,s as I,T as U,P as N,A as O,L as q,h as j}from"./AdminActionBtns-BfxTWaYK.js";import{l as w}from"./loadingStore-BThw59I3.js";import{A as H}from"./ActiveBadge-BRg0K-J6.js";import{F as G}from"./FormFloat-BA6fetB_.js";var z={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"jiayu",BASE_URL:"/Chocolate-Shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:W,VITE_PATH:J}=z,K={components:{ModalComponent:R,FormFloat:G,ChecksRadio:P},props:{coupon:Object,isNew:Boolean,pagination:Object},data(){return{tempCoupon:{}}},mounted(){this.tempCoupon=this.coupon},watch:{coupon(){this.tempCoupon=this.coupon,String(this.tempCoupon.due_date).length===10&&(this.tempCoupon.due_date*=1e3)}},methods:{showModal(){this.$refs.couponModalComponent.showModal()},closeModal(){this.$refs.couponModalComponent.closeModal()},resetModalForm(){this.$refs.couponForm.resetForm()},async updateCoupon(){var a;try{let e=`${W}/api/${J}/admin/coupon`,t="post",f=1;this.tempCoupon.code=this.tempCoupon.code.toUpperCase();const n=`已${this.isNew?"新增":"更新"}優惠券「${this.tempCoupon.title}」`;String(this.tempCoupon.due_date).length===13&&(this.tempCoupon.due_date=Math.floor(this.tempCoupon.due_date/1e3)),this.isNew?this.loadingStatus.newCoupon=!0:(e+=`/${this.tempCoupon.id}`,t="put",f=this.pagination.current_page,this.loadingStatus.couponId=this.tempCoupon.id),this.closeModal(),await this.$http[t](e,{data:this.tempCoupon}),this.resetModalForm(),this.$emit("getData",f),this.loadingStatus.couponId="",this.loadingStatus.newCoupon=!1,this.swalToast(n)}catch(e){this.loadingStatus.couponId="",this.loadingStatus.newCoupon=!1,this.$swal(((a=e.data)==null?void 0:a.message)||"發生錯誤，請稍後再試")}},...g(I,["swalToast"]),...g(w,["showLoading","hideLoading"])},computed:{...L(w,["loadingStatus"])}},Q={class:"flex flex-col gap-6 h-full"},X=o("p",{class:"text-stone-500 mt-1"},"※ 優惠碼英文小寫將會被轉成大寫",-1),Y={class:"flex gap-3"},Z={class:"w-1/3"},ee={class:"w-2/3"},oe={class:"mt-5 text-end"},te=o("button",{type:"submit",class:"btn btn-primary"}," 儲存編輯",-1);function ne(a,e,t,f,n,p){const h=d("VField"),c=d("FormFloat"),M=d("VueDatePicker"),V=d("ChecksRadio"),y=d("VForm"),S=d("ModalComponent");return _(),$(S,{target:"coupon",ref:"couponModalComponent",onResetForm:p.resetModalForm},{title:i(({titleClass:u})=>[o("h3",{class:m(u)},C(t.isNew?"新增":"編輯")+"優惠券",3)]),default:i(()=>[l(y,{ref:"couponForm",onSubmit:p.updateCoupon},{default:i(({errors:u})=>[o("div",Q,[l(c,{"label-for":"title",label:"名稱",errors:u},{default:i(({inputClass:s})=>[l(h,{type:"text",name:"名稱",id:"title",modelValue:n.tempCoupon.title,"onUpdate:modelValue":e[0]||(e[0]=r=>n.tempCoupon.title=r),class:m(s),rules:"required",placeholder:"",required:""},null,8,["modelValue","class"])]),_:2},1032,["errors"]),o("div",null,[l(c,{"label-for":"code",label:"優惠碼",errors:u},{default:i(({inputClass:s})=>[l(h,{type:"text",name:"優惠碼",id:"code",modelValue:n.tempCoupon.code,"onUpdate:modelValue":e[1]||(e[1]=r=>n.tempCoupon.code=r),class:m(s),rules:"required",placeholder:"",required:""},null,8,["modelValue","class"])]),_:2},1032,["errors"]),X]),o("div",Y,[o("div",Z,[l(c,{"label-for":"percent",label:"折扣 (%)",errors:u},{default:i(({inputClass:s})=>[l(h,{type:"number",min:"0",step:"5",name:"折扣 (%)",id:"percent",modelValue:n.tempCoupon.percent,"onUpdate:modelValue":e[2]||(e[2]=r=>n.tempCoupon.percent=r),modelModifiers:{number:!0},class:m(s),rules:"required",placeholder:"",required:""},null,8,["modelValue","class"])]),_:2},1032,["errors"])]),o("div",ee,[l(c,{"label-for":"due_date",label:"期限"},{default:i(()=>[l(M,{modelValue:n.tempCoupon.due_date,"onUpdate:modelValue":e[3]||(e[3]=s=>n.tempCoupon.due_date=s),"model-type":"timestamp","enable-time-picker":!1,format:"yyyy/MM/dd",locale:"zh-TW","day-names":["一","二","三","四","五","六","日"],"hide-input-icon":"",clearable:!1,"teleport-center":"","auto-apply":"",required:""},null,8,["modelValue"])]),_:1})])]),l(V,{"label-for":"is_enable",label:"是否啟用"},{default:i(({inputClass:s})=>[k(o("input",{id:"is_enable",class:m(s),type:"checkbox","onUpdate:modelValue":e[4]||(e[4]=r=>n.tempCoupon.is_enable=r)},null,2),[[x,n.tempCoupon.is_enable]])]),_:1}),o("div",oe,[o("button",{type:"button",class:"btn btn-outline-primary me-3",onClick:e[5]||(e[5]=s=>{p.closeModal(),p.resetModalForm()})}," 取消編輯"),te])])]),_:1},8,["onSubmit"])]),_:1},8,["onResetForm"])}const se=D(K,[["render",ne]]);var ae={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"jiayu",BASE_URL:"/Chocolate-Shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:v,VITE_PATH:F}=ae,le={components:{TableComponent:U,PaginationComponent:N,AdminActionBtns:O,ActiveBadge:H,CouponModal:se,LoadingBtn:q},data(){return{coupons:[],tempCoupon:{},isNew:!1,pagination:{}}},mounted(){this.showLoading(),this.getAdminCoupons()},methods:{async getAdminCoupons(a=1){try{const e=`${v}/api/${F}/admin/coupons?page=${a}`,t=await this.$http.get(e);this.coupons=t.data.coupons,this.pagination=t.data.pagination}catch(e){const{message:t}=e.response.data;this.$swal(Array.isArray(t)?t[0]:t)}finally{this.hideLoading()}},async delCoupon(a){try{if((await this.delSwal("優惠券",a.title)).isConfirmed){this.loadingStatus.couponId=a.id;const t=`${v}/api/${F}/admin/coupon/${a.id}`;await this.$http.delete(t),this.getAdminCoupons(),this.swalToast(`已刪除優惠券「${a.title}」`),this.loadingStatus.couponId=""}}catch(e){this.loadingStatus.couponId="";const{message:t}=e.response.data;this.$swal(Array.isArray(t)?t[0]:t)}},openModal(a,e){switch(a){case"new":this.tempCoupon={is_enabled:0,due_date:new Date().getTime()},this.isNew=!0;break;case"edit":this.tempCoupon={...e},this.isNew=!1;break}this.$refs.couponModal.showModal()},...g(I,["delSwal","swalToast"]),...g(w,["showLoading","hideLoading"]),...g(j,["handleDate"])},computed:{...L(w,["isLoading","loadingStatus"])}},ie={class:"flex justify-between items-center mb-8"},de=o("h2",{class:"text-2xl font-bold"},"優惠券管理",-1),pe={key:0,class:"bi bi-plus-lg me-1"},ue=o("th",{scope:"col"},"名稱",-1),re=o("th",{scope:"col"},"折扣 (%)",-1),ce=o("th",{scope:"col"},"優惠碼",-1),me=o("th",{scope:"col"},"期限",-1),he=o("th",{scope:"col"},"啟用",-1);function _e(a,e,t,f,n,p){const h=d("LoadingBtn"),c=d("ActiveBadge"),M=d("AdminActionBtns"),V=d("TableComponent"),y=d("PaginationComponent"),S=d("CouponModal");return _(),b(T,null,[o("div",ie,[de,l(h,{class:"btn btn-primary",isLoading:a.loadingStatus.newCoupon,onClick:e[0]||(e[0]=u=>p.openModal("new"))},{default:i(()=>[a.loadingStatus.newCoupon?E("",!0):(_(),b("i",pe)),A("新增優惠券 ")]),_:1},8,["isLoading"])]),l(V,{class:"mb-8 table-auto"},{th:i(()=>[ue,re,ce,me,he]),tr:i(({trClass:u})=>[(_(!0),b(T,null,B(n.coupons,s=>(_(),b("tr",{class:m(u),key:s.id},[o("td",null,C(s.title),1),o("td",null,C(s.percent),1),o("td",null,C(s.code),1),o("td",null,C(a.handleDate(s.due_date)),1),o("td",null,[l(c,{active:s.is_enabled},{trueMsg:i(()=>[A("啟用")]),falseMsg:i(()=>[A("未啟用")]),_:2},1032,["active"])]),o("td",null,[l(M,{data:s,loadingId:"couponId",onOpenModal:p.openModal,onDelItem:p.delCoupon},null,8,["data","onOpenModal","onDelItem"])])],2))),128))]),_:1}),l(y,{pagination:n.pagination,onGetData:p.getAdminCoupons},null,8,["pagination","onGetData"]),l(S,{ref:"couponModal",coupon:n.tempCoupon,"is-new":n.isNew,pagination:n.pagination,onGetData:p.getAdminCoupons},null,8,["coupon","is-new","pagination","onGetData"])],64)}const Me=D(le,[["render",_e]]);export{Me as default};
