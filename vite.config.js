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
                target: 'http://121.5.133.245:3630/api',
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
}