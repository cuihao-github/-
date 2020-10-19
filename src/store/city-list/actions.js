// UpdateFromWhere 更新状态
export const Update_From_Where = "update_from_where";
export const UpdateFromWhere = (val) => ({
	type: Update_From_Where,
	value: val,
});

// UpdateCityList 更新城市列表数据
export const Update_CityList = "update_city_list";
export const UpdateCityList = (val) => ({
	type: Update_CityList,
	value: val,
});

// UpdateIsSearch 更新是否在搜索状态
export const Update_IsSearch = "update_is_search";
export const UpdateIsSearch = (val) => ({
	type: Update_IsSearch,
	value: val,
});

// Update_Search_List 搜索到的数据
export const Update_Search_List = "update_search_list";
export const UpdateSearchList = (list) => ({
	type: Update_Search_List,
	value: list,
});
