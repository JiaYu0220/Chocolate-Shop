<template>
  <Transition
    :name="direction"
    :enter-active-class="`animate__animated
  animate__${entranceAnim} animate__faster`"
    :leave-active-class="`animate__animated
  animate__${exitAnim} animate__faster`"
    @after-leave="onAfterLeave"
  >
    <dialog
      v-show="isShow"
      ref="modal"
      class="backdrop:bg-stone-900/45"
      :class="[{ 'backdrop:bg-transparent': !isShow }, $attrs.class]"
      @cancel.prevent="closeModal"
    >
      <slot></slot>
    </dialog>
  </Transition>
</template>
<script>
import { mapActions } from 'pinia';
import scrollStore from '@/stores/scrollStore';

export default {
  props: {
    direction: {
      type: String,
      default: 'center',
    },
  },
  data() {
    return {
      modal: null,
      isShow: false,
      entranceAnim: 'fadeIn',
      exitAnim: 'fadeOut',
    };
  },
  mounted() {
    this.modal = this.$refs.modal;
    switch (this.direction) {
      case 'right':
        this.entranceAnim = 'slideInRight';
        this.exitAnim = 'slideOutRight';
        break;
      case 'left':
        this.entranceAnim = 'slideInLeft';
        this.exitAnim = 'slideOutLeft';
        break;
      case 'up':
        this.entranceAnim = 'slideInUp';
        this.exitAnim = 'slideOutDown';
        break;
      case 'down':
        this.entranceAnim = 'slideInDown';
        this.exitAnim = 'slideOutUp';
        break;
      default:
        break;
    }
  },
  methods: {
    showModal() {
      this.getCurrentScroll();
      this.disableScroll();
      this.modal.showModal();
      this.isShow = true;
    },
    closeModal() {
      this.isShow = false;
      this.enableScroll();
      this.$emit('afterClose');
    },
    onAfterLeave() {
      this.modal.close();
    },
    // 點擊 dialog 以外區域可以關閉，但關閉 swal 時 dialog 也會一起被關掉
    // clickAround($event) {
    //   const dialogRect = this.modal.getBoundingClientRect();
    //   if (
    //     $event.clientX < dialogRect.left
    //     || $event.clientX > dialogRect.right
    //     || $event.clientY < dialogRect.top
    //     || $event.clientY > dialogRect.bottom
    //   ) {
    //     this.closeModal();
    //   }
    // },
    ...mapActions(scrollStore, ['getCurrentScroll', 'disableScroll', 'enableScroll']),
  },
};
</script>
