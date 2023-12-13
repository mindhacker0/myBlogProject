import { 
	SET_NOTICE_INFO
} from './constant';

const initialState = {
	noticeInfo:[{
		create_time:"2021-10-28 15:52:56",
		title:"灰灰博客小屋开张了",
		content:"这是我的博客小屋，欢迎参观啊!\n前端react+后端express",
		author:"管理员",
		sort:0,
		id:window.UUID()
	}],
	homeBlogList:[
		{
			id:window.UUID(),//该博客的id
			cover:"",//封面
			title:"原生JS实现电子书阅读器",//标题
		    content:`
			本文主要介绍FileReader对象，以及如何分割utf-8编码的二进制序列
			
			## FileReader对象
			FileReader对象通过异步读取文件，可以通过readAsText读取文本内容，readAsDataURL可以把文件生成本地的资源定位符，例如可以通过src展示选择的图片文件，readAsBinaryString和readAsArrayBuffer是把文件以二进制展示，一个是字符串，一个是对象，可以通过slice操作，本身无法遍历。
			
			
			## 简单的文件读取
			
			如果只是简单的读取整个文件也用不到分割文件，以下代码就可以实现
			\`\`\`javascript
			// An highlighted block
			var files=event.target.files;//获取文件对象，通过input[type='file']的事件
			var reader=new FileReader();//新建fileReader实例
			reader.readAsText(files[0],'UTF-8');
			reader.onload=function(){console.log(reader.result);}
			\`\`\`
			但是这种方式一次性读取文件很慢，所以一般把文件用slice切片读取
			切片的话就会有问题，位置不对就会无法解码出现如下问题
			![在这里插入图片描述](https://img-blog.csdnimg.cn/20200522152704530.png#pic_center)
			## 二进制码的生成
			想要获取Unicode码需要把文件转化为二进制可以通过以下代码实现
			\`\`\`javascript
			Array.prototype.slice.call(new Uint8Array(buffer)).
			map(i=>"00000000".substring(i.toString(2).length)+i.toString(2))
			//这里的buffer是通过readAsArrayBuffer方法获取的result
			//然后通过slice转为数组，再通过toString转化为二进制字符，发现有的字符转化后
			//不足8位，需要高位补0
			\`\`\`
			改变成的二进制信息大概长成这样
			![在这里插入图片描述](https://img-blog.csdnimg.cn/20200522152314633.png#pic_center)
			## UTF-8编码规范和分割的思路
			百度到utf-8编码如下，发现是一种变长码。
			1）对于单字节的符号，字节的第一位设为0，后面7位为这个符号的unicode码。因此对于英语字母，UTF-8编码和ASCII码是相同的。
			2）对于n字节的符号（n>1），第一个字节的前n位都设为1，第n+1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的unicode码。
			如表： 
			1字节 0xxxxxxx 
			2字节 110xxxxx 10xxxxxx 
			3字节 1110xxxx 10xxxxxx 10xxxxxx 
			4字节 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx 
			5字节 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 
			6字节 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 
			按照它的一般规律，以10开头的都是非分割码，而其它的都是分割码
			那么分割的核心就是找非10码
			附上主要代码，对开头和结尾不是正常的都有处理，要记住文件读取是异步的，不然会出现问题：
			\`\`\`javascript
			getFileObj(event){//onchange事件获取file
					 console.log(event);
					  this.files=event.target.files;
					  this.calPageSize().then(res=>{
						  this.showContent();
					  })
				  },prevPage(){//前一页
					  this.pageNum--;
					  this.pageNum<0 && (this.pageNum=0);
					  this.calPageSize().then(res=>{
						  this.showContent();
					  })
				  },nextPage(){//下一页
					  this.pageNum++;
					  this.calPageSize().then(res=>{
						  this.showContent();
					  })
				  },showContent(){//读取文件
					  if(this.files.length===0){return this.$message.info("请选择文件");}
					  let reader=new FileReader(),that=this;
					  reader.readAsText(this.files[0].slice(this.start,this.start+this.pageSize),'UTF-8');
					  reader.onload=function(){that.content=reader.result;}
				  },calPageSize(){//判断开始结束的指针位置
					  let reader=new FileReader(),that=this,preindex=0;
					  that.start=that.pageNum*that.MaxPage;
					  return new Promise((reslove,reject)=>{
						  reader.readAsArrayBuffer(that.files[0].slice(that.start,that.start+that.MaxPage));
						  reader.onload=function(){
							  let binaryArr=that.arrayBufferToString(reader.result);
							  if(binaryArr[0].slice(0,2)==='10'&&that.start-6>=0){//如果前面不是标准开头
								  reader.readAsArrayBuffer(that.files[0].slice(that.start-6,that.start));//最长的编码为6个字节
								  reader.onload=function(){
									 let exBinaryArr=that.arrayBufferToString(reader.result);
									 preindex=that.lastIndex(exBinaryArr,/^(?!10).*/);//查找标准开头
									 preindex!==-1 && (that.start=that.start-(6-preindex));//找到了正确的起始位置
									 //console.log(exBinaryArr,preindex,that.start);
									 tail();
								  }
							  }else{
								  tail();   
							  }
							  function tail(){
								   //尾部多余部分处理
									let tailindex=that.lastIndex(binaryArr,/^(?!10).*/);
									//尾部可能是正常结束
									let str=/^(1*)0.*/g.exec(binaryArr[tailindex])[1];
									if(str.length+tailindex===binaryArr.length)
									{tailindex=that.MaxPage;}
									that.pageSize=preindex>0?tailindex+(6-preindex):tailindex;
									console.log(binaryArr,binaryArr[tailindex],str.length);
									reslove(true);
							  } 
						  } 
					  })
				  },arrayBufferToString(buffer){
					  return Array.prototype.slice.call(new Uint8Array(buffer)).
					  map(i=>"00000000".substring(i.toString(2).length)+i.toString(2))
				  },lastIndex(arr,reg){//正则匹配
					 for(let i=arr.length-1;i>0;i--){
						 if(reg.test(arr[i])){
							 return i;
						 }
					 }
					 return -1;
				  }
			\`\`\`
			
			本人水平有限，如有问题，还望指教`,//内容
			describe:"",//描述，摘要
			catalog:"分享",//类别
			tags:"好文",//文章的标签
			create_time:"2021-10-28 15:52:56",//创建时间
			author:"zpf",//作者
			views:98,//被浏览次数
			praise:99,//点赞数量
            comment:100,//评论数
		}
	],
	ownerInfo:{//博主个人信息
        name:"周鹏飞",
		addr:"广东广州",
		birth:"1995-10-19",
		caree:"前端攻城狮",
		phone:"15200332715"
	}
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_NOTICE_INFO:
			return {
				...state,
				noticeInfo: payload.noticeInfo,
			};
		default:
			return state;
	}
};
