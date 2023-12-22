export function TimeFormate(timeStr,formStr){//时间序列化
    if(!timeStr){return ""}
    let time=new Date(timeStr),str=formStr;
    if(time!=="Invalid Date"){
       str=str.replace("yyyy",time.getFullYear());
       str=str.replace("MM",(time.getMonth()+1).toString().padStart(2,"0"));
       str=str.replace("dd",time.getDate().toString().padStart(2,"0"));
       str=str.replace("HH",time.getHours().toString().padStart(2,"0"));
       str=str.replace("mm",time.getMinutes().toString().padStart(2,"0"));
       str=str.replace("ss",time.getSeconds().toString().padStart(2,"0"));
    }
    return str;
}
export function pressImage(image, compressionRatio = .7){
	/*
    image: img object
    compressionRatio: 0 - 1
	*/
	return new Promise((resolve, reject) => {
		const [w, h] = [
			image.width * compressionRatio,
			image.height * compressionRatio,
		];
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const [anw, anh] = [
			document.createAttribute('width'),
			document.createAttribute('height'),
		];
		anw.nodeValue = w;
		anh.nodeValue = h;
		canvas.setAttributeNode(anw);
		canvas.setAttributeNode(anh);
		ctx.drawImage(image, 0, 0, w, h);
		canvas.toBlob((blob) => {
			const base64 = canvas.toDataURL('image/jpeg', compressionRatio);
			const img = new Image();
			img.src = base64;
			img.onload = () => {
				resolve([img, blob]);
			};
		}, 'image/jpeg', compressionRatio);
	});
};

export const openFile = function(accept,callback){//will not be call if user dont interact with browser.
    let fileInput = document.createElement("input");
    fileInput.setAttribute("display","none");
    fileInput.setAttribute("type","file");
    fileInput.setAttribute("accept",accept);
    fileInput.addEventListener("change",(e)=>{
        callback && callback(e);
    });
    fileInput.click();
}

export function getsearchParams(){//获取url参数
	let str=window.location.href;
	if(!str||!str.split("?")[1]){return;}
	let Parr=str.split("?")[1].split("&"),obj={};
	Parr.map(val=>{val && Object.defineProperty(obj,val.split("=")[0],{value:val.split("=")[1],enumerable:true});return val});
	return obj;
}

export function getAllUrls(){//提取页面代码中所有网址
	return document.documentElement.outerHTML.match(/(url\(|src=|href=)[\"\']*([^\"\'\(\)\<\>\[\] ]+)[\"\'\)]*|(http:\/\/[\w\-\.]+[^\"\'\(\)\<\>\[\] ]+)/gi).join("\r\n").replace(/^(src=|href=|url\()[\"\']*|[\"\'\>\) ]*$/gim,"");
}

export function base64_decode(data){//解码
	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1,
	  o2,
	  o3,
	  h1,
	  h2,
	  h3,
	  h4,
	  bits,
	  i = 0,
	  ac = 0,
	  dec = "",
	  tmp_arr = [];
	if (!data) {
	  return data;
	}
	data += "";
	do {
	  h1 = b64.indexOf(data.charAt(i++));
	  h2 = b64.indexOf(data.charAt(i++));
	  h3 = b64.indexOf(data.charAt(i++));
	  h4 = b64.indexOf(data.charAt(i++));
	  bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4;
	  o1 = (bits >> 16) & 0xff;
	  o2 = (bits >> 8) & 0xff;
	  o3 = bits & 0xff;
	  if (h3 == 64) {
		tmp_arr[ac++] = String.fromCharCode(o1);
	  } else if (h4 == 64) {
		tmp_arr[ac++] = String.fromCharCode(o1, o2);
	  } else {
		tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
	  }
	} while (i < data.length);
	dec = tmp_arr.join("");
	dec = utf8_decode(dec);
	return dec;
}

export function isMobileUserAgent() {//判断是否移动设备访问
	return /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(
		window.navigator.userAgent.toLowerCase()
	);
}

export function isMobileNumber(e) {//判断手机号码
	var i =
		"134,135,136,137,138,139,150,151,152,157,158,159,187,188,147,182,183,184,178",
		n = "130,131,132,155,156,185,186,145,176",
		a = "133,153,180,181,189,177,173,170",
		o = e || "",
		r = o.substring(0, 3),
		d = o.substring(0, 4),
		s =
		!!/^1\d{10}$/.test(o) &&
		(n.indexOf(r) >= 0
			? "联通"
			: a.indexOf(r) >= 0
			? "电信"
			: "1349" == d
			? "电信"
			: i.indexOf(r) >= 0
			? "移动"
			: "未知");
	return s;
}

export function isURL(strUrl) {//是否为网址
	var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i;
	if (regular.test(strUrl)) {
		return true;
	} else {
		return false;
	}
}

export function fnParams2Url(obj){//对象参数转为url参数
	let aUrl = []
	let fnAdd = function(key, value) {
	  return key + '=' + value
	}
	for (var k in obj) {
	  aUrl.push(fnAdd(k, obj[k]))
	}
	return encodeURIComponent(aUrl.join('&'))
}

export function isEmail(str) {//是否为邮箱
    return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str);
}

export function isQQ(value) {//是否为QQ
    return /^[1-9][0-9]{4,12}$/.test(value.toString());
}

export function clearCNChars(str){//清除中文字符
    return str.replace(/[\u4e00-\u9fa5]/g,'');
}

export function setCookie(name, value, Hours) {//设置cookie
	var d = new Date();
	var offset = 8;
	var utc = d.getTime() + d.getTimezoneOffset() * 60000;
	var nd = utc + 3600000 * offset;
	var exp = new Date(nd);
	exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
	document.cookie =
	  name +
	  "=" +
	  escape(value) +
	  ";path=/;expires=" +
	  exp.toGMTString() +
	  ";domain=360doc.com;";
  }
  // 对象深层递归合并
export const deepMerge = function(target: object, source: object) {
	for (const key in source) {
	  if (Object.prototype.hasOwnProperty.call(source, key)) {
		if (source[key] instanceof Object && key in target && target[key] instanceof Object) {
		  deepMerge(target[key], source[key]);
		} else {
		  target[key] = source[key];
		}
	  }
	}
	return target;
  };