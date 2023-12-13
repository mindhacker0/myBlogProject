import { 
	LOAD_FILE
} from './constant';
import {defaults} from "lodash";
let fileList = [{
	id:UUID(),
	fileName:"index.html",
	fileType:"html",
	create_time:"",
	last_modify:"",
	content:""
}];
const initialState = {
	language:"javascript",
	value:"window.console.log(new Date());",//编辑器内容
	fileTabs:fileList,//打开
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case LOAD_FILE://文件加载
			return defaults({value:payload.value,language:payload.fileType},state);
		default:
			return state;
	}
};
