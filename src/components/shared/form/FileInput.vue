<template>
  <label ref="input" for="imageInput"
      class="flex flex-col items-center justify-center
      p-4 text-stone-400 text-center border-4 rounded-md
      cursor-pointer w-full relative duration-150 text-sm md:text-base
      hover:bg-stone-100"
      :class="isDragfile?'border-primary-300': 'border-stone-300 border-dashed'">
        <i class="bi bi-file-earmark-image-fill text-2xl"></i>
        <p>請拖曳圖片檔案到此區，或點擊後選取圖片檔案</p>
        <p v-if="isMultiple">可上傳多個檔案</p>
        <p>PNG、JPG、JPEG，檔案大小須為 3MB 以下</p>
        <input class="opacity-0 absolute w-full h-full cursor-pointer"
        type="file" accept=".png, .jpg, .jpeg" id="imageInput"
        ref="imageFile" title="" :multiple="isMultiple"
        :disabled="isLoading"
        @change="handleChange"
        @dragover="isDragfile = true"
        @drop="isDragfile = false"
        @dragleave="isDragfile = false">
        <div v-if="isLoading" class="absolute w-full h-full bg-primary-50 opacity-80
        flex items-center justify-center">
        <IconLoading size="lg"></IconLoading></div>
      </label>
</template>

<script>
import IconLoading from '@/components/icons/IconLoading.vue';
import { mapState, mapActions } from 'pinia';
import loadingStore from '@/stores/loadingStore';
import swalStore from '@/stores/swalStore';

const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data() {
    return {
      isDragfile: false,
    };
  },
  components: {
    IconLoading,
  },
  props: {
    returnUrl: {
      type: Boolean,
      default: false,
    },
    isMultiple: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
    },
  },
  methods: {
    handleChange($event) {
      if (this.returnUrl) {
        // emit 傳出 url
        if (this.isMultiple) {
          this.uploadMultiImg($event); // 多檔案
        } else {
          this.uploadImg($event); // 單一檔案
        }
      } else {
        // emit 傳出 input 的 $event
        this.$emit('emitChange', $event);
      }
    },
    async uploadImg(event) {
      try {
        this.loadingStatus.imageUrl = true;

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file-to-upload', file);
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/upload`;
        const { data } = await this.$http.post(url, formData);
        this.$emit('emitChange', data.imageUrl);

        this.loadingStatus.imageUrl = false;
      } catch (error) {
        this.loadingStatus.imageUrl = false;
        // 通知
        const dialog = event.target.closest('dialog');
        this.apiErrorSwal(error, dialog);
      }
    },
    async uploadMultiImg(event) {
      try {
        this.loadingStatus.imagesUrl = true;

        const { files } = event.target;
        const url = `${VITE_URL}/api/${VITE_PATH}/admin/upload`;

        // 多個圖片的 promise
        const promiseArr = Object.values(files).map(async (file) => {
          const formData = new FormData();
          formData.append('file-to-upload', file);
          const response = await this.$http.post(url, formData);
          return response.data.imageUrl;
        });

        // axios
        const resArr = await Promise.all(promiseArr);
        this.$emit('emitChange', resArr);

        // 清空
        const targetInput = event.target;
        targetInput.value = ''; // 不能直接改 event.target.value

        this.loadingStatus.imagesUrl = false;
      } catch (error) {
        this.loadingStatus.imagesUrl = false;
        // 通知
        const dialog = event.target.closest('dialog');
        this.apiErrorSwal(error, dialog);
      }
    },
    ...mapActions(swalStore, ['apiErrorSwal']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
