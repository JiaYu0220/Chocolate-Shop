<template>
  <RouterLink :to="linkTo"
   v-slot="{ navigate,  isExactActive }" custom>
    <li
    class="py-3 px-4 -mx-2 rounded-sm cursor-pointer transition-all duration-300
  hover:text-primary-800 hover:bg-primary-200
   focus:text-primary-800 focus:bg-primary-200"
   :class="{active : isExactActive && isQueryActive}"
    @click="navigate();handleClick()" role="link">
      <slot></slot>
    </li>
  </RouterLink>
</template>
<script>
export default {
  props: {
    linkTo: String,
    isQueryActive: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit('onClick');
    },
  },
};
</script>
