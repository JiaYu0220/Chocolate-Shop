<template>
  <RouterLink :to="`/article/${article.id}`" class="group w-full">
    <!-- 圖 -->
    <div class="relative mb-4 h-64 w-full overflow-hidden rounded-sm">
      <img
        lazy="loading"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        :src="article.image"
        alt="文章圖"
      />
      <div
        class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center
          bg-primary-800/30 p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <p class="mb-4 line-clamp-3 text-justify text-primary-50 hidden sm:block sm:text-lg">
          {{ article.description }}
        </p>
        <div class="btn bg-primary-50">了解更多</div>
      </div>
    </div>
    <!-- 標題 -->
    <p class="mb-2 text-sm text-stone-500 sm:mb-4 sm:text-base">
      {{ timestampToDate(article.create_at) }}
    </p>
    <h4 class="mb-2 text-lg font-bold text-primary-800 sm:mb-4 sm:text-xl xl:text-2xl">
      {{ article.title }}
    </h4>
    <p class="mb-2 line-clamp-3 text-justify sm:hidden">
      {{ article.description }}
    </p>
    <ul v-if="Array.isArray(article.tag)" class="flex gap-1 text-sm sm:text-base">
      <li
        v-for="item in article.tag"
        :key="item"
        class="rounded-sm bg-primary-300 px-2 py-1 text-primary-900"
      >
        {{ item }}
      </li>
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
