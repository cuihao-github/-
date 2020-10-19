import React, { memo, useCallback, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../assets/scss/index.scss";
import { dispatch } from "../store/index";
import {
	ExchangeFromAndTo,
	UpdateDate,
	UpdateIsStudent,
	UpdateOnlyTrain,
	UpdateWeek,
} from "../store/index/actions";
import { UpdateFromWhere } from "../store/city-list/actions";
import { UpdateFromWhereByDateList } from "../store/date-list/actions";
import { getWeek, yearMonthDays } from "../utils/date";
import Header from "../components/header";
import { UpdateFromWhereByTrainList } from "../store/train-list/actions";
import { pageNumber } from "../conf/page-number";

/* -------------------------------- 起始位置和目的地 -------------------------------- */
const IndexFromTo = memo(({ from, to, ExchangeFromAndTo, FuncGoCityList }) => {
	return (
		<div className="from-to x-y-center">
			<span onClick={() => FuncGoCityList(1)} className="address">
				{from}
			</span>
			<span
				onClick={ExchangeFromAndTo}
				className="iconfont icon-jiaohuan exchange"
			/>
			<span onClick={() => FuncGoCityList(2)} className="address">
				{to}
			</span>
		</div>
	);
});
IndexFromTo.propTypes = {
	from: PropTypes.string,
	to: PropTypes.string,
	ExchangeFromAndTo: PropTypes.func,
	FuncGoCityList: PropTypes.func,
};

/* ----------------------------------- 时间 ----------------------------------- */
const IndexDate = memo(({ date, week, ClickSelectDate }) => {
	return (
		<div className="date x-y-center" onClick={ClickSelectDate}>
			<span className="year-month">{date}</span>
			<span className="day">{week}</span>
		</div>
	);
});
IndexDate.propTypes = {
	date: PropTypes.string,
};

/* ---------------------------------- 只看动车 ---------------------------------- */
const IndexOnlyTrain = memo(
	({ onlyTrain, isStudent, UpdateOnlyTrain, UpdateIsStudent }) => {
		return (
			<div className="only-train x-y-center">
				<div className="box x-y-center">
					<input
						className="yuan x-y-center"
						type="checkbox"
						checked={onlyTrain}
						onChange={UpdateOnlyTrain}
					/>
					<span className="text">只看高铁/动车</span>
				</div>
				<div className="box x-y-center">
					<input
						className="yuan x-y-center"
						type="checkbox"
						checked={isStudent}
						onChange={UpdateIsStudent}
					/>
					<span className="text">学生票</span>
				</div>
			</div>
		);
	},
);
IndexOnlyTrain.propTypes = {
	onlyTrain: PropTypes.bool,
	isStudent: PropTypes.bool,
	UpdateIsStudent: PropTypes.func,
	UpdateOnlyTrain: PropTypes.func,
};

/* ---------------------------------- main ---------------------------------- */
const Index = memo(function Index({
	from,
	to,
	date,
	week,
	onlyTrain,
	isStudent,
	ExchangeFromAndTo,
	UpdateOnlyTrain,
	UpdateIsStudent,
	UpdateFromWhere,
	UpdateFromWhereByDateList, //
	history,
}) {
	// FuncSearch 搜索列车列表
	const FuncSearch = useCallback(() => {
		dispatch(UpdateFromWhereByTrainList(pageNumber.index));
		history.push("/trainList");
	}, [history]);

	// FuncGoCityList 去城市列表选择地址
	const FuncGoCityList = useCallback(
		(where) => {
			// 告诉城市页面，我来此那个事件
			UpdateFromWhere(where);
			// 跳转到cityList页面
			history.push("/cityList");
		},
		[UpdateFromWhere, history],
	);

	// 选择时间、星期几
	const ClickSelectDate = useCallback(() => {
		// 更改来自的页面
		UpdateFromWhereByDateList(1);
		// 跳转到dateList页面
		history.push("/dateList");
	}, [history, UpdateFromWhereByDateList]);

	// 初始化时间和日期
	useEffect(() => {
		if (week !== "" && date !== "") return;
		const yearMonthDay = yearMonthDays();
		const week1 = getWeek(...yearMonthDay);
		dispatch(UpdateDate(...yearMonthDay));
		dispatch(UpdateWeek(week1));
	}, [week, date]);

	return (
		<div className="index y-x-center">
			<Header title="首页" />
			<div className="top-bg"></div>
			<div className="main">
				<IndexFromTo
					{...{ from, to, ExchangeFromAndTo, FuncGoCityList }}
				/>
				<IndexDate
					date={date}
					week={week}
					ClickSelectDate={ClickSelectDate}
				/>
				<IndexOnlyTrain
					onlyTrain={onlyTrain}
					isStudent={isStudent}
					UpdateOnlyTrain={UpdateOnlyTrain}
					UpdateIsStudent={UpdateIsStudent}
				/>
				<button className="btn" onClick={FuncSearch}>
					搜索
				</button>
			</div>
		</div>
	);
});

const mapStateToProps = (state) => ({ ...state.IndexReducer });

const mapDispatchToProps = (dispatch) => ({
	ExchangeFromAndTo() {
		dispatch(ExchangeFromAndTo());
	},
	UpdateOnlyTrain() {
		dispatch(UpdateOnlyTrain());
	},
	UpdateIsStudent() {
		dispatch(UpdateIsStudent());
	},
	UpdateFromWhere(where) {
		dispatch(UpdateFromWhere(where));
	},
	UpdateFromWhereByDateList(where) {
		dispatch(UpdateFromWhereByDateList(where));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index));
