import{s as f,H as i,I as m}from"./index-hIBv_cFW.js";import{s as C}from"./swalStore-BXANR3GM.js";import{l as g}from"./loadingStore-DNIkVO7R.js";var w={VITE_URL:"https://ec-course-api.hexschool.io/v2",VITE_PATH:"jiayu",BASE_URL:"/Chocolate-Shop/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{$swal:c}=m.variables,{VITE_URL:n,VITE_PATH:l}=w,{swalToast:p,delSwal:y}=C(),{loadingStatus:e,hideLoading:_}=g(),I=f("cartStore",{state:()=>({carts:[],orders:[],cartNum:0,total:0,final_total:0,usedCoupon:"",timer:0}),actions:{async getCart(){var r,s,a,t,u,h;try{const d=`${n}/api/${l}/cart`,{data:o}=await i.get(d);this.carts=(r=o==null?void 0:o.data)==null?void 0:r.carts,this.cartNum=(s=this.carts)==null?void 0:s.length,this.usedCoupon=(t=(a=this.carts[0])==null?void 0:a.coupon)==null?void 0:t.code,this.total=(u=o==null?void 0:o.data)==null?void 0:u.total,this.final_total=Math.floor((h=o==null?void 0:o.data)==null?void 0:h.final_total)}catch(d){_();const{message:o}=d.response.data;c(Array.isArray(o)?o[0]:o)}},async postCart(r,s=1){try{e.productId=r;const a=`${n}/api/${l}/cart`,t={product_id:r,qty:s};await i.post(a,{data:t}),p("加入購物車"),this.getCart(),e.productId=""}catch(a){const{message:t}=a.response.data;c(Array.isArray(t)?t[0]:t)}},async putCart(r,s){try{e.cartId=r.id;const a=`${n}/api/${l}/cart/${r.id}`,t={product_id:r.product_id,qty:s};await i.put(a,{data:t}),this.getCart(),e.cartId=""}catch(a){const{message:t}=a.response.data;c(Array.isArray(t)?t[0]:t)}},debouncePutCart(r,s){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.putCart(r,s)},300)},async delCart(r,s="body"){try{if((await y("購物車中",r.product.title,s)).isConfirmed){e.cartId=r.id;const t=`${n}/api/${l}/cart/${r.id}`;await i.delete(t),p(`已刪除 ${r.product.title}`,s),this.getCart(),e.cartId=""}}catch(a){const{message:t}=a.response.data;c(Array.isArray(t)?t[0]:t)}},async delAllCart(r="body"){try{if((await y("購物車中","全部項目",r)).isConfirmed){const a=`${n}/api/${l}/carts`;await i.delete(a),p("已清空購物車",r),this.getCart()}}catch(s){const{message:a}=s.response.data;c(Array.isArray(a)?a[0]:a)}},async postCoupon(r,s){try{e.newCoupon=!0;const a=`${n}/api/${l}/coupon`,t=await i.post(a,{data:{code:r}});this.final_total=Math.floor(t.data.data.final_total),this.usedCoupon=r,e.newCoupon=!1}catch(a){e.newCoupon=!1;const{message:t}=a.response.data;c({title:Array.isArray(t)?t[0]:t,target:s})}}}});export{I as c};
