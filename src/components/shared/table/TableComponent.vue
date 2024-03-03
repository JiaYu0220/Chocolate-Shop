<template>
  <table class="w-full text-sm md:text-base align-middle text-left">
    <thead class="border-b-2 border-primary-700">
      <tr>
        <slot name="th"></slot>
      </tr>
    </thead>
    <tbody>
      <slot name="tr" tr-class="border-b-2 border-primary-200 hover:bg-primary-100/50"></slot>
    </tbody>
  </table>
</template>
