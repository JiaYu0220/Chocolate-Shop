<template>
  <button type="button" @click="copy(text)">
    <div class="relative">
      <i class="bi bi-copy"></i>
      <TransitionFade>
        <div v-if="isCopy" class="isolate absolute bottom-full right-0 p-1 m-1 bg-primary-100
        text-primary-800 rounded z-10 text-nowrap text-sm shadow-sm">
        {{isFail ? '複製失敗' : `已複製${ msg }`}}</div>
      </TransitionFade>
    </div>
  </button>
</template>
<script>
import TransitionFade from '../transition/TransitionFade.vue';

export default {
  data() {
    return {
      isCopy: false,
      isFail: false,
    };
  },
  components: {
    TransitionFade,
  },
  props: {
    text: {
      type: String,
    },
    msg: {
      type: String,
    },
  },
  methods: {
    async copy(text) {
      try {
        await navigator.clipboard.writeText(text);
        this.isFail = false;
        this.isCopy = true;

        setTimeout(() => {
          this.isCopy = false;
        }, 700);
      } catch (error) {
        this.isFail = true;
      }
    },
  },
};
</script>
