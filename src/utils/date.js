// 获取当前的年月
export const yearMonthDays = () => {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	return [year, month, day];
};

// 判断传入的日期是否是今天
export const isToday = (year, month, day) => {
	let date = new Date();
	let year1 = date.getFullYear();
	let month1 = date.getMonth() + 1;
	let day1 = date.getDate();

	let isToday = year === year1 && month === month1 && day === day1;

	return isToday;
};

// 得到星期几
export const getWeek = (year, month, day) => {
	let date = new Date(year, month - 1, day);
	switch (date.getDay()) {
		case 0:
			return "周日";
		case 1:
			return "周一";
		case 2:
			return "周二";
		case 3:
			return "周三";
		case 4:
			return "周四";
		case 5:
			return "周五";
		case 6:
			return "周六";
		default:
			return "";
	}
};

// 比较日期的大小
export const DateCompare = (date1, date2) => {
	if (date1.getTime() >= date2.getTime()) {
		return true;
	}
	return false;
};
