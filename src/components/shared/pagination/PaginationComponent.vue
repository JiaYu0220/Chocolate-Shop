<template>
  <nav class="block text-center" aria-label="Pagination">
    <ul
      class="mx-auto inline-flex justify-center overflow-hidden rounded-lg border border-stone-200
        bg-primary-50 text-sm md:text-lg"
    >
      <li class="border-r border-stone-200">
        <a
          v-if="pagination.has_pre"
          href="#"
          class="block px-4 py-2 duration-150 hover:bg-primary-700 hover:text-primary-100"
          @click.prevent="prePage"
        >
          <span class="sr-only">上一頁</span>
          <span aria-hidden="true">&lt;</span>
        </a>
        <span v-else class="block bg-stone-100 px-4 py-2 text-stone-500">
          <span class="sr-only">上一頁</span>
          <span aria-hidden="true">&lt;</span>
        </span>
      </li>
      <li
        class="border-r border-stone-200"
        v-for="page in pagination.total_pages"
        :key="`page${page}`"
      >
        <a
          href="#"
          v-if="page !== pagination.current_page"
          class="block px-4 py-2 duration-150 hover:bg-primary-700 hover:text-primary-100"
          @click.prevent="specifyPage(page)"
        >
          {{ page }}</a
        >
        <span v-else class="block bg-stone-100 px-4 py-2 text-stone-500">{{ page }}</span>
      </li>
      <li>
        <a
          v-if="pagination.has_next"
          href="#"
          class="block px-4 py-2 duration-150 hover:bg-primary-700 hover:text-primary-100"
          @click.prevent="nextPage"
        >
          <span class="sr-only">下一頁</span>
          <span aria-hidden="true">&gt;</span>
        </a>
        <span v-else class="block bg-stone-100 px-4 py-2 text-stone-500">
          <span class="sr-only">下一頁</span>
          <span aria-hidden="true">&gt;</span>
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';

export default {
  props: {
    pagination: Object,
  },
  methods: {
    prePage() {
      this.showLoading();
      this.$emit('getData', this.pagination.current_page - 1);
    },
    specifyPage(page) {
      this.showLoading();
      this.$emit('getData', page);
    },
    nextPage() {
      this.showLoading();
      this.$emit('getData', this.pagination.current_page + 1);
    },
    ...mapActions(loadingStore, ['showLoading']),
  },
};
</script>
