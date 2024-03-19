<template>
  <div class="mb-9"
  :class="{'flex justify-between items-center':linkTo, 'text-center':!linkTo}">
    <h3 class="text-primary-800 font-bold text-3xl md:text-4xl">{{ title }}</h3>
    <RouterLink v-if="linkTo" class="link font-bold" :to="linkTo">
    {{ linkText }} →
    </RouterLink>
  </div>
</template>
<script>
export default {
  props: ['title', 'linkTo', 'linkText'],
};
</script>
