<template>
  <Transition
    name="fade"
    enter-active-class="animate__animated animate__fadeIn animate__faster"
    leave-active-class="animate__animated animate__fadeOut animate__faster"
    @after-leave="$emit('onAfterLeave')"
  >
    <slot></slot>
  </Transition>
</template>
