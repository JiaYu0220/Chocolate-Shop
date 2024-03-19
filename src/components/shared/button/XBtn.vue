<template>
  <button type="button" class="btn btn-link shadow-none">
  <i :class="`bi bi-x-lg text-${size}`"></i></button>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
      default: 'lg',
    },
  },
};
</script>
