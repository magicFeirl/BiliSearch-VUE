import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'

const inst = axios.create({
    baseURL: '/api',
    timeout: 1000 * 10
})


// 添加请求拦截器，在发请求之前会调用这个回调添加 Auth 请求头字段
// 在发送请求前加载进度条
inst.interceptors.request.use(config => {
    NProgress.start();
    return config; // 固定写法
}, () => {
    NProgress.done();
    return Promise.reject('请求出错');
});

inst.interceptors.response.use(config => {
    NProgress.done();
    return config.data; // 固定写法
});


export default inst