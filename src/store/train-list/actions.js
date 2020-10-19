// UpdateDateByTrainList 更新时间
export const Update_Date_ByTrainList = "update_date_by_train_list";
export const UpdateDateByTrainList = (date) => ({
	type: Update_Date_ByTrainList,
	value: date,
});

// UpdateSelectTrain 修改当前选择的列车
export const Update_Select_Train = "update_select_train";
export const UpdateSelectTrain = (train) => ({
	type: Update_Select_Train,
	value: train,
});

// UpdateFromWhereByTrainList 更新页面从哪里返回
export const Update_From_where_By_TrainList = "update_from_where_Train_list";
export const UpdateFromWhereByTrainList = (from) => ({
	type: Update_From_where_By_TrainList,
	value: from,
});

export const Update_List_In_Train_list = "update_list_in_train_list";
export const UpdateListInTrainList = (date) => ({
	type: Update_List_In_Train_list,
	value: date,
});
