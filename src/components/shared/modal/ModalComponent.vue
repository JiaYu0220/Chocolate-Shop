<template>
  <TransitionFade @on-after-leave="onAfterLeave">
    <dialog v-show="isShow" :ref="target" @keydown.escape.prevent
    class="backdrop:bg-gray-950/30 rounded-md shadow-md p-8 bg-primary-50 w-full md:w-2/3 lg:w-1/2"
    :class="[{'backdrop:bg-transparent':!isShow}, $attrs.class]">
      <div class="flex mb-6">
        <slot name="title" titleClass="text-2xl font-bold"></slot>
        <button type="button"
        class="btn btn-link rounded-full shadow-none -mr-3 ml-auto -my-2" @click="closeModal">
          <i class="bi bi-x-lg text-2xl"></i>
        </button>
      </div>
      <slot></slot>
    </dialog>
  </TransitionFade>
</template>
<style>
body.modal-open{
  width: 100%;
  position: fixed;
}
</style>
<script>
import TransitionFade from '@/components/shared/transition/TransitionFade.vue';

export default {
  components: {
    TransitionFade,
  },
  props: {
    target: String,
    closeAttachMethod: Function, // 關閉之外還要再執行其他方法
  },
  data() {
    return {
      modal: null,
      isShow: false,
      topScroll: 0,
      leftScroll: 0,
    };
  },
  mounted() {
    this.modal = this.$refs[this.target];
  },
  methods: {
    showModal() {
      // 取得目前 scrollbar 位置
      this.topScroll = window.scrollY;
      this.leftScroll = window.scrollX;

      this.modal.showModal();
      this.isShow = true;
      this.disableScroll();
    },
    closeModal() {
      this.isShow = false;
      this.enableScroll();
      this.$refs[this.target].scrollTop = 0;
      // 關閉之外還要再執行其他方法
      // if (this.closeAttachMethod) {
      //   this.closeAttachMethod();
      // }
      this.$emit('resetForm');
    },
    // closeFormModal() {
    //   this.closeModal();
    //   this.$emit('closeAndReset');
    // },
    disableScroll() {
      document.body.classList.add('modal-open');
      // 搭配 position: fixed 讓背景停在現在位置
      document.body.style.top = `-${this.topScroll}px`;
    },
    enableScroll() {
      document.body.classList.remove('modal-open');
      document.body.style.top = '';
      // 讓卷軸到打開前的位置
      window.scrollTo(this.leftScroll, this.topScroll);
    },
    onAfterLeave() {
      this.modal.close();
    },
  },
};
</script>
