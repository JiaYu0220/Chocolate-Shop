<template>
  <div
    class="mb-9"
    :class="{
      'flex items-center justify-between': linkTo,
      'text-center': !linkTo,
    }"
  >
    <h3 class="text-3xl font-bold text-primary-800 md:text-4xl">{{ title }}</h3>
    <RouterLink v-if="linkTo" class="link font-bold" :to="linkTo"> {{ linkText }} → </RouterLink>
  </div>
</template>

<script>
export default {
  props: ['title', 'linkTo', 'linkText'],
};
</script>
