<template>
  <nav class="block text-center"
    aria-label="Pagination">
    <ul class="inline-flex justify-center text-sm md:text-lg
    border bg-primary-50 border-stone-200 rounded-lg overflow-hidden mx-auto">
      <li class="border-r border-stone-200">
        <a v-if="pagination.has_pre" href="#"
        class="block py-2 px-4 hover:bg-primary-700 hover:text-primary-100 duration-150"
        @click.prevent="prePage"
        >
          <span class="sr-only">上一頁</span>
          <span aria-hidden="true">&lt;</span>
        </a>
        <span v-else
        class="block py-2 px-4 bg-stone-100 text-stone-500">
          <span class="sr-only">上一頁</span>
          <span aria-hidden="true">&lt;</span>
        </span>
      </li>
      <li class="border-r border-stone-200"
      v-for="page in pagination.total_pages" :key="`page${page}`">
        <a href="#" v-if="page !== pagination.current_page"
        class="py-2 px-4 block hover:bg-primary-700 hover:text-primary-100 duration-150"
        @click.prevent="specifyPage(page)">
        {{page}}</a>
        <span v-else class="block py-2 px-4 bg-stone-100 text-stone-500">{{page}}</span>
      </li>
      <li>
        <a v-if="pagination.has_next" href="#"
        class="block py-2 px-4 hover:bg-primary-700 hover:text-primary-100 duration-150"
        @click.prevent="nextPage">
          <span class="sr-only">下一頁</span>
          <span aria-hidden="true">&gt;</span>
        </a>
        <span v-else
        class="block py-2 px-4 bg-stone-100 text-stone-500">
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
