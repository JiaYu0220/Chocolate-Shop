<template>
  <!-- 打開 modal 按鈕 -->
  <button type="button" class="btn btn-primary-light" @click="$refs.cropperModal.showModal()">
    <i class="bi bi-scissors mr-1"></i>裁剪圖片小工具
  </button>
  <!-- modal -->
  <FormModal ref="cropperModal" target="cropperModal" @reset-form="clear">
    <!-- modal 標題 -->
    <template #title="{ titleClass }">
      <h3 :class="titleClass">裁剪圖片小工具</h3>
    </template>
    <!-- 上傳檔案 input -->
    <p class="mb-2">請選擇圖片檔案或貼上圖片網址：</p>
    <FileInput @emit-change="upload" class="mb-3" />
    <FormFloat :label-for="'imgUrl'" :label="'圖片網址'" class="mb-3">
      <template #default="{ inputClass }">
        <input
          type="text"
          name="圖片"
          id="imgUrl"
          :class="inputClass"
          v-model="option.img"
          placeholder
        />
      </template>
      <template #icon="{ iconClass }" v-if="option.img">
        <button type="button" :class="iconClass" @click="clear">
          <i class="bi bi-x text-xl"></i>
        </button>
      </template>
    </FormFloat>

    <!-- 裁剪區 -->
    <div class="h-[200px] w-full md:h-[400px]" v-if="option.img">
      <VueCropper
        ref="cropper"
        :img="option.img"
        center-wrapper
        :output-size="option.outputSize"
        :output-type="option.outputType"
        :info="option.info"
        :full="option.full"
        :fixed="fixed"
        :fixed-number="fixedNumber"
        :can-move="option.canMove"
        :can-move-box="option.canMoveBox"
        :can-scale="option.canScale"
        :original="option.original"
        :auto-crop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :center-box="option.centerBox"
        :high="option.high"
        :max-img-size="option.maxImgSize"
        :mode="option.mode"
      >
      </VueCropper>
    </div>

    <!-- 下載裁剪圖片 -->
    <div class="mt-5 flex">
      <FormFloat
        v-if="option.img"
        :label-for="'fileName'"
        :label="'下載的檔案名稱'"
        class="flex-grow"
      >
        <template #default="{ inputClass }">
          <input
            type="text"
            name="檔案名稱"
            id="fileName"
            class="rounded-r-none"
            :class="inputClass"
            v-model="fileName"
            placeholder
          />
        </template>
      </FormFloat>
      <button
        type="button"
        v-if="option.img"
        class="btn btn-primary text-nowrap rounded-l-none"
        @click="download"
      >
        下載
      </button>
    </div>
  </FormModal>
</template>

<script>
import FormFloat from '@/components/shared/form/FormFloat.vue';
import FileInput from '@/components/shared/form/FileInput.vue';
import FormModal from '../modal/FormModal.vue';

export default {
  data() {
    return {
      previews: {},
      cropperUrl: '',
      fileName: this.downName,
      option: {
        img: '',
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        full: true, // 是否输出原图比例的截图
        outputType: 'png', // 裁剪生成图片的格式
        original: false, // 上传图片按照原始比例渲染
        canScale: false, // 图片是否允许滚轮缩放
        canMove: false, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        autoCrop: true, // 是否默认生成截图框，开启後宽度高度才生效
        autoCropWidth: 750, // 默认生成截图框宽度
        autoCropHeight: 500, // 默认生成截图框高度
        centerBox: true, // 截图框是否被限制在图片里面
        high: true, // 是否按照设备的dpr 输出等比例图片
        maxImgSize: 99999, // 限制图片最大宽度和高度
        mode: 'contain',
      },
      fixed: true,
      fixedNumber: [4, 3],
    };
  },
  components: {
    FormFloat,
    FileInput,
    FormModal,
  },
  props: {
    downName: String,
  },
  watch: {
    downName() {
      this.fileName = this.downName;
    },
  },
  methods: {
    upload(event) {
      if (event.target.files.length) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = window.URL.createObjectURL(new Blob([e.target.result]));
          this.option.img = data;
        };
        // reader.readAsDataURL(file) 轉為 base64
        reader.readAsArrayBuffer(file); // 轉為 blob
      }
    },
    download() {
      // event.preventDefault()
      const aLink = document.createElement('a');
      aLink.download = this.fileName;
      // 输出 blob
      this.$refs.cropper.getCropBlob((data) => {
        this.cropperUrl = window.URL.createObjectURL(data);
        aLink.href = this.cropperUrl;
        aLink.click();
      });
    },
    clear() {
      this.option.img = '';
    },
    // closeCropperModal() {
    //   this.$refs.cropperModal.closeModal();
    //   this.clear();
    // },
    // finish() {
    //   this.$refs.cropper.getCropBlob((data) => {
    //     this.cropperUrl = window.URL.createObjectURL(data);
    //     this.postImg(data);
    //   });
    // },
  },
};
</script>
