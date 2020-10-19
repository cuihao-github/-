import React, { memo, useCallback, useMemo } from "react";
import { withRouter } from "react-router-dom";
import ClassName from "../utils/ClassName";
import "../assets/scss/date-list.scss";
import { UpdateDate, UpdateWeek } from "../store/index/actions";
import { connect } from "react-redux";
import { isToday, getWeek, yearMonthDays } from "../utils/date";
import Header from "../components/header";
import { dispatch } from "../store";
import {
	UpdateDateByTrainList,
	UpdateFromWhereByTrainList,
} from "../store/train-list/actions";
import { UpdateFromWhereByDateList } from "../store/date-list/actions";
import PropTypes from "prop-types";
import { pageNumber } from "../conf/page-number";

function GetDateArr(options) {
	let res = [];

	const date = new Date();
	const year = (options && options.year) || date.getFullYear();
	const month = (options && options.month) || date.getMonth() + 1;
	let firstDay = new Date(year, month - 1, 1).getDay();
	let monthLen = new Date(year, month, 0).getDate();

	// 填充1号之前数组为0
	for (let i = 0; i < firstDay; i++) {
		res.push(0);
	}
	// 填充数组1号之后的数组的日期
	for (let i = 1; i <= monthLen; i++) {
		res.push(i);
	}

	return res;
}

/* ----------------------------------- 周数 ----------------------------------- */
const DateListWeek = memo(() => {
	return (
		<ul className="week x-y-center">
			<li className="item">日</li>
			<li className="item">一</li>
			<li className="item">二</li>
			<li className="item">三</li>
			<li className="item">四</li>
			<li className="item">五</li>
			<li className="item">六</li>
		</ul>
	);
});

/* ----------------------------------- 天数 ----------------------------------- */
const DateListDay = memo(({ DateArr, year, month, currentDay, UpdateDate }) => {
	// 行中的元素
	const weeks = useCallback(
		(val1) => {
			let res = [];
			for (let i = 0; i < 7; i++) {
				if (DateArr[val1 + i] > 0) {
					res.push(
						<td
							{...ClassName(
								{
									isToday: isToday(
										year,
										month,
										DateArr[val1 + i],
									),
									past:
										currentDay !== undefined &&
										DateArr[val1 + i] < currentDay,
								},
								"item",
							)}
							key={i}
							onClick={() => {
								if (
									currentDay === undefined ||
									DateArr[val1 + i] >= currentDay
								) {
									UpdateDate(
										year,
										month,
										DateArr[val1 + i],
										getWeek(year, month, DateArr[val1 + i]),
									);
								}
							}}
						>
							{isToday(year, month, DateArr[val1 + i])
								? "今天"
								: DateArr[val1 + i]}
						</td>,
					);
				} else {
					res.push(<td className="item" key={i}></td>);
				}
			}
			return res;
		},

		[year, month, DateArr, UpdateDate, currentDay],
	);

	// 行
	const rows = useMemo(() => {
		let res = []; // 保存每一行起始的索引
		let row = Math.ceil(DateArr.length / 7);
		for (let i = 0; i < row; i++) {
			res.push(
				<tr className="row" key={i}>
					{weeks(i * 7)}
				</tr>,
			);
		}
		return res;
	}, [DateArr, weeks]);

	return (
		<div className="day">
			<h3 className="title">
				{year}年{month}月
			</h3>
			<table className="table">
				<tbody className="tbody">{rows}</tbody>
			</table>
		</div>
	);
});
DateListDay.propTypes = {
	DateArr: PropTypes.array,
	year: PropTypes.number,
	month: PropTypes.number,
	currentDay: PropTypes.number,
	UpdateDate: PropTypes.func,
};

/* ---------------------------------- main ---------------------------------- */
const DateList = memo(function DateList({
	fromWhere,
	history,
	UpdateDate,
	UpdateWeek,
	fromWhereByDateList,
}) {
	// 年月日
	const yearMonthDay = useMemo(yearMonthDays, []);

	// 判断用户是否那个页面跳转过来
	if (fromWhere < 0) history.goBack();

	// 点击日期函数
	const ClickUpdateDate = useCallback(
		(year, month, day, week) => {
			if (fromWhereByDateList === pageNumber.index) {
				UpdateDate(year, month, day);
				UpdateWeek(week);
			} else if (fromWhereByDateList === pageNumber.trainList) {
				dispatch(UpdateFromWhereByTrainList(pageNumber.dateList));
				dispatch(
					UpdateDateByTrainList([
						year,
						month,
						day,
						getWeek(year, month, day),
					]),
				);
			}
			dispatch(UpdateFromWhereByDateList(0));
			history.goBack();
		},
		[history, UpdateDate, UpdateWeek, fromWhereByDateList],
	);

	// 头部-点击-返回
	const ClickBack = useCallback(() => {
		history.goBack();
	}, [history]);

	return (
		<div className="date-arr">
			<Header title="时间" ClickBack={ClickBack} />
			<DateListWeek />
			<DateListDay
				DateArr={GetDateArr()}
				year={yearMonthDay[0]}
				month={yearMonthDay[1]}
				currentDay={yearMonthDay[2]}
				UpdateDate={ClickUpdateDate}
			/>
			<DateListDay
				DateArr={GetDateArr({ month: yearMonthDay[1] + 1 })}
				year={yearMonthDay[0]}
				month={yearMonthDay[1] + 1}
				UpdateDate={ClickUpdateDate}
			/>
			<DateListDay
				DateArr={GetDateArr({ month: yearMonthDay[1] + 2 })}
				year={yearMonthDay[0]}
				month={yearMonthDay[1] + 2}
				UpdateDate={ClickUpdateDate}
			/>
		</div>
	);
});

const mapStateToProps = (state) => ({ ...state.DateListReducer });

const mapDispatchToProps = (dispatch) => ({
	UpdateDate(year, month, day) {
		dispatch(UpdateDate(year, month, day));
	},
	UpdateWeek(week) {
		dispatch(UpdateWeek(week));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withRouter(DateList));
