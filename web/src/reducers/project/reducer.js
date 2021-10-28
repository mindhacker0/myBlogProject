import { 
	SET_PROJECT_LIST,
	SET_FILE_FOLDER
} from './constant';
let list = [{
	project_name:"测试项目",
	projec_id:"142142141",
	cover:"",
	create_time:"",
}];
const initialState = {
	projectList:[],
	fileFolder:[],
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_PROJECT_LIST:
			return {
				...state,
				projectList:payload.projectList,
			};
		case SET_FILE_FOLDER:
			return {
				...state,
				fileFolder:payload.fileFolder,
			};
		default:
			return state;
	}
};
