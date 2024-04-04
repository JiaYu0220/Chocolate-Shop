<template>
  <RouterLink :to="linkTo" v-slot="{ navigate, isExactActive }" custom>
    <li
      class="-mx-2 cursor-pointer rounded-sm px-4 py-3 transition-all duration-300
        hover:bg-primary-200 hover:text-primary-800 focus:bg-primary-200 focus:text-primary-800"
      :class="{ active: isExactActive && isQueryActive }"
      @click="
        navigate();
        $emit('handle-click');
      "
      role="link"
    >
      <slot></slot>
    </li>
  </RouterLink>
</template>
<script>
export default {
  props: {
    linkTo: [String, Object],
    isQueryActive: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['handle-click'],
};
</script>
