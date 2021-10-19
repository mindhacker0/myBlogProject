/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import request, { extend } from "umi-request";

const errorHandler = async (error) => {console.log(error);
  const { response, request } = error;
  return response;
};
/**
* 配置request请求时的默认参数
*/
const headers = { 
  Authorization: "",
};
const extendRequest = extend({
  errorHandler,
  // 默认错误处理
  //headers,
});

request.interceptors.request.use(async (url, options) => {
    return {
      url: `${process.env.baseUrl}${url}`,
      options: { ...options, headers: headers },
    };
});

request.interceptors.response.use(async (response, options) => {
  return response;
});

export default extendRequest;
