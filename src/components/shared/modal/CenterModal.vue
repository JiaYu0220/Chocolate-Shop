<template>
  <ModalComponent ref="modal"
  class="rounded-md shadow-md p-8 bg-primary-50 w-full md:w-2/3 lg:w-1/2">
    <div class="flex justify-between mb-6">
      <slot name="title" titleClass="text-2xl font-bold"></slot>
      <XBtn class="-mt-2" @click="closeModal"></XBtn>
    </div>
    <slot></slot>
  </ModalComponent>
</template>

<script>
import ModalComponent from '@/components/shared/modal/ModalComponent.vue';
import XBtn from '@/components/shared/button/XBtn.vue';

export default {
  components: {
    ModalComponent, XBtn,
  },
  data() {
    return {
      modal: null,
    };
  },
  mounted() {
    this.modal = this.$refs.modal;
  },
  methods: {
    showModal() {
      this.modal.showModal();
    },
    closeModal() {
      this.modal.closeModal();
      this.$emit('resetForm');
    },
  },
};
</script>
