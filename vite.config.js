import { createVuePlugin } from 'vite-plugin-vue2'
import WindiCSS from 'vite-plugin-windicss'

export default {
    plugins: [
        createVuePlugin(/* options */),
        WindiCSS()
    ],
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:4545',
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
}