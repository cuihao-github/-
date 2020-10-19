// UpdateFromWhereByDateList 更新用户来自哪个页面
export const Update_From_Where_By_DateList = "update+from_where_dateList";
export const UpdateFromWhereByDateList = (where) => ({
	type: Update_From_Where_By_DateList,
	value: where,
});
