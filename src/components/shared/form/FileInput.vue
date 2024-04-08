<template>
  <label
    ref="input"
    for="imageInput"
    class="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-md
      border-4 p-4 text-center text-sm text-stone-400 duration-150 hover:bg-stone-100 md:text-base"
    :class="isDragfile ? 'border-primary-300' : 'border-dashed border-stone-300'"
  >
    <i class="bi bi-file-earmark-image-fill text-2xl"></i>
    <p>請拖曳圖片檔案到此區，或點擊後選取圖片檔案</p>
    <p v-if="isMultiple">可上傳多個檔案</p>
    <p>PNG、JPG、JPEG，檔案大小須為 3MB 以下</p>
    <input
      class="absolute h-full w-full cursor-pointer opacity-0"
      type="file"
      accept=".png, .jpg, .jpeg"
      id="imageInput"
      ref="imageFile"
      title=""
      :multiple="isMultiple"
      :disabled="isLoading"
      @change="handleChange"
      @dragover="isDragfile = true"
      @drop="isDragfile = false"
      @dragleave="isDragfile = false"
    />
    <div
      v-if="isLoading"
      class="absolute flex h-full w-full items-center justify-center bg-primary-50 opacity-80"
    >
      <IconLoading size="lg" />
    </div>
  </label>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import IconLoading from '@/components/icons/IconLoading.vue';
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
        if (error?.response) {
          this.apiErrorSwal(error, this.$refs.input);
        } else if (error?.code === 'ERR_NETWORK') {
          this.$swal({
            title: '上傳失敗',
            text: '上傳的檔案可能太大，請選擇小於 3MB 的檔案。',
            target: this.$refs.input,
          });
        }
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
        if (error?.response) {
          this.apiErrorSwal(error, this.$refs.input);
        } else if (error?.code === 'ERR_NETWORK') {
          this.$swal({
            title: '上傳失敗',
            text: '上傳的檔案可能太大，請選擇小於 3MB 的檔案。',
            target: this.$refs.input,
          });
        }
      }
    },
    ...mapActions(swalStore, ['apiErrorSwal']),
  },
  computed: {
    ...mapState(loadingStore, ['loadingStatus']),
  },
};
</script>
