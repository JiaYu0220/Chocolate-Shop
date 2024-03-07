<template>
  <span v-if="active"
  :class="`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm text-nowrap
  bg-lime-50 text-lime-700`">
    <span :class="`hidden md:inline-block h-1.5 w-1.5 rounded-full bg-lime-700`"></span>
    <slot name="trueMsg"></slot>
  </span>
  <span v-else
  :class="`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm text-nowrap
  bg-orange-50 text-orange-700`">
    <span :class="`hidden md:inline-block h-1.5 w-1.5 rounded-full bg-orange-700`"></span>
    <slot name="falseMsg"></slot>
  </span>
</template>
<script>
export default {
  props: {
    active: [Boolean, Number],
  },
};
</script>
