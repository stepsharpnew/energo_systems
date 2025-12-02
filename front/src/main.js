import { createApp } from "vue";
import App from "./App.vue";
import gsapPlugin from "./plugins/gsap";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(gsapPlugin);

app.mount("#app");
