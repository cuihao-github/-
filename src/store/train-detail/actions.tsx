// UpdateSeatClass 修改座位的等级
export const Update_Seat_Class = "update_seat_class";
export const UpdateSeatClass = (seatClass: string) => {
	return {
		type: Update_Seat_Class,
		value: seatClass,
	};
};

// UpdateBuyType 更新该买方式
export const Update_Buy_Type = "update_buY_type";
export const UpdateBuyType = (type: number) => {
	return {
		type: Update_Buy_Type,
		value: type,
	};
};

// UpdatePriceInTrainDetail 更新价格
export const Update_Price_In_TrainDetail = "update_price_in_trainDetail";
export const UpdatePriceInTrainDetail = (price: number) => ({
	type: Update_Price_In_TrainDetail,
	value: price,
});
