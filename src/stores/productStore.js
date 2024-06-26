import { defineStore } from 'pinia';
import axios from 'axios';
import GlobalVariables from '@/GlobalVariableHolder';
import loadingStore from './loadingStore';

const { $swal } = GlobalVariables.variables;

const { hideLoading } = loadingStore();

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('productStore', {
  state: () => ({
    allProducts: [],
    currentCategory: '',
    categories: {
      基本: {
        image:
          'https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1711106225029.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Ee5k0ggZYv1ryvaL6mWGyAXyE8cxtPF2RrQYvAPsvhZe%2FDe18JH0zT5atGVuMyPuL7Nm7qbkZvUIO1qV3aKKwnEAHUhauIliBOsUr%2BmUMQb%2FZq01co2RhWFnTpkOH0YqMkyndIOBfqGoA6AylxYo8quxKvV3bPcJCiKhgaJc9AYqgH3N6b%2FNMYHi%2BwjpxhT26KReVc3XpAd1SBd4DuCqiBeOUlrkudq731tzkxMWhOaEz2u6LVAAAKFARxejLNT%2FQWnk5rs15Fqf74OL1iNMn%2BMFzKX0G23reT0xo%2BImXz4jiIdEfc2%2FlUFKB0Ks45mwvfYS8VeDHDE0mlo0YbGauA%3D%3D',
      },
      特殊口味: {
        image:
          'https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1711106225529.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Zxf66KFeLpFpGmLZDsEuFBugqa5IA99He0lg%2BQPVgGFpiRJAye1OWPvr5V3%2FydyAZIVd3qe5PgvehTLBFDxJQgPLroJz7eMlQkTr3wuSj2WyW0IzMIe4egQybXaw0CiO7hzjNA%2FY1dzxB23Bkoa2GOYqjjWfLQJ69qJlHJbJs%2B5MfEAu7Szp8gqiTUTnR8I9QcLA87O4%2FJejONR2P9VicGR7s3I%2FfRbaZUOvUD8ajq4%2F7IKFpuOB9rixWN1yVQTc3weTTz7MmI%2FJlUV%2BMo8TPXXQTZyvZPE2rZsFNXqPGMqLb4UUCu1W2HzlgltMHYQWXrFIjYvA0GcX8sjN%2FEKvRA%3D%3D',
      },
      禮盒: {
        image:
          'https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1711106225280.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=qEjg3b%2FQsjvqhubLmFMaAraTJWWUqqLqD14z1ZPrPhkNFCmyIrmErcqJWaauZHMonYVghTWItHXjqezW1aGtdhpgqa595hV2LP5%2FjXFRnvjybawWcoy5D%2FIcKoGW1EZQMwkrU47mmEs9GdPsmnpZcQP8S%2BKlERho0jGXQ4wySPs0obXe5DcfIFG6olbLF4z7KYM6c%2BL8SQrYmt2rTdtqe70F1qDUgxlOtc94z8OxpX7hVFsisGmQjv587HVCO5ErlvDAE4ICI%2FHqbbtL23BHyjfhqXs7AfZJwl%2F9vkw92WoeALXL%2BVMIOegOCozqAdJQf4isIqV8Ck%2FrC%2B7ySo8A1g%3D%3D',
      },
      料理: {
        image:
          'https://storage.googleapis.com/vue-course-api.appspot.com/jiayu/1711106225252.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=J9KBAlJcr3zCQ1yyTubEVvPOou7%2BSo8preZ6CEGDW3TkL3he6JwX8Z4wWNqjAtC5tY2xlbH2mMonBVg8rS8GmaYv58CM07o3Dy5AA0%2B4B%2F9lYVqIcsC2ESXiajpZ8nz3wcloCtbHK4oPMPWDlfb3SGC3sgwZgt1sny%2BGuYq9%2FO1o9BaarD95akKha%2BaXpRl9JpcXro2pIe5DjhPcspQUXc58SRAVum0LBb7EQHCq64GLYNH62Br44X8qWzxrbBT4A4Tu1cOtg78uqNXekyi7Ojn9hjAh8Xc138ANw1WOAA2jfaXMApBvGn524NefzE9zYqyrgg2MCz2iSJ3%2B8utwvw%3D%3D',
      },
    },
  }),
  actions: {
    async getAllProducts() {
      try {
        const url = `${VITE_URL}/api/${VITE_PATH}/products/all`;
        const res = await axios.get(url);
        this.allProducts = res.data.products;
      } catch (error) {
        hideLoading();
        // 通知
        const { message } = error.response.data;
        $swal(Array.isArray(message) ? message[0] : message);
      }
    },
    async filterProduct(key, value) {
      if (this.allProducts.length === 0) {
        await this.getAllProducts();
      }
      return this.allProducts.filter((item) => item[key] === value);
    },
    updatedCategory(category) {
      this.currentCategory = category || '全部';
    },
  },
});
