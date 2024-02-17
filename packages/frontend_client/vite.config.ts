import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        https: {
            // 这里要根据开发环境换成不同的路径!
            cert: '../../../../../ssl/full_chain.pem',
            key: '../../../../../ssl/private.key'
        }
    },
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
