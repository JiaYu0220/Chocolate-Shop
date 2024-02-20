<!-- https://flowbite.com/docs/forms/floating-label/ -->
<template>
  <div class="relative">
    <VField :type="type" :id="id"
    :name="name"
    :rules="rules"
    :value="value"
    @input="$emit('update:value', $event.target.value)"
    :class="{'border-red-600': errors[name] }"
    class="w-full rounded-md border-gray-400 bg-primary-50 pt-5 focus:ring
    focus:ring-primary-800 focus:ring-opacity-50 focus:border-primary-800 peer"
    placeholder=""></VField>
    <label :for="id" class="absolute left-1 top-3
      -translate-y-1/2 scale-90 text-gray-500 pl-1 peer-placeholder-shown:top-1/2
      peer-placeholder-shown:scale-100 peer-placeholder-shown:text-primary-950
      peer-placeholder-shown:pl-2
      peer-focus:top-3 peer-focus:scale-90
      peer-focus:text-gray-500 peer-focus:pl-1 duration-150">
    <slot></slot>
    </label>
    <slot name="icon"></slot>
  </div>
  <ErrorMessage :name="name" class="text-red-600 mt-1 ml-3"></ErrorMessage>
</template>
<script>
export default {
  props: ['id', 'name', 'type', 'rules', 'value', 'errors'],
};

</script>
