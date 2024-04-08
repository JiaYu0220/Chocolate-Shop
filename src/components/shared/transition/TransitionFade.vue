<template>
  <Transition
    name="fade"
    enter-active-class="animate__animated animate__fadeIn animate__faster"
    leave-active-class="animate__animated animate__fadeOut animate__faster"
    @after-leave="$emit('onAfterLeave')"
    :mode="mode"
  >
    <slot></slot>
  </Transition>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'default',
    },
  },
};
</script>
