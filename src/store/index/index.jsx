import {
	Exchange_From_To,
	Update_Date,
	Update_From,
	Update_Is_Student,
	Update_Only_Train,
	Update_To,
	Update_Week,
} from "./actions";

const defaultState = {
	title: "首页", // 标题
	from: "北京", // 起始地
	to: "上海", // 目的地
	date: "", // 获取当前时间, 转换格式(2019-04-02 周几)
	week: "", // 表示周几
	onlyTrain: false, // 是否只看高铁/火车
	isStudent: false, // 是否学生票
};

export default function IndexReducer(state = defaultState, actions) {
	const { type, value } = actions;

	// 改变起始地址
	if (type === Update_From) {
		return { ...state, from: value };
	}

	// 改变目标地址
	if (type === Update_To) {
		return { ...state, to: value };
	}

	// 交换起始地址和目的地
	if (type === Exchange_From_To) {
		return { ...state, from: state.to, to: state.from };
	}

	// 更新时间
	if (type === Update_Date) {
		return { ...state, date: value };
	}

	// 更新星期几
	if (type === Update_Week) {
		return { ...state, week: value };
	}

	// 更新是否只看高铁或者动车
	if (type === Update_Only_Train) {
		return { ...state, onlyTrain: !state.onlyTrain };
	}

	if (type === Update_Is_Student) {
		return { ...state, isStudent: !state.isStudent };
	}

	return state;
}
