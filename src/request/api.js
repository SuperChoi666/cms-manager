// import axios from 'axios'  //解释说明需要
import request from './request'


// 注册
export const RegisterApi = (params) => request.post('/register', params)


// 登录A
export const LoginApi = (params) => request.post('/login', params)

// 获取文章列表
export const ArticleListApi = (params) => request.get('/article', { params })

// 添加文章
// post不需要解构，可以直接用
export const ArticleAddApi=(params)=> request.post('/article/add',  params )


// 辅助理解get参数【//解释说明需要】
// axios.get({
//     // data:{ //get需要解构数据,获取数据的原型
//     //     num:1
//     // },
//     params:{ //结构出params则得到num数据
//         num:1
//     }
// })

// axios.post({
//     num:1
// })