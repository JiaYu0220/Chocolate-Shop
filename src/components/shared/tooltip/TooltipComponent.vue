<template>
  <div role="tooltip"
    class="absolute top-full left-1/2
    -translate-x-1/2 translate-y-1/2
    opacity-0 pointer-events-none
    hover:opacity-100 hover:translate-y-3
    hover:pointer-events-auto
    group-hover:opacity-100 group-hover:translate-y-1
    group-hover:pointer-events-auto
    group-focus:opacity-100 group-focus:translate-y-1
    group-focus:pointer-events-auto
    transition-all duration-300
    bg-primary-50 p-3 rounded
    before:absolute before:content-[''] before:bottom-full before:left-1/2
    before:-translate-x-1/2
    before:border-b-8 before:border-x-8
    before:border-b-primary-50 before:border-x-transparent drop-shadow-md">
    <slot></slot>
  </div>
</template>
