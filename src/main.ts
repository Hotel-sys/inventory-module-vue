import { createApp } from "vue";
import router from "@/router";
import App from "./App.vue";
import "./css/style.css";
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App);



app.use(VueQueryPlugin)

app.use(router);

// app.use(PrimeVue, {
//   ripple: true,
//   theme: 'none',
//   zIndex: {
//     modal: 1100,
//     overlay: 1000,
//     menu: 1000,
//     tooltip: 1100,
//     toast: 1100,
//   },
// });

app.mount("#app");
