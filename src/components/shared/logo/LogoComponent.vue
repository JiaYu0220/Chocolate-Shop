<template>
  <h1 :class="`font-zenMaru text-${size} text-primary-800 text-center logoShadow`">
    / 可_可 \
  </h1>
</template>
<style>
.logoShadow{
  text-shadow: 2px 0 0 #261005;
}
</style>
<script>
export default {
  props: ['size'],
};
</script>
