<template>
  <div class="rounded-md border border-primary-200">
    <h2 class="bg-primary-200 py-3 text-center text-lg font-bold text-primary-800 md:text-xl">
      {{ title }}
    </h2>
    <div class="p-4">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>
