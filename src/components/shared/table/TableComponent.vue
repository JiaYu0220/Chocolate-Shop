<template>
  <table class="w-full text-left align-middle text-sm md:text-base">
    <thead class="border-b-2 border-primary-700">
      <tr class="*:pr-1 *:md:px-2 first:*:md:pl-4 last:*:md:pr-4">
        <slot name="th"></slot>
      </tr>
    </thead>
    <tbody class="*:border-b-2 *:border-primary-200 hover:*:bg-primary-100/50">
      <slot name="tr" tr-class="*:pr-1 *:py-2 *:md:px-2 first:*:md:pl-4 last:*:md:pr-4"></slot>
    </tbody>
  </table>
</template>
