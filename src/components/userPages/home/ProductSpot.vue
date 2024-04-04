<template>
  <div class="absolute">
    <button
      type="button"
      class="group block select-none rounded-full border-8 border-primary-100 bg-transparent p-1"
    >
      <!-- 波紋動畫 -->
      <div
        v-for="i in 2"
        :key="i"
        class="absolute left-0 top-0 h-full w-full animate-[ping_2s_ease_infinite] rounded-full
          border border-primary-100"
        :class="{ 'animate-delay-500': i === 2 }"
      ></div>
      <!-- tooltip -->
      <RouterLink :to="`/product/${product.id}`">
        <TooltipComponent class="flex">
          <div class="mr-2 h-16 w-16 rounded sm:h-20 sm:w-20">
            <img class="h-full w-full object-cover" :src="product.imageUrl" alt="產品圖" />
          </div>
          <div class="text-start text-sm sm:text-base">
            <p class="text-nowrap font-bold">{{ product.title }}</p>
            <p>NT$ {{ product.price }}</p>
            <span class="link">查看商品</span>
          </div>
        </TooltipComponent>
      </RouterLink>
    </button>
  </div>
</template>
<script>
import TooltipComponent from '@/components/shared/tooltip/TooltipComponent.vue';

export default {
  components: { TooltipComponent },
  props: {
    product: Object,
  },
};
</script>
<style>
.animate-delay-500 {
  animation-delay: 0.5s;
}
</style>
