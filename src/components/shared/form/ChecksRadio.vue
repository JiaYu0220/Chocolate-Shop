<template>
  <div class="flex items-center">
    <slot
      inputClass="rounded-sm border-stone-400 bg-primary-50 text-primary-800 mr-2 focus:ring focus:ring-primary-800 focus:ring-opacity-50 focus:border-primary-80"
    ></slot>
    <label :for="labelFor">{{ label }}</label>
  </div>
</template>
<script>
export default {
  props: {
    labelFor: String,
    label: String,
  },
};
</script>
