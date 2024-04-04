<template>
  <FormModal target="product" ref="productFormModal" @reset-form="resetModalForm">
    <!-- 標題 -->
    <template #title="{ titleClass }">
      <h3 :class="titleClass">{{ isNew ? '新增' : '編輯' }}產品</h3>
    </template>

    <!-- 編輯區 -->
    <VForm v-slot="{ errors }" ref="productForm" @submit="updateProduct">
      <!-- 圖片 -->
      <div class="mb-3 flex items-end justify-between">
        <h4 class="text-xl font-bold text-primary-800">圖片</h4>
        <!-- 裁剪小工具 -->
        <CropperComponent :down-name="tempProduct.title" />
      </div>
      <p class="mb-3 text-stone-500">※ 請先使用裁剪小工具將圖片裁剪成適當長寬比 (4:3) 再上傳！</p>
      <!-- 圖片內容 -->
      <div class="mb-4 border-b border-primary-700 pb-4 md:pb-8">
        <h5 class="mb-1 text-lg">- 主圖 -</h5>
        <template v-if="!tempProduct.imageUrl">
          <p class="mb-2">請選擇圖片檔案或貼上圖片網址：</p>
          <FileInput
            :return-url="true"
            @emit-change="addImageUrl"
            class="mb-3"
            :isLoading="loadingStatus.imageUrl"
          />
          <div class="mb-5 flex">
            <FormFloat :label-for="'imageUrl'" :label="'圖片網址'" class="flex-grow">
              <template #default="{ inputClass }">
                <input
                  type="text"
                  name="圖片"
                  id="imageUrl"
                  :class="inputClass"
                  class="rounded-r-none"
                  v-model="tempImageUrl"
                  placeholder
                />
              </template>
            </FormFloat>
            <button
              type="button"
              class="btn btn-primary text-nowrap rounded-l-none"
              :disabled="!tempImageUrl"
              @click="tempProduct.imageUrl = tempImageUrl"
            >
              加入圖片
            </button>
          </div>
        </template>
        <div v-else class="mb-3 md:w-1/2">
          <EditImage :image="tempProduct.imageUrl" @handle-delete="tempProduct.imageUrl = ''" />
        </div>
        <hr />
        <h5 class="mb-1 mt-3 text-lg">- 其他圖片 -</h5>
        <p class="mb-2">請選擇圖片檔案或貼上圖片網址：</p>
        <FileInput
          :return-url="true"
          :isMultiple="true"
          @emit-change="addImagesUrlArray"
          :isLoading="loadingStatus.imagesUrl"
          class="mb-3"
        />
        <div class="mb-3 flex">
          <FormFloat :label-for="'imageUrl'" :label="'圖片網址'" class="flex-grow">
            <template #default="{ inputClass }">
              <input
                type="text"
                name="圖片"
                id="imageUrl"
                :class="inputClass"
                class="rounded-r-none"
                placeholder
                v-model="tempImagesUrl"
              />
            </template>
          </FormFloat>
          <LoadingBtn
            class="btn btn-primary text-nowrap rounded-l-none"
            :isLoading="loadingStatus.imagesUrl"
            :disabled="!tempImagesUrl"
            @click="addImagesUrl(tempImagesUrl)"
            >加入圖片</LoadingBtn
          >
        </div>
        <div
          class="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3"
          v-if="Array.isArray(tempProduct.imagesUrl)"
        >
          <EditImage
            v-for="(img, i) in tempProduct.imagesUrl"
            :key="`img${i}`"
            :image="img"
            @handle-delete="tempProduct.imagesUrl.splice(i, 1)"
          />
        </div>
      </div>

      <!-- 文字 -->
      <h4 class="mb-4 text-xl font-bold text-primary-800">文字</h4>
      <div class="flex flex-col gap-3">
        <!-- 名稱 -->
        <div class="flex gap-3">
          <div class="w-2/3">
            <FormFloat label-for="title" label="名稱" :errors="errors">
              <template #default="{ inputClass }">
                <VField
                  type="text"
                  name="名稱"
                  id="title"
                  v-model="tempProduct.title"
                  :class="inputClass"
                  rules="required"
                  placeholder
                  required
                />
              </template>
            </FormFloat>
          </div>
          <div class="w-1/3">
            <FormFloat label-for="stock" label="庫存" :errors="errors">
              <template #default="{ inputClass }">
                <VField
                  type="number"
                  name="庫存"
                  min="0"
                  id="stock"
                  v-model.number="tempProduct.stock"
                  :class="inputClass"
                  rules="required"
                  placeholder
                  required
                />
              </template>
            </FormFloat>
          </div>
        </div>
        <div class="flex gap-3">
          <!-- 類別 -->
          <div class="w-2/3">
            <FormFloat label-for="category" label="類別" :errors="errors">
              <template #default="{ inputClass }">
                <VField
                  type="text"
                  name="類別"
                  id="category"
                  list="categoryList"
                  v-model="tempProduct.category"
                  :class="inputClass"
                  rules="required"
                  placeholder
                  required
                />
                <datalist id="categoryList">
                  <option v-for="category in categories" :key="category" :value="category">
                    {{ category }}
                  </option>
                </datalist>
              </template>
            </FormFloat>
          </div>
          <!-- 原價 -->
          <div class="w-1/3">
            <FormFloat label-for="origin_price" label="原價" :errors="errors">
              <template #default="{ inputClass }">
                <VField
                  type="number"
                  name="原價"
                  min="0"
                  id="origin_price"
                  v-model.number="tempProduct.origin_price"
                  :class="inputClass"
                  rules="required"
                  placeholder
                  required
                />
              </template>
            </FormFloat>
          </div>
        </div>
        <div class="flex gap-3">
          <!-- 單位 -->
          <div class="w-2/3">
            <FormFloat label-for="unit" label="單位" :errors="errors">
              <template #default="{ inputClass }">
                <VField
                  type="text"
                  name="單位"
                  id="unit"
                  v-model="tempProduct.unit"
                  :class="inputClass"
                  rules="required"
                  placeholder
                  required
                />
              </template>
            </FormFloat>
          </div>
          <!-- 售價 -->
          <div class="w-1/3">
            <FormFloat label-for="price" label="售價" :errors="errors">
              <template #default="{ inputClass }">
                <VField
                  type="number"
                  name="售價"
                  min="0"
                  id="price"
                  v-model.number="tempProduct.price"
                  :class="inputClass"
                  rules="required"
                  placeholder
                  required
                />
              </template>
            </FormFloat>
          </div>
        </div>
        <hr />
        <!-- 產品描述 -->
        <FormFloat label-for="description" label="產品描述">
          <template #default="{ inputClass }">
            <textarea
              type="text"
              name="產品描述"
              id="description"
              v-model="tempProduct.description"
              :class="inputClass"
              placeholder
            >
            </textarea>
          </template>
        </FormFloat>
        <!-- 說明內容 -->
        <FormFloat label-for="content" label="說明內容">
          <template #default="{ inputClass }">
            <textarea
              type="text"
              name="說明內容"
              id="content"
              v-model="tempProduct.content"
              :class="inputClass"
              placeholder
            >
            </textarea>
          </template>
        </FormFloat>
        <!-- 是否上架 -->
        <ChecksRadio label-for="is_enabled" label="是否上架">
          <template #default="{ inputClass }">
            <input
              id="is_enabled"
              :class="inputClass"
              type="checkbox"
              :true-value="1"
              :false-value="0"
              v-model="tempProduct.is_enabled"
            />
          </template>
        </ChecksRadio>
      </div>
      <!-- 按鈕 -->
      <div class="mt-5 text-end">
        <button
          type="button"
          class="btn btn-outline-primary me-3"
          @click="
            closeModal();
            resetModalForm();
          "
        >
          取消編輯
        </button>
        <button type="submit" class="btn btn-primary">儲存編輯</button>
      </div>
    </VForm>
  </FormModal>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import CropperComponent from '@/components/shared/helpers/CropperComponent.vue';
