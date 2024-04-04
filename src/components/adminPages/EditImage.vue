<template>
  <div class="relative rounded-md border-2 border-primary-300 p-1">
    <img loading="lazy" :src="image" class="rounded-sm object-cover" alt="產品圖" />
    <!-- 複製按鈕 -->
    <CopyBtn
      :text="image"
      msg="圖片網址"
      class="absolute bottom-0 right-0 rounded-md bg-primary-50 p-1 text-primary-800 duration-150
        hover:text-primary-300"
    />
    <!-- 刪除按鈕 -->
    <button
      type="button"
      class="absolute right-0 top-0 rounded-md bg-primary-50 p-1 text-primary-800 duration-150
        hover:text-red-500 focus:text-red-500"
      @click="$emit('handleDelete')"
    >
      <i class="bi bi-trash-fill"></i>
    </button>
  </div>
</template>

<script>
import CopyBtn from '@/components/shared/button/CopyBtn.vue';

export default {
  props: {
    image: String,
  },
  components: {
    CopyBtn,
  },
};
</script>
