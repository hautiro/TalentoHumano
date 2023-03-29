import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { FontAwesomeIcon } from "./plugins/font-awesome";
import router from "./routes/router";
import { createPinia } from "pinia";
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import { DefaultApolloClient } from '@vue/apollo-composable'

import 'vue3-toastify/dist/index.css';
import 'animate.css';
import { apolloClient } from './plugins/apollo-client';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
declare const window: any;

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .use(Vue3Toastify, {
      autoClose: 3000,
    } as ToastContainerOptions)
    .provide(DefaultApolloClient, apolloClient)
    .component("fw-icon", FontAwesomeIcon)
    .mount("#app");
