import { createApp } from "vue";

import App from "./App.vue";
import store from "./store/index.js";
import router from "./router/index.js";
import "@/assets/css/main.css";

import BaseCard from "./components/BaseComponents/BaseCard.vue";
import BaseButton from "./components/BaseComponents/BaseButton.vue";
import BaseIcon from "./components/BaseComponents/BaseIcon.vue";

const app = createApp(App);
app.component("BaseCard", BaseCard);
app.component("BaseButton", BaseButton);
app.component("BaseIcon", BaseIcon);

app.use(router);
app.use(store);
app.mount("#app");



