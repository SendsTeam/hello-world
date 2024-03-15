import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        https: {
            // 这里要根据开发环境换成不同的路径!
            cert: '../../../../../tyee.life_ecc/fullchain.cer',
            key: '../../../../../tyee.life_ecc/tyee.life.key'
        }
    },
    plugins: [
        vue(),
        vueJsx(),
        components({
            resolvers: [VarletUIResolver()]
        }),
        autoImport({
            resolvers: [VarletUIResolver({ autoImport: true })]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
