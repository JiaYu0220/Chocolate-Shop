<template>
  <button type="button"  @click="copy(text)">
    <i class="bi bi-clipboard-fill"></i>
    <TransitionFade>
      <div v-if="isCopy" class="isolate absolute bottom-full right-0 p-1 m-1 bg-primary-100
      text-primary-800 rounded z-10 text-nowrap text-sm shadow-sm">
      已複製圖片網址</div>
  </TransitionFade>
  </button>
</template>
<script>
import TransitionFade from '../transition/TransitionFade.vue';

export default {
  data() {
    return {
      isCopy: false,
    };
  },
  components: {
    TransitionFade,
  },
  props: {
    text: {
      type: String,
    },
  },
  methods: {
    async copy(text) {
      try {
        await navigator.clipboard.writeText(text);
        this.isCopy = true;

        setTimeout(() => {
          this.isCopy = false;
        }, 700);
      } catch (error) {
        // console.log('複製失敗');
      }
    },
  },
};
</script>
