import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "virtual:windi.css";
import "./assets/styles.css";

const app = createApp(App);

app.use(router).mount("#app");
