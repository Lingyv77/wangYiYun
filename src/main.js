import { createApp } from 'vue' //v3之前 import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import VueLazyLoad from 'vue3-lazy'

import evetnBus from './plugs/evetnBus'

//v3之前 new Vue({})
const app = createApp(App) 
app.config.globalProperties.$bus = evetnBus;

app
.use(router)
.use(store)
.use(VueLazyLoad,
  {
    loading: require('./assets/lazyload/doing.gif'),
    error: require('./assets/lazyload/fail.jpg')
  })

.mount('#app');
// const crypto = require('crypto');

// const password = 'keykeykeykeykeykeykeykey';

// // 首先，将生成密钥。密钥长度取决于算法。
// // 在此示例中，用于 aes192，长度是 24 个字节（192 位）。
// const nonce = crypto.randomBytes(12);


// const cipher = crypto.createCipheriv('aes-192-gcm', password, nonce);
// let encrypted = cipher.update('13395738963&15579853376.d', 'utf8', 'hex');
// console.log(encrypted);


