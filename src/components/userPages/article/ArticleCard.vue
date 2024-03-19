<template>
  <RouterLink :to="`/article/${article.id}`" class="w-full group">
    <!-- 圖 -->
    <div class="w-full h-64 overflow-hidden rounded-sm mb-4 relative">
      <img lazy="loading" class="w-full h-full object-cover
      group-hover:scale-110 transition-transform duration-300"
      :src="article.image" alt="文章圖">
      <div class="absolute top-0 left-0 p-8 w-full h-full flex flex-col justify-center items-center
    bg-primary-800/30
      opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p class="line-clamp-3 text-justify text-primary-50 mb-4 sm:text-lg">
        {{ article.description }}</p>
        <div class="btn bg-primary-50 ">了解更多</div>
      </div>
    </div>
    <!-- 標題 -->
    <p class="text-stone-500 text-sm sm:text-base mb-2 sm:mb-4">
      {{timestampToDate(article.create_at)}}
    </p>
    <h4 class="text-lg text-primary-800 font-bold mb-2 sm:mb-4 sm:text-xl xl:text-2xl ">
    {{ article.title }}</h4>
    <ul v-if="Array.isArray(article.tag)"
    class="flex gap-1 text-sm sm:text-base">
      <li v-for="item in article.tag" :key="item"
      class="bg-primary-300 text-primary-900 py-1 px-2 rounded-sm">
      {{ item }}</li>
    </ul>
  </RouterLink>
</template>
<script>
import { mapActions } from 'pinia';
import helperStore from '@/stores/helperStore';

export default {
  props: {
    article: Object,
  },
  methods: {
    ...mapActions(helperStore, ['timestampToDate']),
  },
};
</script>
