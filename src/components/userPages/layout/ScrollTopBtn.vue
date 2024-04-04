<template>
  <transition
    name="anim"
    :enter-active-class="`animate__animated animate__fadeInUp animate__faster`"
    :leave-active-class="`animate__animated animate__fadeOutDown animate__faster`"
  >
    <div v-if="isShow" class="fixed bottom-[10%] right-[5%] z-10">
      <button
        type="button"
        class="btn btn-primary-light rounded-full shadow-sm shadow-primary-800/50"
        @click="scrollToTop"
      >
        <i class="bi bi-chevron-up text-shadow"></i>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    handleScroll() {
      const threshold = 500;
      if (window.scrollY > threshold) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
};
</script>

<style scoped>
.icon-bold {
  text-shadow:
    1px 0,
    -1px 0,
    0 1px,
    0 -1px;
}
</style>
