[TOC]

# 说明

对微信小程序请求方法 `wx.request` 封装，支持 `axios` 的方式调用

## 安装

```sh
yarn add @hotsuitor/axios-wx
```

## 使用

```js
import axios from '@hotsuitor/axios-wx'
```

使用方式和`axios`相同
支持：
- [x] `baseURL`公共配置
- [x] 函数方式调用
- [x] 创建实例
- [x] 快捷方法
- [x] 请求拦截
- [x] 取消请求

### 配置说明

```js
// 配置示例
axios({
  url: '', // 请求url
  method: '', // 请求方法
  headers: {}, // 请求头
  data: '', // 请求参数
})
```
### 函数方式调用

```js
axios({
  url: 'https://httpbin.org/get',
  method: 'get'
}).then(res => {

}).catch(err => {

})
```
### 实例方式
```js
let instance = axios.create({
  headers: {
    token: 'token'
  }
})
instance({
  url: 'https://httpbin.org/get',
  method: 'get'
})
```
### 快捷方法
支持微信小程序 `[wx.request](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)` 支持的所有方法

```js
axios.get(url, data)
```
```js
axios.post(url, data)
```

### 拦截器

请求拦截
```js
axios.interceptor.request.use((config) => {
  return config
})
```
响应拦截
```js
axios.interceptor.response.use((res) => {
  return res
})
```

### 取消请求

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/user/12345', {
  cancelToken: new CancelToken(function executor(c) {
    // An executor function receives a cancel function as a parameter
    cancel = c;
  })
});

// cancel the request
cancel();
```

## 参与开发

1. git clone 代码
2. 安装依赖
3. 配置 Git hook
3.1 `npx husky install`
3.2 `npx husky set pre-commit "npx lint-staged"`
3.3 提示：因为没有将钩子 '.husky/pre-commit' 设置为可执行，钩子被忽略。
设置执行权限 `chmod +x .husky/pre-commit`
