<template>
  <FormModal
   target="article" ref="articleFormModal" @reset-form="resetModalForm">
    <!-- 標題 -->
    <template #title="{titleClass}">
      <h3 :class="titleClass">{{isNew ? '新增' : '編輯'}}文章</h3>
    </template>

    <!-- 編輯區 -->
    <VForm v-slot="{errors}" ref="articleForm"
    @submit="updateArticle">
      <!-- 圖片 -->
      <div class="flex justify-between items-end mb-3">
        <h4 class="text-xl font-bold text-primary-800">圖片</h4>
        <!-- 裁剪小工具 -->
        <CropperComponent down-name="文章"></CropperComponent>
      </div>
      <div class="pb-4 md:pb-8 mb-4 border-b border-primary-700">
        <template v-if="!tempArticle.image">
          <p class="mb-2">請選擇圖片檔案或貼上圖片網址：</p>
          <FileInput :return-url="true" @emit-change="addImageUrl" class="mb-3"
          :isLoading="loadingStatus.imageUrl"></FileInput>
          <div class="flex mb-5">
            <FormFloat :label-for="'imageUrl'" :label="'圖片網址'" class="flex-grow">
              <template #default="{inputClass}">
                <input type="text" name="文章圖片" id="imageUrl" :class="inputClass"
                class="rounded-r-none" v-model="tempImageUrl" placeholder>
              </template>
            </FormFloat>
            <button type="button" class="btn btn-primary rounded-l-none text-nowrap"
              :disabled="!tempImageUrl"
              @click="tempArticle.image = tempImageUrl">加入圖片</button>
            </div>
        </template>
        <div v-else
        class="mb-3 md:w-1/2">
          <div class="relative border-2 border-primary-300 rounded-md p-1">
            <img :src="tempArticle.image"
            class="object-cover rounded-sm" alt="產品圖">
            <!-- 複製按鈕 -->
            <CopyBtn :text="tempArticle.image" msg="圖片網址"
            class="absolute right-0 bottom-0 p-1 rounded-md
          bg-primary-50 text-primary-800 duration-150
          hover:text-primary-300"></CopyBtn>
           <!-- 刪除按鈕 -->
           <button type="button" class="absolute right-0 top-0
            p-1 rounded-md bg-primary-50 text-primary-800 duration-150
          hover:text-red-500 focus:text-red-500"
          @click="tempArticle.image = ''">
            <i class="bi bi-trash-fill"></i></button>
          </div>
        </div>
      </div>
      <h4 class="text-xl font-bold text-primary-800 mb-4">文字</h4>
      <div class="flex flex-col gap-3">
      <!-- 標題 -->
      <FormFloat :label-for="'title'" :label="'標題'" :errors="errors">
          <template #default="{inputClass}">
            <VField type="text" name="標題" id="title" v-model="tempArticle.title"
            :class="inputClass" rules="required" placeholder required></VField>
          </template>
        </FormFloat>

        <!-- 簡介 -->
        <FormFloat label-for="description" label="簡介" :errors="errors">
          <template #default="{inputClass}">
            <VField type="text" name="簡介" id="description" v-model="tempArticle.description"
            :class="inputClass" rules="required"
            as="textarea"
            placeholder required></VField>
          </template>
        </FormFloat>
        <!-- 內容 -->
        <FormFloat label-for="content" label="內容" :errors="errors">
          <template #default="{inputClass}">
            <VField type="text" name="內容" id="content" v-model="tempArticle.content"
            :class="inputClass" rules="required"
            as="textarea"
            placeholder required></VField>
          </template>
        </FormFloat>
        <div class="flex gap-3">
          <!-- 作者 -->
          <div class="w-1/2">
            <FormFloat label-for="author" label="作者" :errors="errors">
              <template #default="{inputClass}">
                <VField type="text" name="作者" id="author"
                v-model="tempArticle.author"
                :class="inputClass" rules="required" placeholder required></VField>
              </template>
            </FormFloat>
          </div>
          <!-- 是否發佈 -->
          <div class="w-1/2">
            <ChecksRadio label-for="isPublic" label="是否發佈">
              <template #default="{inputClass}">
                <input id="isPublic"
                :class="inputClass" type="checkbox"
                v-model="tempArticle.isPublic">
              </template>
            </ChecksRadio>
          </div>
        </div>
        <!-- 標籤 -->
        <div class="flex w-fill md:w-1/2">
          <FormFloat label-for="tag" label="標籤" :errors="errors" class="flex-grow">
            <template #default="{inputClass}">
              <input type="text" list="tagList" name="標籤" id="tag"
              class="rounded-r-none" :class="inputClass" v-model="tempTag"
              placeholder @input="isTagDuplicate = false"/>
              <datalist id="tagList">
                <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
              </datalist>
            </template>
          </FormFloat>
          <button type="button" class="btn btn-primary rounded-l-none text-nowrap" @click="addTag">
            加入標籤
          </button>
        </div>
        <span class="text-red-600" v-if="isTagDuplicate">已有「{{ tempTag }}」標籤</span>
        <!-- 現有標籤 -->
        <ul class="flex flex-wrap gap-1" v-if="Array.isArray(tempArticle.tag)">
          <li v-for="(item, i) in tempArticle.tag" :key="`${tempArticle.id}-${item}`">
            <button type="button" class="group flex items-center py-1 px-2 rounded-xl bg-primary-200
            text-primary-800 text-center text-sm text-nowrap"
            @click="tempArticle.tag.splice(i, 1)">
              <i class="bi bi-x text-lg transition duration-150 group-hover:text-orange-700"></i>
              {{ item }}
            </button>
          </li>
        </ul>

        <!-- 按鈕 -->
        <div class="mt-5 text-end">
          <button type="button" class="btn btn-outline-primary me-3"
          @click="closeModal();resetModalForm()">
          取消編輯</button>
          <button type="submit" class="btn btn-primary">
          儲存編輯</button>
        </div>
      </div>

    </VForm>
    <!-- loading -->
    <LoadingOverlay :active="loadingStatus.editArticle" :is-full-page="false" color="#5C270D">
    </LoadingOverlay>
  </FormModal>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import swalStore from '@/stores/swalStore';
