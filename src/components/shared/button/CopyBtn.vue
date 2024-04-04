<template>
  <button type="button" @click="copy(text)">
    <div class="relative">
      <i class="bi bi-copy"></i>
      <TransitionFade>
        <div
          v-if="isCopy"
          class="absolute bottom-full right-0 isolate z-10 m-1 text-nowrap rounded bg-primary-100
            p-1 text-sm text-primary-800 shadow-sm"
        >
          {{ isFail ? '複製失敗' : `已複製${msg}` }}
        </div>
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
