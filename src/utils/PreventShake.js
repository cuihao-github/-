// PreventShake 防抖函数
export default function PreventShake(time) {
	let timeObj = null;
	return (callback, ...value) => {
		if (timeObj) {
			clearTimeout(timeObj);
		}
		timeObj = setTimeout(() => {
			callback(...value);
		}, time);
	};
}
