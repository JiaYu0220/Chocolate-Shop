import GlobalVariables from '@/GlobalVariableHolder';
import { defineStore } from 'pinia';

const { $swal } = GlobalVariables.variables;

export default defineStore('swalStore', {
  actions: {
    swalToast(title, container = 'body') {
      return $swal({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        title,
        icon: 'success',
        target: container, // dialog 使用 swal 時，要將 swal 的容器新增在 dialog 內 (預設為 body)
      });
    },
    delSwal(type, item, container = 'body') {
      const str = `確定要刪除${type}「${item}」嗎？`;

      return $swal({
        customClass: {
          confirmButton: 'btn btn-danger mr-3',
          cancelButton: 'btn btn-outline-cancel',
          title: 'text-2xl',
        },
        target: container, // dialog 使用 swal 時，要將 swal 的容器新增在 dialog 內 (預設為 body)
        buttonsStyling: false,
        title: str,
        text: '注意：刪除後無法復原！',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '確定刪除',
        cancelButtonText: '先不要刪',
      });
    },
    confirmSwal(title, container = 'body') {
      return $swal({
        customClass: {
          confirmButton: 'btn btn-primary mr-3',
          cancelButton: 'btn btn-outline-cancel',
          title: 'text-2xl',
        },
        target: container, // dialog 使用 swal 時，要將 swal 的容器新增在 dialog 內 (預設為 body)
        buttonsStyling: false,
        title,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '提交訂單',
        cancelButtonText: '取消',
      });
    },
  },
});
