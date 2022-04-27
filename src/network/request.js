import axios  from "axios";

//创建一个单例
const instance=axios.create({
    baseURL:'http://www.codeman.ink:3000',
    timeout:4000,
    // headers:{'Content-Type': 'application/json'},
    // headers: {'X-Requested-With': 'XMLHttpRequest'},
    // headers:{ Accept:"text/html, application/xhtml+xml, */*" },
    // headers:{"X-Requested-With":"Content-Type"},
    
    withCredentials: true
    
})
//拦截器
//请求拦截
instance.interceptors.request.use(callback=>{
    return callback;
},err=>{
    return Promise.reject(err)
})
//响应拦截
instance.interceptors.response.use(res=>{
    return res;
},rej=>{
    return Promise.reject(rej)
})
export default instance;