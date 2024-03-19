<template>
  <div class="flex gap-2 justify-end">
    <LoadingBtn class="btn btn-link p-1 md:p-2"
    :is-loading="isLoading"
    @click="openModal">
      <i v-if="!isLoading" class="bi bi-pencil-fill"></i>
    </LoadingBtn>
    <LoadingBtn class="btn btn-link p-1 md:p-2"
    :is-loading="isLoading"
    @click="delItem">
      <i v-if="!isLoading" class="bi bi-trash3-fill"></i>
    </LoadingBtn>
  </div>
</template>
<script>
import { mapState } from 'pinia';
import LoadingBtn from '@/components/shared/button/LoadingBtn.vue';
import loadingStore from '@/stores/loadingStore';

export default {
  props: {
    data: [Object, String],
    loadingId: String,
  },
  components: {
    LoadingBtn,
  },
  methods: {
    openModal() {
      if (this.loadingId === 'orderId') {
        // 訂單管理沒有新增功能只有編輯
        this.$emit('openModal', this.data);
      } else {
        // 除了訂單外的管理要指定是編輯
        this.$emit('openModal', 'edit', this.data);
      }
    },
    delItem() {
      this.$emit('delItem', this.data);
    },
  },
  computed: {
    isLoading() {
      return this.loadingStatus[this.loadingId] === this.data.id;
    },
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
