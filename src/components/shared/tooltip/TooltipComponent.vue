<template>
  <div
    role="tooltip"
    class="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 translate-y-1/2 rounded
      bg-primary-50 p-3 opacity-0 drop-shadow-md transition-all duration-300 before:absolute
      before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-x-8 before:border-b-8
      before:border-x-transparent before:border-b-primary-50 before:content-['']
      hover:pointer-events-auto hover:translate-y-3 hover:opacity-100
      group-hover:pointer-events-auto group-hover:translate-y-1 group-hover:opacity-100
      group-focus:pointer-events-auto group-focus:translate-y-1 group-focus:opacity-100"
  >
    <slot></slot>
  </div>
</template>
