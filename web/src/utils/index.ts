// 角度转弧度 180 -> 3.14
export function degreesToRadians(degrees: number) {
    return degrees * (Math.PI / 180);
}

// 弧度转角度 3.14 -> 180
export function radiansToDegrees(radians: number) {
    return radians * (180 / Math.PI);
}

// 单位格式化
export function formatUnit(type: string) {
    switch(type) {
        case 'revolute':
          return '°'
          break;
        case 'prismatic':
          return 'mm'
          break;
        default:
          return '°'
            break;
    }
}

// 首字母大写
export function capitalizeFirstLetter(str: string) {
  if (str.length === 0) {
      return str; // 如果字符串为空，直接返回
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 截取两位小数(没有两位则不处理)
export function reserveDecimal(val: number, num: number = 2) {
  const _val = String(val);
  const dec = _val.split('.')[1];
  if (dec && dec.length > num) {
    return Number(val).toFixed(2)
  }
  return Number(val)
}

export const openFile = function(accept: string){//文件选择
  return new Promise<Event>((reslove,reject)=>{
      let fileInput:HTMLInputElement | null = document.querySelector('input#pictureSelect');
      if(!fileInput){
          fileInput = document.createElement("input");
          fileInput.style.display = "none";
          fileInput.setAttribute("type","file");
          fileInput.setAttribute("id","pictureSelect");
          fileInput.setAttribute("accept",accept);
          fileInput.setAttribute("webkitdirectory","true");
          fileInput.setAttribute("directory","true");
          fileInput.addEventListener("change",(e)=>{
              reslove(e);
              document.body.removeChild(fileInput!);
          });
          document.body.appendChild(fileInput);
      }
      fileInput.click();
  });
};