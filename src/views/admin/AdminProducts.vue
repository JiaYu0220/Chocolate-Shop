<template>
  <!-- nav -->
  <div class="flex justify-between items-center mb-8">
    <h2 class="text-2xl font-bold">產品管理</h2>
    <LoadingBtn class="btn btn-primary" :isLoading="loadingStatus.newProduct"
    @click="openModal('new')">
      <i v-if="!loadingStatus.newProduct" class="bi bi-plus-lg me-1"></i>新增產品
    </LoadingBtn>
  </div>
  <!-- table -->
  <TableComponent class="mb-8">
    <!-- thead > tr -->
    <template #th>
      <th scope="col" class="min-w-8">
        分類
      </th>
      <th scope="col" class="min-w-24">產品名稱</th>
      <th scope="col" class="text-end min-w-9">
        原價
      </th>
      <th scope="col" class="text-end min-w-9">
        售價
      </th>
      <th scope="col" class="text-end min-w-9">
        庫存
      </th>
      <th scope="col" class="text-center">
        狀態
      </th>
      <th scope="col"></th>
    </template>
    <!-- tbody -->
    <template #tr="{trClass}">
      <tr :class="trClass" v-for="product in products" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td class="text-end">{{ product.origin_price }}</td>
        <td class="text-end">{{ product.price }}</td>
        <td class="text-end">{{ product.stock }}</td>
        <td class="text-center">
          <ActiveBadge :active="product.is_enabled">
            <template #trueMsg>上架</template>
            <template #falseMsg>下架</template>
          </ActiveBadge>
        </td>
        <td>
          <AdminActionBtns
          :data="product" loadingId="productId"
          @open-modal="openModal" @del-item="delProduct">
          </AdminActionBtns>
        </td>
      </tr>
    </template>
  </TableComponent>

  <PaginationComponent :pagination="pagination" @get-data="getAdminProducts" />

  <ProductModal ref="productModal" :product="tempProduct" :is-new="isNew"
  :pagination="pagination" :categories="categories"
  @get-data="getAdminProducts" />
</template>

<script>
import { mapState, mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import swalStore from '@/stores/swalStore';
import helperStore from '@/stores/helperStore';

import ProductModal from '@/components/adminPages/adminProducts/ProductModal.vue';
import PaginationComponent from '@/components/shared/pagination/PaginationComponent.vue';
import TableComponent from '@/components/shared/table/TableComponent.vue';
import AdminActionBtns from '@/components/adminPages/AdminActionBtns.vue';
import LoadingBtn from '@/components/shared/button/LoadingBtn.vue';
import ActiveBadge from '../../components/shared/badge/ActiveBadge.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  components: {
    ProductModal,
    PaginationComponent,
    AdminActionBtns,
    TableComponent,
    ActiveBadge,
    LoadingBtn,
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      categories: [],
      isNew: false,
      pagination: {},
    };
  },
  mounted() {
    this.showLoading();
    this.getAdminProducts();
  },
  methods: {
    async getAdminProducts(page = 1) {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`;
        const { data } = await this.$http.get(url);
        this.products = data.products;
        this.pagination = data.pagination;
        // 取得不重複的類別列表
        this.categories = this.handleArrayInData(this.products, 'category');

        // 關掉 loading
        this.loadingStatus.productId = '';
        this.hideLoading();
      } catch (error) {
        this.hideLoading();
        // 通知
        const { message } = error.response.data;
        this.$swal(Array.isArray(message) ? message[0] : message);
      }
    },
    async delProduct(product) {
      const swalRes = await this.delSwal('產品', product.title);
      if (swalRes.isConfirmed) {
        try {
          // 設定按鈕 loading
          this.loadingStatus.productId = product.id;
          // axios
          const url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${product.id}`;
          await this.$http.delete(url);
          // 取資料
          this.getAdminProducts(this.pagination.current_page);
          // 通知
          this.swalToast(`已刪除產品「${product.title}」`);
          // 關閉 loading
          this.loadingStatus.productId = '';
        } catch (error) {
          // 關閉 loading
          this.loadingStatus.productId = '';
          // 通知
          this.$swals(error.data.message || '發生錯誤，請稍後再試');
        }
      }
    },
    openModal(type, item) {
      switch (type) {
        case 'new':
          this.tempProduct = {
            imagesUrl: [],
            is_enabled: 0,
          };
          this.isNew = true;
          break;
        case 'edit':
          this.tempProduct = { ...item };
          if (!Array.isArray(this.tempProduct.imagesUrl)) {
            this.tempProduct.imagesUrl = [];
          }
          this.isNew = false;
          break;
        default:
          break;
      }
      this.$refs.productModal.showModal();
    },
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    ...mapActions(swalStore, ['swalToast', 'delSwal']),
    ...mapActions(helperStore, ['handleArrayInData']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
};

</script>
