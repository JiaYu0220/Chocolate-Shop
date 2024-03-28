import{m as g,a as U,_ as I,o as u,c as A,w as i,b as e,n as p,d as n,j as y,D as T,e as f,t as m,g as D,I as E,r as M,f as R,J as j,F as w,h as _}from"./index-Qo5PjSfa.js";import{P as B}from"./PaginationComponent-YA4tJXtS.js";import{l as S}from"./loadingStore--S7_x2aB.js";import{F as N,C as J,T as L,A as z}from"./AdminActionBtns-Di01mAlA.js";import{s as P}from"./swalStore-CDhF8vg1.js";import{h as q}from"./helperStore-BQQjkx9F.js";import{F as G}from"./FormFloat-yDZpGOgV.js";import{v as H}from"./validateStore-C4d01oMI.js";import"./XBtn-DwqEF5HU.js";import"./scrollStore-DSjfpGxi.js";import"./LoadingBtn-DWsPix3f.js";const K={components:{FormModal:N,FormFloat:G,ChecksRadio:J,TableComponent:L},props:{order:Object,pagination:Object},data(){return{tempOrder:{},orderDate:"",coupon:null}},watch:{order(){this.init()}},methods:{init(){var r,t,d,V;if(this.tempOrder=this.order,(r=this.tempOrder)!=null&&r.products){const s=Object.values((t=this.tempOrder)==null?void 0:t.products);this.coupon=s[0].coupon.title}this.tempOrder.total=Math.floor((d=this.tempOrder)==null?void 0:d.total),this.orderDate=this.timestampToDate((V=this.order)==null?void 0:V.create_at)},showModal(){this.$refs.orderFormModal.showModal()},closeModal(){this.$refs.orderFormModal.closeModal()},resetModalForm(){this.$refs.orderForm.resetForm()},async modalPutOrder(){this.tempOrder.total=this.total,this.closeModal(),this.$emit("putOrder",this.tempOrder),this.resetModalForm()},...g(P,["swalToast"]),...g(S,["showLoading","hideLoading"]),...g(H,["isPhone"]),...g(q,["timestampToDate"])},computed:{total(){return Object.values(this.tempOrder.products).reduce((t,d)=>t+d.product.price*d.qty,0)},...U(S,["loadingStatus"])}},Q=e("h4",{class:"text-xl font-bold text-primary-800 mb-3"},"訂單資訊",-1),W={class:"flex gap-3 mb-3"},X={class:"w-1/2"},Y={class:"w-1/2"},Z={key:0,class:"text-primary-800"},ee={class:"mb-6"},te=e("h4",{class:"text-xl font-bold text-primary-800 mb-3"},"客戶資訊",-1),oe={class:"flex flex-col gap-3 mb-6"},se=e("h4",{class:"text-xl font-bold text-primary-800 mb-3"},"訂單產品",-1),re=e("th",{scope:"col"}," 產品 ",-1),le=e("th",{scope:"col",class:"min-w-10"}," 數量 ",-1),ae=e("th",{scope:"col",class:"min-w-8 text-end"}," 小計 ",-1),ne={class:"flex items-center gap-2"},de={class:"w-12 h-9 overflow-hidden rounded-sm"},ie=["src"],me=["id","onUpdate:modelValue"],ce=["value"],pe={class:"text-end"},ue={class:"border-none"},he={colspan:"3",class:"py-2 text-end md:pr-4"},_e={class:"mt-5 text-end"},be=e("button",{type:"submit",class:"btn btn-primary"}," 儲存編輯",-1);function fe(r,t,d,V,s,c){const b=_("FormFloat"),v=_("ChecksRadio"),O=_("VField"),F=_("TableComponent"),$=_("VForm"),a=_("FormModal");return u(),A(a,{target:"order",ref:"orderFormModal",onResetForm:c.resetModalForm},{title:i(({titleClass:h})=>[e("h3",{class:p(h)},"編輯訂單",2)]),default:i(()=>[Object.keys(s.tempOrder).length!==0?(u(),A($,{key:0,ref:"orderForm",onSubmit:c.modalPutOrder},{default:i(({errors:h})=>[Q,e("div",W,[e("div",X,[n(b,{"label-for":"date",label:"訂單日期"},{default:i(({inputClass:l})=>[y(e("input",{type:"text",name:"訂單日期",id:"date","onUpdate:modelValue":t[0]||(t[0]=o=>s.orderDate=o),class:p(l),readonly:""},null,2),[[T,s.orderDate]])]),_:1})]),e("div",Y,[n(b,{"label-for":"total",label:"總額"},{default:i(({inputClass:l})=>[y(e("input",{type:"number",name:"總額",id:"total","onUpdate:modelValue":t[1]||(t[1]=o=>s.tempOrder.total=o),class:p(l),readonly:""},null,2),[[T,s.tempOrder.total,void 0,{number:!0}]])]),_:1}),s.coupon?(u(),f("p",Z," 使用優惠券 "+m(s.coupon),1)):D("",!0)])]),e("div",ee,[n(v,{"label-for":"is_paid",label:"是否付款"},{default:i(({inputClass:l})=>[y(e("input",{type:"checkbox",name:"是否付款",id:"is_paid","onUpdate:modelValue":t[2]||(t[2]=o=>s.tempOrder.is_paid=o),class:p(l)},null,2),[[E,s.tempOrder.is_paid]])]),_:1})]),te,e("div",oe,[n(b,{"label-for":"userName",label:"姓名",errors:h},{default:i(({inputClass:l})=>[n(O,{type:"text",name:"姓名",id:"userName",modelValue:s.tempOrder.user.name,"onUpdate:modelValue":t[3]||(t[3]=o=>s.tempOrder.user.name=o),class:p(l),rules:"required",placeholder:""},null,8,["modelValue","class"])]),_:2},1032,["errors"]),n(b,{"label-for":"userTel",label:"手機號碼",errors:h},{default:i(({inputClass:l})=>[n(O,{type:"tel",name:"手機號碼",id:"userTel",modelValue:s.tempOrder.user.tel,"onUpdate:modelValue":t[4]||(t[4]=o=>s.tempOrder.user.tel=o),class:p(l),rules:r.isPhone,placeholder:""},null,8,["modelValue","class","rules"])]),_:2},1032,["errors"]),n(b,{"label-for":"userEmail",label:"電子信箱",errors:h},{default:i(({inputClass:l})=>[n(O,{type:"email",name:"電子信箱",id:"userEmail",modelValue:s.tempOrder.user.email,"onUpdate:modelValue":t[5]||(t[5]=o=>s.tempOrder.user.email=o),class:p(l),rules:"email|required",placeholder:""},null,8,["modelValue","class"])]),_:2},1032,["errors"]),n(b,{"label-for":"userAddress",label:"地址",errors:h},{default:i(({inputClass:l})=>[n(O,{type:"text",name:"地址",id:"userAddress",modelValue:s.tempOrder.user.address,"onUpdate:modelValue":t[6]||(t[6]=o=>s.tempOrder.user.address=o),class:p(l),rules:"required",placeholder:""},null,8,["modelValue","class"])]),_:2},1032,["errors"]),n(b,{"label-for":"message",label:"備註",errors:h},{default:i(({inputClass:l})=>[y(e("textarea",{type:"text",name:"備註",id:"message","onUpdate:modelValue":t[7]||(t[7]=o=>s.tempOrder.message=o),class:p(l),placeholder:""},null,2),[[T,s.tempOrder.message]])]),_:2},1032,["errors"]),se,n(F,{class:"mb-8"},{th:i(()=>[re,le,ae]),tr:i(({trClass:l})=>[(u(!0),f(w,null,M(d.order.products,o=>(u(),f("tr",{class:p(l),key:o.id},[e("td",null,[e("div",ne,[e("div",de,[e("img",{lazy:"loading",src:o.product.imageUrl,alt:"產品圖"},null,8,ie)]),R(" "+m(o.product.title),1)])]),e("td",null,[y(e("select",{class:"form-control",name:"qty",id:`${o.id}qty`,"onUpdate:modelValue":x=>o.qty=x},[(u(),f(w,null,M(20,x=>e("option",{key:`${o.id}${x}`,value:x},m(x),9,ce)),64))],8,me),[[j,o.qty,void 0,{number:!0}]])]),e("td",pe,m(o.product.price*o.qty),1)],2))),128)),e("tr",ue,[e("td",he,"總計："+m(c.total),1)])]),_:1}),e("div",_e,[e("button",{type:"button",class:"btn btn-outline-primary me-3",onClick:t[8]||(t[8]=l=>{c.closeModal(),c.resetModalForm()})}," 取消編輯"),be])])]),_:1},8,["onSubmit"])):D("",!0)]),_:1},8,["onResetForm"])}const ge=I(K,[["render",fe]]);var Oe={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"jiayu",BASE_URL:"/Chocolate-Shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:k,VITE_PATH:C}=Oe,ye={components:{TableComponent:L,PaginationComponent:B,OrderModal:ge,AdminActionBtns:z},data(){return{orders:[],tempOrder:{},tempUser:{},pagination:{}}},mounted(){this.showLoading(),this.getAdminOrders()},methods:{handleTelLink(r){let t=r.replace(/[^\d]/g,"").substring(1);return t[0]!=="9"&&(t=t.replace(/(\d{1})(\d{8})/,"$1-$2")),t=`tel:+886-${t}`,t},async getAdminOrders(r=1){try{const t=`${k}/api/${C}/admin/orders?page=${r}`,d=await this.$http.get(t);this.orders=d.data.orders,this.pagination=d.data.pagination,this.hideLoading()}catch(t){this.hideLoading(),this.apiErrorSwal(t)}},async delOrder(r){try{if((await this.delSwal("訂單編號",r.num)).isConfirmed){this.loadingStatus.orderId=r.id;const d=`${k}/api/${C}/admin/order/${r.id}`;await this.$http.delete(d),this.getAdminOrders(),this.swalToast(`已刪除編號「${r.num}」訂單`),this.loadingStatus.orderId=""}}catch(t){this.loadingStatus.orderId="",this.apiErrorSwal(t)}},async putOrder(r){try{this.loadingStatus.orderId=r.id;const t=`${k}/api/${C}/admin/order/${r.id}`,d=`已修改編號「${r.num}」訂單`;await this.$http.put(t,{data:r}),this.getAdminOrders(),this.swalToast(d),this.loadingStatus.orderId=""}catch(t){this.loadingStatus.orderId="",this.apiErrorSwal(t)}},openModal(r){this.tempOrder=JSON.parse(JSON.stringify(r)),this.$refs.orderModal.showModal()},...g(P,["delSwal","swalToast","apiErrorSwal"]),...g(S,["showLoading","hideLoading"]),...g(q,["timestampToDate"])},computed:{...U(S,["isLoading","loadingStatus"])}},xe=e("h2",{class:"text-2xl font-bold mb-8"},"訂單管理",-1),we=e("th",{scope:"col"},"#",-1),Ve=e("th",{scope:"col"},"客戶",-1),Me=e("th",{scope:"col"},"連絡",-1),Se=e("th",{scope:"col",class:"min-w-15"},"品項",-1),ve=e("th",{scope:"col",class:"text-end text-nowrap"},"總額",-1),Fe=e("th",{scope:"col",class:"min-w-15 text-nowrap"},"備註",-1),$e=e("th",{scope:"col"},"日期",-1),Te=e("th",{scope:"col"},"付款",-1),ke=e("th",{scope:"col"},null,-1),Ce={class:"py-2 pr-1"},Ae={class:"text-center md:text-start"},De=["href"],Ue={class:"hidden md:inline"},Ie=e("i",{class:"bi bi-envelope-arrow-up-fill text-primary-700 md:hidden"},null,-1),Ee=["href"],Le={class:"hidden md:inline"},Pe=e("i",{class:"bi bi-telephone-outbound-fill text-primary-700 md:hidden"},null,-1),qe={class:"text-end"},Re={class:"line-clamp-5"},je={class:"hidden md:inline"},Be={class:"md:hidden"},Ne=["for"],Je=["id","onUpdate:modelValue","disabled","onChange"],ze=e("div",{class:"w-4 h-4 flex items-center justify-center bg-primary-50 text-primary-800 border border-primary-800 rounded-full ml-[50%] transition-all duration-150 bg-icon-x bg-center bg-no-repeat peer-checked:bg-icon-check peer-checked:ml-[0%] peer-checked:border-primary-300 peer-disabled:border-stone-300"},null,-1);function Ge(r,t,d,V,s,c){const b=_("AdminActionBtns"),v=_("TableComponent"),O=_("PaginationComponent"),F=_("OrderModal");return u(),f(w,null,[xe,n(v,{class:"mb-8 text-xs sm:text-sm md:text-base"},{th:i(()=>[we,Ve,Me,Se,ve,Fe,$e,Te,ke]),tr:i(({trClass:$})=>[(u(!0),f(w,null,M(s.orders,(a,h)=>(u(),f("tr",{class:p($),key:a.id},[e("td",null,m(a.num),1),e("td",Ce,[e("p",null,m(a.user.name),1)]),e("td",Ae,[e("a",{class:"link inline-block after:bottom-0 before:bottom-0",href:`mailto:${a.user.email}`},[e("span",Ue,m(a.user.email),1),Ie],8,De),e("a",{class:"link inline-block after:bottom-0 before:bottom-0",href:c.handleTelLink(a.user.tel)},[e("span",Le,m(a.user.tel),1),Pe],8,Ee)]),e("td",null,[(u(!0),f(w,null,M(a.products,(l,o)=>(u(),f("p",{key:o},m(`${l.product.title} * ${l.qty}`),1))),128))]),e("td",qe,m(Math.floor(a.total)),1),e("td",null,[e("span",Re,m(a.message),1)]),e("td",null,[e("span",je,m(r.timestampToDate(a.create_at)),1),e("span",Be,m(r.timestampToDate(a.create_at).substring(5)),1)]),e("td",null,[e("label",{for:`paidStatus${h}`,class:"inline-flex w-8 h-4 items-center cursor-pointer bg-primary-800 rounded-full transition-all duration-150 has-[:checked]:bg-primary-300 has-[:disabled]:bg-stone-300 has-[:disabled]:cursor-default"},[y(e("input",{type:"checkbox",id:`paidStatus${h}`,class:"hidden peer","onUpdate:modelValue":l=>a.is_paid=l,disabled:r.loadingStatus.orderId===a.id,onChange:l=>c.putOrder(a)},null,40,Je),[[E,a.is_paid]]),ze],8,Ne)]),e("td",null,[n(b,{data:a,loadingId:"orderId",onOpenModal:c.openModal,onDelItem:c.delOrder},null,8,["data","onOpenModal","onDelItem"])])],2))),128))]),_:1}),n(O,{pagination:s.pagination,onGetData:c.getAdminOrders},null,8,["pagination","onGetData"]),n(F,{ref:"orderModal",order:s.tempOrder,pagination:s.pagination,onPutOrder:c.putOrder},null,8,["order","pagination","onPutOrder"])],64)}const rt=I(ye,[["render",Ge]]);export{rt as default};