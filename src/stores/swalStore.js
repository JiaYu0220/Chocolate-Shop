import GlobalVariables from '@/GlobalVariableHolder';
import { defineStore } from 'pinia';

const { $swal } = GlobalVariables.variables;

export default defineStore('swalStore', {
  actions: {
    swalToast(title) {
      return $swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        title,
        icon: 'success',
      });
    },
    delSwal(type, item) {
      const str = `確定要刪除${type}「${item}」嗎？`;

      return $swal({
        customClass: {
          confirmButton: 'btn btn-danger mr-3',
          cancelButton: 'btn btn-outline-cancel',
          title: 'text-2xl',
        },
        buttonsStyling: false,
        title: str,
        text: '注意：刪除後無法復原！',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '確定刪除',
        cancelButtonText: '先不要刪',
      });
    },
  },
});
