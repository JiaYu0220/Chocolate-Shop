<template>
  <div v-if="canEdit" class="flex items-center justify-between pb-4">
    <p>共 {{ cartNum }} 項商品</p>
    <button class="btn btn-link text-orange-800" type="button" @click="delAllCart(swalContainer)">
      清空購物車
    </button>
  </div>
  <p v-else class="pb-4">共 {{ myNum }} 項商品</p>
  <ul ref="cardList" class="flex flex-col gap-6 sm:gap-8">
    <CartCard
      v-for="cart in myCarts"
      :key="cart.id"
      :cart="cart"
      :can-edit="canEdit"
      :swal-container="swalContainer"
    />
  </ul>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import CartCard from '@/components/userPages/cart/CartCard.vue';

export default {
  props: {
    propCarts: {
      type: Object,
      default: null,
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    CartCard,
  },
  data() {
    return {
      swalContainer: null,
    };
  },
  mounted() {
    this.swalContainer = this.$refs.cardList.closest('dialog') || 'body';
  },
  methods: {
    ...mapActions(cartStore, ['delAllCart']),
  },
  computed: {
    myCarts() {
      return this.propCarts !== null ? this.propCarts : this.carts;
    },
    myNum() {
      return this.propCarts !== null ? Object.keys(this.propCarts).length : this.cartNum;
    },
    ...mapState(cartStore, ['cartNum', 'carts']),
  },
};
</script>
