<template>
  <div class="container py-10">
    <div class="mb-8 border-b-2 border-primary-200 pb-10">
      <h2 class="text-center text-2xl font-bold tracking-widest text-primary-800">最新消息</h2>
    </div>
    <ul v-if="articles.length" class="flex flex-wrap sm:-mx-2 sm:-my-4">
      <li
        v-for="article in articles"
        :key="article.id"
        class="w-full sm:w-1/2 sm:px-2 sm:py-4 xl:w-1/3"
      >
        <ArticleCard :article="article" />
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import articleStore from '@/stores/articleStore';
import ArticleCard from '@/components/userPages/article/ArticleCard.vue';

export default {
  components: {
    ArticleCard,
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.showLoading();

      await this.getAllArticles();

      this.hideLoading();
    },
    ...mapActions(articleStore, ['getAllArticles']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
  },
  computed: {
    ...mapState(articleStore, ['articles']),
  },
};
</script>
