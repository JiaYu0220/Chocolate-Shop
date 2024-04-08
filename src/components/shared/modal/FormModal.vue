<template>
  <ModalComponent
    ref="modal"
    class="w-full rounded-md bg-primary-50 p-8 shadow-md md:w-2/3 lg:w-1/2"
  >
    <div class="mb-6 flex justify-between">
      <slot name="title" titleClass="text-2xl font-bold"></slot>
      <XBtn
        class="-mt-2"
        @click="
          closeModal();
          $emit('resetForm');
        "
      />
    </div>
    <slot></slot>
  </ModalComponent>
</template>

<script>
import ModalComponent from '@/components/shared/modal/ModalComponent.vue';
import XBtn from '@/components/shared/button/XBtn.vue';

export default {
  components: {
    ModalComponent,
    XBtn,
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
    },
  },
};
</script>
