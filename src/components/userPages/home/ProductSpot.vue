<template >
  <div class="absolute">
    <button type="button" class="block border-8 border-primary-100 rounded-full
    bg-transparent p-1 select-none group">
      <!-- 波紋動畫 -->
      <div v-for="i in 2" :key="i"
      class="absolute top-0 left-0
      border border-primary-100 rounded-full w-full h-full animate-[ping_2s_ease_infinite]"
      :class="{ 'animate-delay-500': i === 2 }">
      </div>
      <!-- tooltip -->
      <RouterLink :to="`/product/${product.id}`">
        <TooltipComponent class="flex">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded mr-2">
            <img class="object-cover w-full h-full" :src="product.imageUrl" alt="產品圖">
          </div>
          <div class="text-start text-sm sm:text-base">
            <p class="font-bold text-nowrap">{{ product.title }}</p>
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
  .animate-delay-500{
  animation-delay: 0.5s;
}
</style>
