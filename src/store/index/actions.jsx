// UpdateFrom 更新起始位置
export const Update_From = "update_from";
export const UpdateFrom = (from) => ({
	type: Update_From,
	value: from,
});

// UpdateTo 跟新目的地
export const Update_To = "update_to";
export const UpdateTo = (to) => ({
	type: Update_To,
	value: to,
});

// ExchangeFromAndTo 交换其实位置和目的地
export const Exchange_From_To = "update_from_to";
export const ExchangeFromAndTo = () => ({
	type: Exchange_From_To,
	value: null,
});

// UpdateDate 更新时间
export const Update_Date = "update_date";
export const UpdateDate = (year, month, day) => {
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	let date = `${year}-${month}-${day}`;
	return { type: Update_Date, value: date };
};

// UpdateDay 更新星期几
export const Update_Week = "update_week";
export const UpdateWeek = (week) => ({
	type: Update_Week,
	value: week,
});

// UpdateOnlyTrain 更新是否只看高铁或者动车
export const Update_Only_Train = "update_only_train";
export const UpdateOnlyTrain = () => ({
	type: Update_Only_Train,
	value: null,
});

// UpdateIsStudent 是否是学生
export const Update_Is_Student = "update_is_student";
export const UpdateIsStudent = () => ({
	type: Update_Is_Student,
	value: null,
});
