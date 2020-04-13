/* eslint-disable */
import axios from 'axios'

/**
 * 定义请求常量
 * TIME_OUT、ERR_OK
 */
export const TIME_OUT = 88888888; // 请求超时时间
export const ERR_OK = '0'; // 请求成功返回状态，字段和后台统一
export const ERR_RELOGIN = 401; //重新登录状态
export const BASE_URL = process.env.BASE_URL // 引入全局url，定义在全局变量process.env中，值为空字符串
export const HOST_URL = process.env.HOST_URL // 引入全局url，定义在全局变量process.env中，值为空字符串

// 请求超时时间
axios.defaults.timeout = TIME_OUT

// 封装请求拦截
axios.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 封装响应拦截，判断token是否过期
axios.interceptors.response.use(
    response => {
        //拦截器状态      
        Interceptor(response.data.code)
        return response;
    },
    error => {
        if (error.response) {
            //拦截器状态
            Interceptor(error.response.status)
        }
        // 返回接口返回的错误信息
        return Promise.reject(error.response.data)
    });

//拦截器状态
function Interceptor(i) {
    switch (i) {
        case 401:
            localStorage.clear()
            location.href = '/'
            break
    }
}

export default axios

// 封装post请求(requestUrl：域名公共部分,params：参数列表type:token类型ctype:上传数据格式类型)
export function POST(requestUrl, params = '', post, type, ctype) {
    //请求方式
    let method = post ? post : 'post'

    //默认登录token
    let token = window.localStorage.getItem('token')

    //token类型
    switch (type) {
        case 1: //注册token
            token = window.localStorage.getItem('regtoken')
            break
    }
    token = token != null ? token : ''

    //post请求
    if (method == 'post') {
        //设置Content-Type
        if (ctype == 1) {
            return axios({
                url: requestUrl,
                method: method,
                data: params,
                headers: {
                    'token': token,
                    'Content-Type': ctype
                }
            })
        } else if (ctype == 2) {
            return axios({
                url: requestUrl,
                method: method,
                params: params,
                headers: {
                    'token': token
                }
            })
        } else {
            return axios({
                url: requestUrl,
                method: method,
                data: params,
                headers: {
                    'token': token
                }
            })
        }

    } else {
        //get请求
        return axios({
            url: requestUrl,
            method: method,
            params: params,
            headers: {
                'token': token
            }
        })
    }
}
let htmlwidth = document.documentElement.clientWidth || document.body.clientWidth;
let htmldom = document.getElementsByTagName('html')[0];
if(htmlwidth > 750) {
	htmlwidth = 750
}
htmldom.style.fontSize = htmlwidth / 25 + 'px';