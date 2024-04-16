import GlobalVariables from '@/GlobalVariableHolder';
import { defineStore } from 'pinia';
import axios from 'axios';
import swalStore from './swalStore';
import loadingStore from './loadingStore';

const { $swal } = GlobalVariables.variables;

const { VITE_URL, VITE_PATH } = import.meta.env;
const { swalToast, delSwal } = swalStore();
const { loadingStatus, hideLoading } = loadingStore();

export default defineStore('cartStore', {
  state: () => ({
    carts: [],
    orders: [],
    cartNum: 0,
    total: 0,
    final_total: 0,
    usedCoupon: '',
    timer: 0,
  }),
  actions: {
    async getCart() {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/cart`;
        const { data } = await axios.get(url);
        this.carts = data?.data?.carts;
        this.cartNum = this.carts?.length;
        this.usedCoupon = this.carts[0]?.coupon?.code;
        this.total = data?.data?.total;
        this.final_total = Math.floor(data?.data?.final_total);
      } catch (error) {
        hideLoading();
        // 通知
        const { message } = error.response.data;
        $swal(Array.isArray(message) ? message[0] : message);
      }
    },
    async postCart(productId, qty = 1) {
      try {
        loadingStatus.productId = productId;

        const url = `${VITE_URL}/api/${VITE_PATH}/cart`;

        const data = {
          product_id: productId,
          qty,
        };
        await axios.post(url, { data });
        swalToast('加入購物車');
        this.getCart();

        loadingStatus.productId = '';
      } catch (error) {
        // 通知
        const { message } = error.response.data;
        $swal(Array.isArray(message) ? message[0] : message);
      }
    },
    async putCart(item, qty) {
      try {
        loadingStatus.cartId = item.id;

        const url = `${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`;

        const data = {
          product_id: item.product_id,
          qty,
        };

        await axios.put(url, { data });
        this.getCart();

        loadingStatus.cartId = '';
      } catch (error) {
        // 通知
        const { message } = error.response.data;
        $swal(Array.isArray(message) ? message[0] : message);
      }
    },
    debouncePutCart(item, qty) {
      // 如果在指定秒數內事件再次觸發，就會取消之前的計時器並設置一個新的計時器
      clearTimeout(this.timer);

      // 當指定秒數內沒有新的事件觸發時，即呼叫實際的事件處理函式 func
      this.timer = setTimeout(() => {
        this.putCart(item, qty);
      }, 300);
    },
    async delCart(cart, swalContainer = 'body', hasDelSwal = true) {
      try {
        loadingStatus.cartId = cart.id;
        const url = `${VITE_URL}/api/${VITE_PATH}/cart/${cart.id}`;

        if (hasDelSwal === false) {
          await axios.delete(url);
          swalToast(`已刪除 ${cart.product.title}`, swalContainer);
          this.getCart();

          loadingStatus.cartId = '';
        } else {
          const swal = await delSwal('購物車中', cart.product.title, swalContainer);

          if (swal.isConfirmed) {
            await axios.delete(url);
            swalToast(`已刪除 ${cart.product.title}`, swalContainer);
            this.getCart();
          }
        }
        loadingStatus.cartId = '';
      } catch (error) {
        // 通知
        const { message } = error.response.data;
        $swal(Array.isArray(message) ? message[0] : message);
      }
    },
    async delAllCart(swalContainer = 'body') {
      try {
        const swal = await delSwal('購物車中', '全部項目', swalContainer);
        if (swal.isConfirmed) {
          const url = `${VITE_URL}/api/${VITE_PATH}/carts`;

          await axios.delete(url);

          swalToast('已清空購物車', swalContainer);
          this.getCart();
        }
      } catch (error) {
        // 通知
        const { message } = error.response.data;
        $swal(Array.isArray(message) ? message[0] : message);
      }
    },
    async postCoupon(code, swalContainer) {
      try {
        loadingStatus.newCoupon = true;
        const url = `${VITE_URL}/api/${VITE_PATH}/coupon`;
        const res = await axios.post(url, { data: { code } });
        this.final_total = Math.floor(res.data.data.final_total);
        this.usedCoupon = code;
        loadingStatus.newCoupon = false;
      } catch (error) {
        loadingStatus.newCoupon = false;
        // 通知
        const { message } = error.response.data;
        $swal({
          title: Array.isArray(message) ? message[0] : message,
          target: swalContainer,
        });
      }
    },
  },
});
