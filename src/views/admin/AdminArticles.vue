<template>
    <!-- nav -->
    <div class="flex justify-between items-center mb-8">
    <h2 class="text-2xl font-bold">文章管理</h2>
    <button type="button" class="btn btn-primary" @click="openModal('new')">
      <i class="bi bi-plus-lg me-1"></i>新增文章
    </button>
  </div>
  <TableComponent class="mb-8">
  <template #th>
    <th scope="col">標題</th>
    <th class="hidden md:table-cell" scope="col">內容</th>
    <th scope="col">圖片</th>
    <th scope="col">標籤</th>
    <th scope="col">最後更新</th>
    <th class="hidden md:table-cell" scope="col">作者</th>
    <th scope="col">發布</th>
    <th scope="col"></th>
  </template>
  <template #tr="{trClass}">
    <tr :class="trClass" v-for="article in articles" :key="article.id">
      <!-- 標題 -->
      <td>{{ article.title }}</td>
      <!-- 內容 -->
      <td class="hidden md:table-cell">{{ article.description }}</td>
      <!-- 圖 -->
      <td>
      <div class="w-12 h-9 md:w-16 md:h-12">
        <img class="rounded-md bg-cover" :src="article.image" alt="文章圖">
      </div>
      </td>
      <!-- 標籤 -->
      <td>
        <ul class="flex flex-wrap gap-1" v-if="Array.isArray(article.tag)">
          <li class="py-1 px-2 rounded-xl bg-primary-200
            text-primary-800 text-center text-xs md:text-sm text-nowrap"
            v-for="item in article.tag" :key="`${article.id}-${item}`">
              {{ item }}
          </li>
        </ul>
      </td>
      <!-- 最後更新時間 -->
      <td>
        <span>{{ handleDate(article.create_at) }}</span>
      </td>
      <!-- 作者 -->
      <td class="hidden md:table-cell">{{ article.author }}</td>
      <td class="text-center">
        <ActiveBadge :active="article.isPublic">
          <template #trueMsg>發布</template>
          <template #falseMsg>下架</template>
        </ActiveBadge>
      </td>
      <td>
        <AdminActionBtns
        :data="article" loadingId="articleId"
        @open-modal="openModal" @del-item="delArticle">
        </AdminActionBtns>
      </td>
    </tr>
  </template>
  </TableComponent>
  <PaginationComponent :pagination="pagination" @get-data="getAdminArticles" />

  <ArticleModal ref="articleModal" :article="tempArticle" :is-new="isNew"
  :pagination="pagination" :tags="tags"
  @get-data="getAdminArticles" />
</template>
<script>
import { mapState, mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import swalStore from '@/stores/swalStore';
import helperStore from '@/stores/helperStore';

import PaginationComponent from '@/components/shared/pagination/PaginationComponent.vue';
import TableComponent from '@/components/shared/table/TableComponent.vue';
import AdminActionBtns from '@/components/adminPages/AdminActionBtns.vue';
import ActiveBadge from '@/components/shared/badge/ActiveBadge.vue';
import ArticleModal from '../../components/adminPages/adminArticles/ArticleModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  components: {
    TableComponent, PaginationComponent, AdminActionBtns, ArticleModal, ActiveBadge,
  },
  data() {
    return {
      articles: [],
      tempArticle: {},
      isNew: false,
      pagination: {},
      tags: [],
    };
  },
  mounted() {
    this.showLoading();
    this.getAdminArticles();
  },
  methods: {
    async getAdminArticles(page = 1) {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/articles?page=${page}`;
        const res = await this.$http.get(url);
        this.articles = res.data.articles;
        this.pagination = res.data.pagination;
        // 取得不重複的標籤列表
        this.tags = this.handleArrayInData(this.articles, 'tag');
      } catch (error) {
        // 通知
        const { message } = error.response.data;
        this.$swal(Array.isArray(message) ? message[0] : message);
      } finally {
        this.hideLoading();
      }
    },
    async delArticle(article) {
      try {
        const swal = await this.delSwal('優惠券', article.title);
        if (swal.isConfirmed) {
          // 設定按鈕 loading
          this.loadingStatus.articleId = article.id;
          // axios
          const url = `${VITE_URL}/api/${VITE_PATH}/admin/article/${article.id}`;
          await this.$http.delete(url);
          // 取資料
          this.getAdminArticles();
          // 通知
          this.swalToast(`已刪除優惠券「${article.title}」`);
          // 關閉 loading
          this.loadingStatus.articleId = '';
        }
      } catch (error) {
        // 關閉 loading
        this.loadingStatus.articleId = '';
        // 通知
        const { message } = error.response.data;
        this.$swal(Array.isArray(message) ? message[0] : message);
      }
    },
    openModal(type, item) {
      switch (type) {
        case 'new':
          this.tempArticle = {
            isPublic: false,
            tag: [],
          };
          this.isNew = true;
          break;
        case 'edit':
          this.tempArticle = JSON.parse(JSON.stringify(item));
          if (!Array.isArray(this.tempArticle.tag)) {
            this.tempArticle.tag = [];
          }
          this.isNew = false;
          break;
        default:
          break;
      }
      this.$refs.articleModal.showModal();
    },
    ...mapActions(swalStore, ['delSwal', 'swalToast']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    ...mapActions(helperStore, ['handleDate', 'handleArrayInData']),
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingStatus']),
  },
};
</script>
