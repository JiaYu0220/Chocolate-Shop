<template>
  <h2 class="text-2xl font-bold mb-8">訂單管理</h2>
  <TableComponent class="mb-8">
    <template #th>
      <th>編號</th>
      <th>聯絡人</th>
      <th>地址</th>
      <th>電子郵件</th>
      <th>品項</th>
      <th class="text-end pr-1 md:pr-2">總額</th>
      <th>日期</th>
      <th>付款</th>
      <th>操作</th>
    </template>
    <template #tr>
      <tr v-for="(order, key) in orders" :key="order.id">
          <td class="py-2 pr-1">{{ key + 1 }}</td>
          <td class="py-2 pr-1">
            <p>{{ order.user.name }}</p>
            <a class="link"
            :href="handleTelLink(order.user.tel)">
              <span class="hidden md:inline">{{ order.user.tel }}</span>
              <i class="bi bi-telephone-outbound-fill text-primary-700 md:hidden"></i>
            </a>
          </td>
          <td class="py-2 pr-1">
            <span class="hidden md:inline">{{ order.user.address }}</span>
            <CopyBtn :text="order.user.address" msg="地址" class="text-primary-700 md:hidden"/>
          </td>
          <td class="py-2 pr-1">
            <a class="link" :href="`mailto:${order.user.email}`">
              <span class="hidden md:inline">{{ order.user.email }}</span>
              <i class="bi bi-envelope-arrow-up-fill text-primary-700 md:hidden"></i>
            </a></td>
          <td class="py-2 pr-1">
            <p v-for="(product, key) in order.products" :key="key">
            {{ `${product.product.title} * ${product.qty}` }}
            </p>
          </td>
          <td class="text-end py-2 pr-1 md:pr-2">{{ order.total }}</td>
          <td class="py-2 pr-1">
            <span class="hidden md:inline">{{ handleDate(order.create_at) }}</span>
            <span class="md:hidden">{{ handleDate(order.create_at).substring(5) }}</span>
          </td>
          <td class="py-2 pr-1">
            <label :for="`paidStatus${key}`"
            class="inline-flex w-8 h-4 items-center cursor-pointer
             bg-primary-800 rounded-full transition-all duration-150
             has-[:checked]:bg-primary-300
            has-[:disabled]:bg-stone-300 has-[:disabled]:cursor-default">
             <input type="checkbox" :id="`paidStatus${key}`" class="hidden peer"
              v-model="order.is_paid" :disabled="loadingStatus.orderId === order.id"
              @change="putOrder(order)">
              <div class="w-4 h-4 flex items-center justify-center
              bg-primary-50 text-primary-800 border border-primary-800 rounded-full ml-[50%]
              transition-all duration-150 bg-icon-x bg-center bg-no-repeat
              peer-checked:bg-icon-check peer-checked:ml-[0%] peer-checked:border-primary-300
              peer-disabled:border-stone-300
              ">
              </div>
            </label>
          </td>
          <td class="py-2 pr-1">
            <LoadingBtn class="btn btn-link p-1 md:p-2"
            :is-loading="(loadingStatus.orderId === order.id)"
            @click="delOrder(key+1)">
              <i v-if="loadingStatus.orderId !== order.id" class="bi bi-trash3-fill"></i>
            </LoadingBtn>
          </td>
      </tr>
    </template>
  </TableComponent>
  <PaginationComponent :pagination="pagination" @get-data="getOrders" />
</template>
<script>
import { mapState, mapActions } from 'pinia';
import PaginationComponent from '@/components/shared/pagination/PaginationComponent.vue';
import CopyBtn from '@/components/shared/button/CopyBtn.vue';
import loadingStore from '@/stores/loadingStore';
import TableComponent from '@/components/shared/table/TableComponent.vue';
import swalStore from '@/stores/swalStore';
import LoadingBtn from '@/components/shared/button/LoadingBtn.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      orders: [],
      pagination: {},
    };
  },
  components: {
    TableComponent, LoadingBtn, PaginationComponent, CopyBtn,
  },
  mounted() {
    this.showLoading();
    this.getOrders();
  },
  methods: {
    handleTelLink(tel) {
      let result = tel.replace(/[^\d]/g, '').substring(1); // 移除非數字字符，並將第一個號碼0去除
      if (result[0] !== '9') {
        // 市話的區碼後面要加"-"
        result = result.replace(/(\d{1})(\d{8})/, '$1-$2');
      }
      result = `tel:+886-${result}`;
      return result;
    },
    handleDate(time) {
      return new Date(time * 1000).toLocaleDateString();
    },
    async getOrders(page = 1) {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${page}`;
        const res = await this.$http.get(url);
        this.orders = res.data.orders;
        this.pagination = res.data.pagination;
      } catch (error) {
        this.$swal(error.data.message || '發生錯誤');
      } finally {
        this.hideLoading();
      }
    },
    async delOrder(id) {
      try {
        const swal = await this.delSwal('訂單編號', id);
        if (swal.isConfirmed) {
          this.loadingStatus.orderId = id;

          const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${id}`;
          const res = await this.$http.delete(url);

          this.getOrders();
          this.swalToast(res.data.message);

          this.loadingStatus.orderId = '';
        }
      } catch (error) {
        this.loadingStatus.orderId = '';
        this.$swal(error.data.message || '發生錯誤');
      }
    },
    async putOrder(order) {
      try {
        this.loadingStatus.orderId = order.id;

        const data = { ...order };
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${order.id}`;
        const res = await this.$http.put(url, { data });
        this.getOrders();
        this.swalToast(res.data.message);

        this.loadingStatus.orderId = '';
      } catch (error) {
        this.loadingStatus.orderId = '';
        this.$swal(error.data.message || '發生錯誤');
      }
    },
    ...mapActions(swalStore, ['delSwal', 'swalToast']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingStatus']),
  },
};
</script>
