<template>
  <div class="container py-10">
    <div class="mb-8 border-b-2 border-primary-200 pb-10">
      <h2 class="text-center text-2xl font-bold tracking-widest text-primary-800">關於我們</h2>
    </div>
    <ul>
      <li
        v-for="item in aboutUs"
        :key="item.title"
        class="mb-10 flex flex-col items-center gap-4 md:flex-row md:odd:flex-row-reverse"
      >
        <div class="max-h-80 w-full overflow-hidden rounded-sm md:w-1/2">
          <img class="h-full w-full object-cover" :src="item.image" alt="巧克力" />
        </div>
        <div class="w-full md:w-1/2">
          <h3 class="mb-2 text-lg font-bold text-primary-800 md:text-xl">
            {{ item.title }}
          </h3>
          <p class="md:text-lg">{{ item.content }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      aboutUs: [
        {
          title: '我們的故事',
          content:
            '在黑巧克力的世界裡，我們是熱愛品質和風味的信徒。我們的故事開始於對巧克力的熱愛，以及對於健康和美味的不懈追求。我們相信，黑巧克力不僅是一種享受，更是一種生活方式。',
          image:
            'https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1710869127163.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=eBZNWmKlHeVmt6zjKmZyPiRW1DCeMmdHu7ko85bt1ZCVNR6TnO2EIEF4ExLtwlzXscUjalN8eaaLJmEC9mmEomH8aD1UZV50S5hnR4fz2Q1NynPcuJ077JRXXRkKhbd9B43uCOR2qqpJ69ikGGppZvcnXkdW8yVIKIxzggMNRXBwkuWUFMYaNF67CBfpNgqwCTZln6wAH2MrcEwbRZfvG0xglq8sXkJ0VMs1ySAAAybkWmH6l7sPeB3%2FtmubbPl6LV0ZrYf4G%2BAHWvsuytxzo%2B9bofjl%2BqR%2FNZDqx3xgnUeUcmjobx8M%2FLsM%2FltcZm%2Bubz2OOSSw9lA4upcCUZmI7w%3D%3D',
        },
        {
          title: '我們的使命',
          content:
            '我們的使命是將最高品質的黑巧克力帶給每一位顧客，讓他們在每一口中感受到真正的滿足和喜悅。我們致力於尋找全球最優質的可可豆，並通過嚴格的工藝和精心的製作過程，將它們變成絕妙的黑巧克力。',
          image:
            'https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1710869138623.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=SZQehly4BnckRORbgncY84%2F0qb5eBdGG0r4xdun%2FgWyvFtjcHtfgraEPgjp33TzKKnsIUKCnQXNnTelwJo28JzhsM24Qhu%2Fxk5rVj%2BoO68KzGyA9dXap%2FvWRBskjFokIdKJYER4d7P7YIGANCVxvIg8GCKd5SEFNpTyYLoNel1GAABczbK%2BYo4EDQjwnbWmX8OTJ%2BR%2Bvel08d4rqA6pX2jkWMhJlM5wIKB6hBZxsZEkxo65PvAw%2BoQgDPRaJQr3TiIi4G%2FovnAgqnwzlr3FAfIZ%2F%2Fmiqh9aycc3bcgWKtdoa%2BIWQdBjlCTrHvhk6AfCw9MvnSzSbE5H4OsY14lGfww%3D%3D',
        },
        {
          title: '我們的承諾',
          content:
            '無論您是對黑巧克力新手還是業餘愛好者，我們都致力於為您提供最好的產品和服務。我們的黑巧克力不僅是一種享受，更是一種精緻的品味體驗。請加入我們，一起探索黑巧克力的奇妙世界！',
          image:
            'https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1710869138998.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Phn6h72qJbbrU1pXlLXYJfXZ7m9BTZ1PNziUkZL7OzTDIIR47M2ZalTEMDSunD0ln334aJ6zqfc7UtM3iuVfw4dv%2BEtiB%2F78tth1zFxVO%2FM3Yd5E1elCbPNAHJ%2FsyfeeJCF47JiZ5gVzbgew8oJ0l7%2B4Zh31BRCrtmcCFqSaxFRzHDIkNuJpp5YKm5CjfhKB0661z6AQsvmGeIGD7RPYzazn8bPG2lXkT%2FioGAkjEwnfKrJQM1sxrU5pjZmWZ7eusQqnjMCr73O4DZsYVTwy6hR5E1LT71f8ovZvO4iOGBU%2FszFhLOXXKDUFclu8jusPWdpFFEFC%2B7i7v4NnT3Z%2Bkg%3D%3D',
        },
      ],
    };
  },
};
</script>
