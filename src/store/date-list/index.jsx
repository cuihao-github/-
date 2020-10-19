import { Update_From_Where_By_DateList } from "./actions";

const defaultState = {
	title: "时间列表",

	fromWhereByDateList: 1, // 表示用户来自那个页面
};

export default function DateListReducer(state = defaultState, actions) {
	const { type, value } = actions;

	// Update_From_Where_By_DateList 更新用来自哪个页面
	if (type === Update_From_Where_By_DateList) {
		return { ...state, fromWhereByDateList: value };
	}

	return state;
}
