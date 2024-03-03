<template>
  <Transition name="accordion">
    <slot></slot>
  </Transition>
</template>
<style>
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.3s ease-in-out;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0;
}
</style>