import loadingStore from '@/stores/loadingStore';
import FormFloat from '@/components/shared/form/FormFloat.vue';
import FileInput from '@/components/shared/form/FileInput.vue';
import CopyBtn from '@/components/shared/button/CopyBtn.vue';
import ChecksRadio from '@/components/shared/form/ChecksRadio.vue';
import CropperComponent from '@/components/shared/helpers/CropperComponent.vue';
import FormModal from '@/components/shared/modal/FormModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  components: {
    FormModal, FormFloat, ChecksRadio, CropperComponent, FileInput, CopyBtn,
  },
  props: {
    id: String,
    tags: Array,
    isNew: Boolean,
    pagination: Object,
  },
  data() {
    return {
      tempArticle: {},
      tempId: '',
      tempImageUrl: '',
      tempTag: '',
      isTagDuplicate: false,
      loading: true,
    };
  },
  methods: {
    async showModal() {
      this.$refs.articleFormModal.showModal();
    },
    closeModal() {
      this.$refs.articleFormModal.closeModal();
    },
    async getSingleArticle(id) {
      try {
        this.loadingStatus.editArticle = true;
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${id}`;
        const res = await this.$http.get(url);
        this.tempArticle = res.data.article;
        // 若之前沒有加入 tag 就加空陣列
        if (!Array.isArray(this.tempArticle.tag)) {
          this.tempArticle.tag = [];
        }

        this.loadingStatus.editArticle = false;
      } catch (error) {
        this.loadingStatus.editArticle = false;
        // 通知
        this.apiErrorSwal(error, this.$refs.articleFormModal);
      }
    },
    resetModalForm() {
      this.$refs.articleForm.resetForm();
      this.tempArticle.image = '';
      this.tempTag = '';
      this.isTagDuplicate = false;
    },
    addImageUrl(url) {
      this.tempArticle.image = url;
    },
    addTag() {
      if (this.tempArticle.tag.includes(this.tempTag)) {
        this.isTagDuplicate = true;
        return;
      }
      this.tempArticle.tag.push(this.tempTag);
      this.tempTag = '';
    },
    async updateArticle() {
      try {
        // 新增文章
        let url = `${VITE_URL}/api/${VITE_PATH}/admin/article`;
        let httpMethod = 'post';
        // 回到第一頁
        let page = 1;
        this.tempArticle.create_at = Math.floor(new Date().getTime() / 1000);

        // 提示文字
        const alertText = `已${this.isNew ? '新增' : '更新'}文章「${this.tempArticle.title}」`;

        // 不是新增文章時換成編輯文章
        if (!this.isNew) {
          url += `/${this.tempArticle.id}`;
          httpMethod = 'put';
          // 待在目前頁數
          page = this.pagination.current_page;
          // 設定按鈕 loading
          this.loadingStatus.articleId = this.tempArticle.id;
        }
        // 關閉 modal
        this.closeModal();
        // axios
        await this.$http[httpMethod](url, { data: this.tempArticle });
        // 重置表單，避免殘留上次驗證結果
        this.resetModalForm();

        // 取資料
        this.$emit('getData', page);
        // 關閉 loading
        this.loadingStatus.articleId = '';
        // 通知
        this.swalToast(alertText);
      } catch (error) {
        // 關閉 loading
        this.loadingStatus.articleId = '';
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
