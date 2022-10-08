

// headers 响应数据请求头  data 待下载数据流
export function downloadXls(headers,data) {
    let fileName = getExportFileName(headers)
    downloadFile(data, fileName)
}
// 需传入导出数据响应头
export function getExportFileName(headers) {
    let fileName = headers['content-disposition']//获取文件名，（后台返回的文件名在响应头当中） 
    console.log(fileName);
    fileName = decodeURIComponent(fileName)//由于中文通常都是乱码，所以需要解码
    console.log(fileName);
    fileName = fileName.substring(fileName.indexOf("=") + 1)//数据处理获得名字
    return fileName;
}
//文件数据流有多种类型，需自己明确好
export function downloadFile(data, name) {
    // ContenType类型大全
    // .doc                          application/msword
    // .docx                         application/vnd.openxmlformats-officedocument.wordprocessingml.document
    // .rtf                          application/rtf
    // .xls                          application/vnd.ms-excel application/x-excel
    // .xlsx                         application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
    // .ppt                          application/vnd.ms-powerpoint
    // .pptx                         application/vnd.openxmlformats-officedocument.presentationml.presentation
    // .pps                          application/vnd.ms-powerpoint
    // .ppsx                         application/vnd.openxmlformats-officedocument.presentationml.slideshow
    // .pdf                          application/pdf
    // .swf                          application/x-shockwave-flash
    // .dll                          application/x-msdownload
    // .exe                          application/octet-stream
    // .msi                          application/octet-stream
    // .chm                          application/octet-stream
    // .cab                          application/octet-stream
    // .ocx                          application/octet-stream
    // .rar                          application/octet-stream
    // .tar                          application/x-tar
    // .tgz                          application/x-compressed
    // .zip                          application/x-zip-compressed
    // .z                            application/x-compress
    // .wav                          audio/wav
    // .wma                          audio/x-ms-wma
    // .wmv                          video/x-ms-wmv
    // .mp3 .mp2 .mpe .mpeg .mpg     audio/mpeg
    // .rm                           application/vnd.rn-realmedia
    // .mid .midi .rmi               audio/mid
    // .bmp                          image/bmp
    // .gif                          image/gif
    // .png                          image/png
    // .tif .tiff                    image/tiff
    // .jpe .jpeg .jpg               image/jpeg
    // .txt                          text/plain
    // .xml                          text/xml
    // .html                         text/html
    // .css                          text/css
    // .js                           text/javascript
    // .mht .mhtml                   message/rfc822

    const contentType = "application/vnd.ms-excel";
    const blob = new Blob([data], { type: contentType });
    console.log(blob);
    const url = window.URL.createObjectURL(blob);
    // 打开新窗口方式进行下载
    // window.open(url); 

    // 以动态创建a标签进行下载
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
}