import FormFloat from '@/components/shared/form/FormFloat.vue';
import FileInput from '@/components/shared/form/FileInput.vue';
import LoadingBtn from '@/components/shared/button/LoadingBtn.vue';
import ChecksRadio from '@/components/shared/form/ChecksRadio.vue';
import swalStore from '@/stores/swalStore';
import loadingStore from '@/stores/loadingStore';
import FormModal from '@/components/shared/modal/FormModal.vue';
import EditImage from '@/components/adminPages/EditImage.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  components: {
    FormModal,
    FormFloat,
    FileInput,
    LoadingBtn,
    CropperComponent,
    ChecksRadio,
    EditImage,
  },
  props: {
    product: Object,
    categories: Array,
    isNew: Boolean,
    pagination: Object,
  },
  data() {
    return {
      tempProduct: {},
      tempImageUrl: '',
      tempImagesUrl: '',
    };
  },
  mounted() {
    this.tempProduct = this.product;
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },
  methods: {
    showModal() {
      this.$refs.productFormModal.showModal();
    },
    closeModal() {
      this.$refs.productFormModal.closeModal();
    },
    resetModalForm() {
      this.$refs.productForm.resetForm();
    },
    addImageUrl(url) {
      this.tempProduct.imageUrl = url;
    },
    addImagesUrl(url) {
      this.tempProduct.imagesUrl.push(url);
      this.tempImagesUrl = '';
    },
    addImagesUrlArray(array) {
      this.tempProduct.imagesUrl.push(...array);
    },
    async updateProduct() {
      try {
        // 新增商品
        let url = `${VITE_URL}/api/${VITE_PATH}/admin/product`;
        let httpMethod = 'post';
        // 回到第一頁
        let page = 1;
        // 提示文字
        const alertText = `已${this.isNew ? '新增' : '更新'}產品「${this.tempProduct.title}」`;

        // 不是新增商品時換成編輯商品
        if (!this.isNew) {
          url += `/${this.tempProduct.id}`;
          httpMethod = 'put';
          // 待在目前頁數
          page = this.pagination.current_page;
          // 設定按鈕 loading
          this.loadingStatus.productId = this.tempProduct.id;
        } else {
          // 設定按鈕 loading
          this.loadingStatus.newProduct = true;
        }

        // 關閉 modal 並重置表單
        this.closeModal();
        // axios
        await this.$http[httpMethod](url, { data: this.tempProduct });
        // 重置表單，避免殘留上次驗證結果
        this.resetModalForm();

        // 取資料
        this.$emit('getData', page);
        // 關閉 loading
        this.loadingStatus.productId = '';
        this.loadingStatus.newProduct = false;
        // 通知
        this.swalToast(alertText);
      } catch (error) {
        // 關閉 loading
        this.loadingStatus.productId = '';
        this.loadingStatus.newProduct = false;
        // 通知
        this.apiErrorSwal(error);
      }
    },
    ...mapActions(swalStore, ['swalToast', 'apiErrorSwal']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
