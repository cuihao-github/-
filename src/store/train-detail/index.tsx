import {
	Update_Seat_Class,
	Update_Buy_Type,
	Update_Price_In_TrainDetail,
} from "./actions";

interface TDefaultState {
	title?: string;
	seatClass: string;
	buyType: string;
	price: number;
}

export enum BuyType {
	"fast" = "超级加速",
	"slow" = "普通购买",
}

export enum SeatClass {
	"two" = "二等座",
	"one" = "一等座",
	"super" = "商务座",
}

const defaultState: TDefaultState = {
	title: "车票详情页",
	seatClass: SeatClass.two,
	buyType: BuyType.slow,
	price: 553,
};

export default function TrainDetailReducer(
	state: TDefaultState = defaultState,
	actions: any,
): TDefaultState {
	const { type, value } = actions;

	// 更新页面的座位等级
	if (type === Update_Seat_Class) {
		return { ...state, seatClass: value };
	}

	// 修改购买的方式
	if (type === Update_Buy_Type) {
		return { ...state, buyType: value };
	}

	// 更新价格
	if (type === Update_Price_In_TrainDetail) {
		return { ...state, price: value };
	}

	return state;
}
