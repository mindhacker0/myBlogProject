import { 
	SET_PROJECT_LIST
} from './constant';
let list = [{
	project_name:"测试项目",
	id:UUID(),
	cover:"",
	create_time:"",
	fileList:[{
		id:UUID(),
		fileName:"index.html",
		fileType:"html",
		create_time:"",
		last_modify:"",
		content:"console.log(Date.now());"
	}]
}];
const initialState = {
	projectList:list,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_PROJECT_LIST:
			return {
				...state,
				projectList:payload.projectList,
			};
		default:
			return state;
	}
};
