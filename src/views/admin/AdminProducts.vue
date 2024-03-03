<template>
  <!-- nav -->
  <div class="flex justify-between items-center mb-8">
    <h2 class="text-2xl font-bold">產品管理</h2>
    <button type="button" class="btn btn-primary" @click="openModal('new')">
      <i class="bi bi-plus-lg me-1"></i>新增產品
    </button>
  </div>
  <!-- table -->
  <TableComponent class="mb-8">
    <!-- thead > tr -->
    <template #th>
      <th scope="col" class="min-w-8 pr-1 md:pr-2 md:pl-4">
        分類
      </th>
      <th scope="col" class="min-w-24 pr-1 md:pr-2">產品名稱</th>
      <th scope="col" class="text-end min-w-9 pr-1 md:px-2">
        原價
      </th>
      <th scope="col" class="text-end min-w-9 pr-1 md:px-2">
        售價
      </th>
      <th scope="col" class="text-end min-w-9 pr-1 md:px-2">
        庫存
      </th>
      <th scope="col" class="text-center pr-1 md:px-2">
        狀態
      </th>
      <th scope="col" class="min-w-10 text-end md:pr-4">編輯</th>
    </template>
    <!-- tbody -->
    <template #tr>
      <tr v-for="product in products" :key="product.id">
        <td class="py-2 pr-1 md:pr-2 md:pl-4">
          {{ product.category }}
        </td>
        <td class="py-2 pr-1">{{ product.title }}</td>
        <td class="py-2 pr-1 text-end md:px-2">
          {{ product.origin_price }}
        </td>
        <td class="py-2 pr-1 text-end md:px-2">
          {{ product.price }}
        </td>
        <td class="py-2 pr-1 text-end md:px-2">
          {{ product.stock }}
        </td>
        <td class="py-2 pr-1 text-center md:px-2">
          <span v-if="product.is_enabled"
          class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm text-nowrap
          bg-green-50 text-green-600">
            <span class="hidden md:inline-block h-1.5 w-1.5 rounded-full bg-green-600"></span>上架
          </span>
          <span v-else class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm
          bg-red-50 text-red-600">
            <span class="hidden md:inline-block h-1.5 w-1.5 rounded-full bg-red-600"></span>下架
          </span>
        </td>
        <td class="py-2 md:pr-4">
          <div class="flex gap-2 justify-end">
            <LoadingBtn class="btn btn-link p-1 md:p-2"
            :is-loading="loadingStatus.productId === product.id"
            @click="openModal('edit', product)">
              <i v-if="loadingStatus.productId !== product.id" class="bi bi-pencil-fill"></i>
            </LoadingBtn>
            <LoadingBtn class="btn btn-link p-1 md:p-2"
            :is-loading="loadingStatus.productId === product.id"
            @click="delProduct(product)">
              <i v-if="loadingStatus.productId !== product.id" class="bi bi-trash3-fill"></i>
            </LoadingBtn>
          </div>
        </td>
      </tr>
    </template>
  </TableComponent>

  <PaginationComponent :pagination="pagination" @get-data="getAdminProducts" />
  <ProductModal ref="productModal" :product="tempProduct" :is-new="isNew" :pagination="pagination"
  @get-data="getAdminProducts"
  >
  </ProductModal>
</template>

<script>
import ProductModal from '@/components/adminPages/adminProducts/ProductModal.vue';
import { mapState, mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import swalStore from '@/stores/swalStore';
import PaginationComponent from '@/components/shared/pagination/PaginationComponent.vue';
import LoadingBtn from '@/components/shared/button/LoadingBtn.vue';
import TableComponent from '@/components/shared/table/TableComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: false,
      pagination: {},
    };
  },
  components: {
    ProductModal,
    PaginationComponent,
    LoadingBtn,
    TableComponent,
  },
  mounted() {
    this.showLoading();
    this.getAdminProducts();
  },
  methods: {
    async delProduct(product) {
      const swalRes = await this.delSwal('產品', product.title);
      if (swalRes.isConfirmed) {
        try {
          const url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${product.id}`;
          await this.$http.delete(url);
          this.swalToast(`已刪除產品「${product.title}」`);
          this.getAdminProducts(this.pagination.current_page);
        } catch (error) {
          this.$swals(error.data.message);
        }
      }
    },
    async getAdminProducts(page = 1) {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`;
        const { data } = await this.$http.get(url);
        this.products = data.products;
        this.pagination = data.pagination;
        // 關掉 loading
        this.loadingStatus.productId = '';
        this.hideLoading();
      } catch (error) {
        this.hideLoading();
        this.$swel(error.data.message);
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
    closeModal() {
      this.$refs.delModal.close();
    },
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    ...mapActions(swalStore, ['swalToast', 'delSwal']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
};

</script>
