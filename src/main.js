import './assets/main.css';
import 'vue-loading-overlay/dist/css/index.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import axios from 'axios';
import VueAxios from 'vue-axios';
// import Loading from 'vue-loading-overlay';
import { LoadingPlugin } from 'vue-loading-overlay';
import VueSweetalert2 from 'vue-sweetalert2';

// veeValidate
import {
  Form, Field, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import * as AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import GlobalVariables from './GlobalVariableHolder';

import App from './App.vue';
import router from './router';

const swlOptions = {
  color: '#261005',
  background: '#FFFFF9',
  confirmButtonColor: '#5C270D',
  cancelButtonColor: '#b91c1c',
};

// veeValidate
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});
setLocale('zh_TW'); // 設定預設語系

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(VueAxios, axios);
app.use(VueSweetalert2, swlOptions);
app.use(LoadingPlugin);
// app.component('LoadingOverlay', Loading);
app.component('VForm', Form);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);

GlobalVariables.variables = app.config.globalProperties;

app.mount('#app');
