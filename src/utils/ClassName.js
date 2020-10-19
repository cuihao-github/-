// ClassName 类函数
export default function ClassName(options, ...arg) {
	let res = [];

	arg.forEach((val) => {
		res.push(val);
	});

	for (let key in options) {
		if (options[key]) {
			res.push(key);
		}
	}

	return { className: res.join(" ") };
}
