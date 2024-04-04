<template>
  <button type="button" :disabled="isLoading">
    <IconLoading v-if="isLoading" />
    <slot></slot>
  </button>
</template>
<script>
import IconLoading from '@/components/icons/IconLoading.vue';

export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    IconLoading,
  },
};
</script>
