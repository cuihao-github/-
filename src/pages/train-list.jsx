import React, { memo, useCallback, useEffect, useMemo } from "react";
import Header from "../components/header";
import { yearMonthDays, getWeek, DateCompare } from "../utils/date";
import { dispatch } from "../store/index";
import { UpdateFromWhereByDateList } from "../store/date-list/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "../assets/scss/train-list.scss";
import {
	UpdateDateByTrainList,
	UpdateSelectTrain,
} from "../store/train-list/actions";
import { pageNumber } from "../conf/page-number";

/* --------------------------------- 选择日期页面 --------------------------------- */
const TrainListDate = memo(
	({ date, ClickBeforeDate, ClickAfterDate, ClickGoToDate }) => {
		return (
			<div className="date-wrapper x-y-center">
				<span className="before" onClick={ClickBeforeDate}>
					前一天
				</span>
				<h3 className="date" onClick={ClickGoToDate}>
					{date}
				</h3>
				<span className="after" onClick={ClickAfterDate}>
					后一天
				</span>
			</div>
		);
	},
);

/* -------------------------------- 渲染列表的子数据 -------------------------------- */
const TrainListDataItem = memo(
	({
		startTime,
		endTime,
		to,
		from,
		trainNumber,
		price,
		amount,
		ClickSelectTrain,
	}) => {
		// 座位等级
		const seatClass = useMemo(() => {
			if (price >= 1000) {
				return "特等座";
			} else if (price >= 500) {
				return "二等座";
			}
		}, [price]);

		return (
			<li
				className="item x-y-center"
				onClick={() =>
					ClickSelectTrain(
						startTime,
						endTime,
						to,
						from,
						trainNumber,
						price,
						amount,
					)
				}
			>
				<div className="time">
					<p className="top">{startTime}</p>
					<p className="bottom">{endTime}</p>
				</div>
				<div className="address">
					<div className="top">
						<span className="yuan">始</span>
						<span className="text">{from}</span>
					</div>
					<div className="bottom">
						<span className="yuan">终</span>
						<span className="text">{to}</span>
					</div>
				</div>
				<div className="train-number">{trainNumber}</div>
				<div className="price">
					<p className="price">￥{price}</p>
					<p className="amount">
						<span>{seatClass} </span>
						<span className="special"> {amount}张</span>
					</p>
				</div>
			</li>
		);
	},
);

/* ---------------------------------- 渲染列表 ---------------------------------- */
const TrainListData = memo(({ lists, ClickSelectTrain }) => {
	return (
		<div className="data">
			{lists.map((val, idx) => (
				<TrainListDataItem
					key={idx}
					startTime={val.startTime}
					endTime={val.endTime}
					to={val.to}
					from={val.from}
					trainNumber={val.trainNumber}
					price={val.price}
					amount={val.amount}
					ClickSelectTrain={ClickSelectTrain}
				/>
			))}
		</div>
	);
});
TrainListData.propTypes = {
	lists: PropTypes.array,
	ClickSelectTrain: PropTypes.func,
};

/* ---------------------------------- main ---------------------------------- */
const TrainList = function TrainList({
	from,
	to,
	list: List,
	date: dateArr,
	fromWhereByTrainList,
	indexDate,
	history,
}) {
	// 年月日周
	const yearMonthDay = useMemo(yearMonthDays, []);
	const week = useMemo(() => getWeek(...yearMonthDay), [yearMonthDay]);
	// 计算页面标题
	const title = useMemo(() => `${from} -> ${to}`, [from, to]);
	// 计算x月x日x周
	const date = useMemo(() => {
		return `${dateArr[1]}月${dateArr[2]}日 ${dateArr[3]}`;
	}, [dateArr]);
	// 计算车次列表数组
	const lists = useMemo(() => {
		if (dateArr.length < 1) return [];
		// 将dataArr数组转为data字符串: "10月14日"
		let date = `${dateArr[1]}月${dateArr[2]}日`;
		// 遍历List中的元素，找出item中date为当前date的元素,返回trains
		for (let val of List) {
			if (val.date === date) {
				return val.trains;
			}
		}
		return [];
	}, [dateArr, List]);

	// 选择车次，跳转到列车详情页
	const ClickSelectTrain = useCallback(
		(startTime, endTime, to, from, trainNumber, price, amount) => {
			dispatch(
				UpdateSelectTrain({
					startTime: startTime,
					endTime: endTime,
					from: from,
					to: to,
					trainNumber: trainNumber,
					price: price,
					amount: amount,
				}),
			);
			history.push("/trainDetail");
		},
		[history],
	);

	// 返回上一页
	const ClickBack = useCallback(() => history.goBack(), [history]);

	// 修改date为前一天
	const ClickBeforeDate = useCallback(() => {
		if (
			DateCompare(
				new Date(dateArr[0], dateArr[1], dateArr[2] - 1),
				new Date(...yearMonthDay),
			)
		) {
			dispatch(
				UpdateDateByTrainList([
					dateArr[0],
					dateArr[1],
					dateArr[2] - 1,
					getWeek(dateArr[0], dateArr[1], dateArr[2] - 1),
				]),
			);
		}
	}, [dateArr, yearMonthDay]);

	// 修改date为后一天
	const ClickAfterDate = useCallback(() => {
		dispatch(
			UpdateDateByTrainList([
				dateArr[0],
				dateArr[1],
				dateArr[2] + 1,
				getWeek(dateArr[0], dateArr[1], dateArr[2] + 1),
			]),
		);
	}, [dateArr]);

	// 修改date为某一天
	const ClickGoToDate = useCallback(() => {
		dispatch(UpdateFromWhereByDateList(pageNumber.trainList));
		history.push("/dateList");
	}, [history]);

	// 初始化时间
	useEffect(() => {
		if (indexDate === "" && fromWhereByTrainList === 0) {
			dispatch(
				UpdateDateByTrainList([
					yearMonthDay[0],
					yearMonthDay[1],
					yearMonthDay[2],
					week,
				]),
			);
		} else if (
			fromWhereByTrainList === pageNumber.index ||
			fromWhereByTrainList < 1
		) {
			let date = new Date(indexDate);
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();

			dispatch(
				UpdateDateByTrainList([
					year,
					month,
					day,
					getWeek(year, month, day),
				]),
			);
		}
	}, []);

	return (
		<div className="train-list">
			<Header title={title} ClickBack={ClickBack} />
			<TrainListDate
				date={date}
				ClickBeforeDate={ClickBeforeDate}
				ClickAfterDate={ClickAfterDate}
				ClickGoToDate={ClickGoToDate}
			/>
			<TrainListData lists={lists} ClickSelectTrain={ClickSelectTrain} />
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.TrainListReducer,
	from: state.IndexReducer.from,
	to: state.IndexReducer.to,
	indexDate: state.IndexReducer.date,
});

export default connect(mapStateToProps)(withRouter(TrainList));
