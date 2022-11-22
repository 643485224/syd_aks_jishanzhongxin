import {
  http,
  baseURL
} from "@/api/conf/index-json";
import Qs from 'qs'


// 上传文件
export const upload = (file = {}, updateProgress) => {
  console.log(updateProgress);
  return http.post(`${baseURL}/upload`, {
    multipartFile: file
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    // `onUploadProgress` 允许为上传处理进度事件
    // 浏览器专属
    onUploadProgress: function (progressEvent) {
      // 处理原生进度事件
      // const complete = parseInt(
      //     ((progressEvent.loaded / progressEvent.total) * 100) | 0,
      //     10
      // )
      if (progressEvent.lengthComputable) {
        updateProgress && updateProgress(progressEvent)
      }
    },
  }).then(res => res.data)
};
// 上传图片
export const uploadImage = (file = {}) => {
  return http.post(`${baseURL}/upload-image`, {
    multipartFile: file
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res.data)
};


// 文件删除
export const fileDelete = (parmas = {}) => {
  return http.post(`${baseURL}/fileDelete`, parmas).then(res => res.data)
};
