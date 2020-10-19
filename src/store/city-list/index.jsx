import {
	Update_CityList,
	Update_From_Where,
	Update_IsSearch,
	Update_Search_List,
} from "./actions";

const defaultState = {
	title: "城市列表", // 标题
	// 数据列表
	list: [
		{
			trainingLetter: "A",
			data: ["安徽", "安远"],
		},
		{
			trainingLetter: "B",
			data: ["北京", "北大"],
		},
		{
			trainingLetter: "C",
			data: ["成都", "成帝", "成橙"],
		},
	],
	searchList: [], // 搜索到的数据

	fromWhere: 0, // 表示进入城市选择页面的是哪个
	isSearch: false, // 是否在搜索
};

export default function CityListReducer(state = defaultState, actions) {
	const { type, value } = actions;

	// Update_From_Where 更新来自城市列表的页面
	if (type === Update_From_Where) {
		return { ...state, fromWhere: value };
	}

	// Update_CityList 跟新城市列表的数据
	if (type === Update_CityList) {
		return { ...state, list: value };
	}

	// Update_IsSearch 更新搜索状态
	if (type === Update_IsSearch) {
		return { ...state, isSearch: value };
	}

	// Update_Search_List 更新搜索到的数据
	if (type === Update_Search_List) {
		return { ...state, searchList: value };
	}

	return state;
}
