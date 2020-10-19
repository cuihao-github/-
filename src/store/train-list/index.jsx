import { stat } from "fs";
import {
	Update_Date_ByTrainList,
	Update_From_where_By_TrainList,
	Update_List_In_Train_list,
	Update_Select_Train,
} from "./actions";

const defaultState = {
	title: "车次列表",
	list: [
		{
			date: "10月18日",
			trains: [
				{
					startTime: "14:00",
					endTime: "16:00",
					from: "北京",
					to: "上海",
					trainNumber: "G169",
					price: 560,
					amount: 90,
				},
				{
					startTime: "15:00",
					endTime: "17:00",
					from: "北京",
					to: "上海",
					trainNumber: "G168",
					price: 560,
					amount: 80,
				},
			],
		},
	],
	selectTrain: {
		startTime: "15:00",
		endTime: "17:00",
		from: "北京",
		to: "上海",
		trainNumber: "G168",
		price: 560,
		amount: 80,
	},
	date: [],
	fromWhereByTrainList: 0, // 区分上一个页面
};

export default function TrainListReducer(state = defaultState, actions) {
	const { type, value } = actions;

	// 更新当前日期
	if (type === Update_Date_ByTrainList) {
		return { ...state, date: value };
	}

	// 修改当前选择的列车
	if (type === Update_Select_Train) {
		let selectTrain = {
			startTime: value.startTime,
			endTime: value.endTime,
			from: value.from,
			to: value.to,
			trainNumber: value.trainNumber,
			price: value.price,
			amount: value.amount,
		};
		return { ...state, selectTrain };
	}

	// 修改是从哪个页面进入
	if (type === Update_From_where_By_TrainList) {
		return { ...state, fromWhereByTrainList: value };
	}

	// 更新时间
	if (type === Update_List_In_Train_list) {
		let list = state.list;
		list[0].date = value;
		return { ...state, list };
	}

	return state;
}
