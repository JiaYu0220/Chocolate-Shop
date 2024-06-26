<template>
  <h2 class="mb-8 text-2xl font-bold">訂單管理</h2>
  <TableComponent class="mb-8 text-xs sm:text-sm md:text-base">
    <template #th>
      <th scope="col">#</th>
      <th scope="col">客戶</th>
      <!-- <th scope="col">地址</th> -->
      <th scope="col">連絡</th>
      <th scope="col" class="min-w-15">品項</th>
      <th scope="col" class="text-nowrap text-end">總額</th>
      <th scope="col" class="min-w-15 text-nowrap">備註</th>
      <th scope="col">日期</th>
      <th scope="col">付款</th>
      <th scope="col"></th>
    </template>
    <template #tr="{ trClass }">
      <tr :class="trClass" v-for="(order, key) in orders" :key="order.id">
        <td>{{ order.num }}</td>
        <td class="py-2 pr-1">
          <p>{{ order.user.name }}</p>
        </td>
        <!-- <td>
            <span class="hidden md:inline">{{ order.user.address }}</span>
            <CopyBtn :text="order.user.address" msg="地址" class="text-primary-700 md:hidden"/>
          </td> -->
        <!-- 聯絡 -->
        <td class="text-center md:text-start">
          <a
            class="link inline-block before:bottom-0 after:bottom-0"
            :href="`mailto:${order.user.email}`"
          >
            <span class="hidden md:inline">{{ order.user.email }}</span>
            <i class="bi bi-envelope-arrow-up-fill text-primary-700 md:hidden"></i>
          </a>
          <a
            class="link inline-block before:bottom-0 after:bottom-0"
            :href="handleTelLink(order.user.tel)"
          >
            <span class="hidden md:inline">{{ order.user.tel }}</span>
            <i class="bi bi-telephone-outbound-fill text-primary-700 md:hidden"></i>
          </a>
        </td>
        <!-- 訂單產品 -->
        <td>
          <p v-for="(product, key) in order.products" :key="key">
            {{ `${product.product.title} * ${product.qty}` }}
          </p>
        </td>
        <!-- 總額 -->
        <td class="text-end">{{ Math.floor(order.total) }}</td>
        <!-- 備註 -->
        <td>
          <span class="line-clamp-5">
            {{ order.message }}
          </span>
        </td>
        <!-- 日期 -->
        <td>
          <span class="hidden md:inline">{{ timestampToDate(order.create_at) }}</span>
          <span class="md:hidden">{{ timestampToDate(order.create_at).substring(5) }}</span>
        </td>
        <!-- 是否付款 -->
        <td>
          <label
            :for="`paidStatus${key}`"
            class="inline-flex h-4 w-8 cursor-pointer items-center rounded-full bg-primary-800
              transition-all duration-150 has-[:disabled]:cursor-default
              has-[:checked]:bg-primary-300 has-[:disabled]:bg-stone-300"
          >
            <input
              type="checkbox"
              :id="`paidStatus${key}`"
              class="peer hidden"
              v-model="order.is_paid"
              :disabled="loadingStatus.orderId === order.id"
              @change="putOrder(order)"
            />
            <div
              class="ml-[50%] flex h-4 w-4 items-center justify-center rounded-full border
                border-primary-800 bg-primary-50 bg-icon-x bg-center bg-no-repeat text-primary-800
                transition-all duration-150 peer-checked:ml-[0%] peer-checked:border-primary-300
                peer-checked:bg-icon-check peer-disabled:border-stone-300"
            ></div>
          </label>
        </td>
        <td>
          <AdminActionBtns
            :data="order"
            loadingId="orderId"
            @open-modal="openModal"
            @del-item="delOrder"
          >
          </AdminActionBtns>
        </td>
      </tr>
    </template>
  </TableComponent>
  <PaginationComponent :pagination="pagination" @get-data="getAdminOrders" />

  <OrderModal ref="orderModal" :order="tempOrder" :pagination="pagination" @put-order="putOrder" />
</template>
<script>
import { mapState, mapActions } from 'pinia';
import PaginationComponent from '@/components/shared/pagination/PaginationComponent.vue';
import loadingStore from '@/stores/loadingStore';
import TableComponent from '@/components/shared/table/TableComponent.vue';
import AdminActionBtns from '@/components/adminPages/AdminActionBtns.vue';
import swalStore from '@/stores/swalStore';
import helperStore from '@/stores/helperStore';
import OrderModal from '../../components/adminPages/adminOrders/OrderModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  components: {
    TableComponent,
    PaginationComponent,
    OrderModal,
    AdminActionBtns,
  },
  data() {
    return {
      orders: [],
      tempOrder: {},
      tempUser: {},
      pagination: {},
    };
  },
  mounted() {
    this.showLoading();
    this.getAdminOrders();
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
    async getAdminOrders(page = 1) {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${page}`;
        const res = await this.$http.get(url);
        this.orders = res.data.orders;
        this.pagination = res.data.pagination;
        this.hideLoading();
      } catch (error) {
        this.hideLoading();
        // 通知
        this.apiErrorSwal(error);
      }
    },
    async delOrder(order) {
      try {
        const swal = await this.delSwal('訂單編號', order.num);
        if (swal.isConfirmed) {
          this.loadingStatus.orderId = order.id;

          const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${order.id}`;
          await this.$http.delete(url);

          this.getAdminOrders();
          this.swalToast(`已刪除編號「${order.num}」訂單`);

          this.loadingStatus.orderId = '';
        }
      } catch (error) {
        this.loadingStatus.orderId = '';
        // 通知
        this.apiErrorSwal(error);
      }
    },
    async putOrder(order) {
      try {
        // 設定按鈕 loading
        this.loadingStatus.orderId = order.id;

        const url = `${VITE_URL}/api/${VITE_PATH}/admin/order/${order.id}`;
        // 提示文字
        const alertText = `已修改編號「${order.num}」訂單`;
        // axios
        await this.$http.put(url, { data: order });

        // 取資料
        this.getAdminOrders();
        // 通知
        this.swalToast(alertText);

        // 關閉 loading
        this.loadingStatus.orderId = '';
      } catch (error) {
        // 關閉 loading
        this.loadingStatus.orderId = '';
        // 通知
        this.apiErrorSwal(error);
      }
    },
    openModal(item) {
      this.tempOrder = JSON.parse(JSON.stringify(item)); // 深拷貝
      this.$refs.orderModal.showModal();
    },
    ...mapActions(swalStore, ['delSwal', 'swalToast', 'apiErrorSwal']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    ...mapActions(helperStore, ['timestampToDate']),
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingStatus']),
  },
};
</script>
