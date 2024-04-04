<template>
  <!-- nav -->
  <div class="mb-8 flex items-center justify-between">
    <h2 class="text-2xl font-bold">優惠券管理</h2>
    <LoadingBtn
      class="btn btn-primary"
      :isLoading="loadingStatus.newCoupon"
      @click="openModal('new')"
    >
      <i v-if="!loadingStatus.newCoupon" class="bi bi-plus-lg me-1"></i>新增優惠券
    </LoadingBtn>
  </div>
  <!-- table -->
  <TableComponent class="mb-8 table-auto">
    <template #th>
      <th scope="col">名稱</th>
      <th scope="col">折扣 (%)</th>
      <th scope="col">優惠碼</th>
      <th scope="col">期限</th>
      <th scope="col">啟用</th>
    </template>
    <template #tr="{ trClass }">
      <tr :class="trClass" v-for="coupon in coupons" :key="coupon.id">
        <td>{{ coupon.title }}</td>
        <td>{{ coupon.percent }}</td>
        <td>{{ coupon.code }}</td>
        <td>{{ timestampToDate(coupon.due_date) }}</td>
        <td>
          <ActiveBadge :active="coupon.is_enabled">
            <template #trueMsg>啟用</template>
            <template #falseMsg>未啟用</template>
          </ActiveBadge>
        </td>
        <td>
          <AdminActionBtns
            :data="coupon"
            loadingId="couponId"
            @open-modal="openModal"
            @del-item="delCoupon"
          >
          </AdminActionBtns>
        </td>
      </tr>
    </template>
  </TableComponent>

  <PaginationComponent :pagination="pagination" @get-data="getAdminCoupons" />

  <CouponModal
    ref="couponModal"
    :coupon="tempCoupon"
    :is-new="isNew"
    :pagination="pagination"
    @get-data="getAdminCoupons"
  />
</template>
<script>
import { mapState, mapActions } from 'pinia';
import PaginationComponent from '@/components/shared/pagination/PaginationComponent.vue';
import loadingStore from '@/stores/loadingStore';
import TableComponent from '@/components/shared/table/TableComponent.vue';
import AdminActionBtns from '@/components/adminPages/AdminActionBtns.vue';
import swalStore from '@/stores/swalStore';
import LoadingBtn from '@/components/shared/button/LoadingBtn.vue';
import helperStore from '@/stores/helperStore';
import ActiveBadge from '../../components/shared/badge/ActiveBadge.vue';
import CouponModal from '../../components/adminPages/adminCoupons/CouponModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  components: {
    TableComponent,
    PaginationComponent,
    AdminActionBtns,
    ActiveBadge,
    CouponModal,
    LoadingBtn,
  },
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
      pagination: {},
    };
  },
  mounted() {
    this.showLoading();
    this.getAdminCoupons();
  },
  methods: {
    async getAdminCoupons(page = 1) {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupons?page=${page}`;
        const res = await this.$http.get(url);
        this.coupons = res.data.coupons;
        this.pagination = res.data.pagination;
        this.hideLoading();
      } catch (error) {
        this.hideLoading();
        // 通知
        this.apiErrorSwal(error);
      }
    },
    async delCoupon(coupon) {
      try {
        const swal = await this.delSwal('優惠券', coupon.title);
        if (swal.isConfirmed) {
          // 設定按鈕 loading
          this.loadingStatus.couponId = coupon.id;
          // axios
          const url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${coupon.id}`;
          await this.$http.delete(url);
          // 取資料
          this.getAdminCoupons();
          // 通知
          this.swalToast(`已刪除優惠券「${coupon.title}」`);
          // 關閉 loading
          this.loadingStatus.couponId = '';
        }
      } catch (error) {
        // 關閉 loading
        this.loadingStatus.couponId = '';
        // 通知
        this.apiErrorSwal(error);
      }
    },
    openModal(type, item) {
      switch (type) {
        case 'new':
          this.tempCoupon = {
            is_enabled: 0,
            due_date: new Date().getTime(),
          };
          this.isNew = true;
          break;
        case 'edit':
          this.tempCoupon = { ...item };
          this.isNew = false;
          break;
        default:
          break;
      }
      this.$refs.couponModal.showModal();
    },
    ...mapActions(swalStore, ['delSwal', 'swalToast', 'apiErrorSwal']),
    ...mapActions(loadingStore, ['showLoading', 'hideLoading']),
    ...mapActions(helperStore, ['timestampToDate']),
  },
  computed: {
    ...mapState(loadingStore, ['isLoading', 'loadingStatus']),
  },
};
</script>
