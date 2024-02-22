<template>
  <Transition name="accordion">
    <slot></slot>
  </Transition>
</template>
<style>
.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.5s ease-in-out;
}

.accordion-enter-from,
.accordion-leave-to {
  height: 0;
}
</style>
