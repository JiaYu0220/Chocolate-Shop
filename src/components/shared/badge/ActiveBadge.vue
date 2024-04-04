<template>
  <span
    v-if="active"
    :class="`inline-flex items-center gap-1 text-nowrap rounded-lg bg-lime-50 px-2 py-1 text-sm
      text-lime-700`"
  >
    <span :class="'hidden h-1.5 w-1.5 rounded-full bg-lime-700 md:inline-block'"></span>
    <slot name="trueMsg"></slot>
  </span>
  <span
    v-else
    :class="`inline-flex items-center gap-1 text-nowrap rounded-lg bg-orange-50 px-2 py-1 text-sm
      text-orange-700`"
  >
    <span :class="'hidden h-1.5 w-1.5 rounded-full bg-orange-700 md:inline-block'"></span>
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
