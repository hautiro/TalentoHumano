import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // VitePWA({
    //   registerType: "prompt",
    //   includeAssets: ["iap512x512.png", "iap32x32.png", "iap192x192.png"],
    //   manifest: {
    //     name: "Portal de clientes IAP - Admisnitracion",
    //     short_name: "IAP APP",
    //     description: "Esta es una App la administracion de IAP",
    //     theme_color: "#ffffff",
    //     start_url: "/",
    //     icons: [
    //       {
    //         src: "iap192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "iap512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "iap512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //         purpose: "any maskable",
    //       },
    //     ],
    //   },
    // }),
  ],
});
