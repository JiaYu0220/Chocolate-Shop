<template>
  <div :class="$attrs.class">
    <div class="relative">
      <slot :input-class="[{ 'border-red-600': errors && errors[label] }, inputStyle]"></slot>
      <label
        :for="labelFor"
        class="absolute left-1 top-3 -translate-y-1/2 scale-90 pl-1 text-stone-500 duration-150
          peer-placeholder-shown:top-7 peer-placeholder-shown:scale-100 peer-placeholder-shown:pl-2
          peer-placeholder-shown:text-stone-500 peer-required:after:ml-1
          peer-required:after:text-red-600 peer-required:after:content-['*'] peer-focus:top-3
          peer-focus:scale-90 peer-focus:pl-1 peer-focus:text-stone-400"
      >
        <slot name="label">{{ label }}</slot>
      </label>
      <slot
        name="icon"
        icon-class="absolute right-0 p-2 top-1/2 -translate-y-1/2 bg-primary-50 border-r border-stone-300 rounded"
      ></slot>
    </div>
    <ErrorMessage v-if="errors" :name="label" class="ml-3 mt-1 text-red-600" />
  </div>
</template>

<script>
export default {
  props: {
    labelFor: String,
    label: String,
    errors: Object,
  },
  data() {
    return {
      inputStyle: 'w-full pt-5 form-control  read-only:bg-stone-50 peer',
    };
  },
};
</script>
