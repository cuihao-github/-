import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UpdateFrom, UpdateTo } from "../store/index/actions";
import PropTypes from "prop-types";
import pinyin from "pinyin";
import PreventShake from "../utils/PreventShake";
import "../assets/scss/city-list.scss";
import {
	UpdateFromWhere,
	UpdateIsSearch,
	UpdateSearchList,
} from "../store/city-list/actions";
import React, {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

const CityMap = {
	from: 1,
	to: 2,
};

const Letter = () => {
	let arr = [];
	for (let i = 65; i < 65 + 26; i++) {
		arr.push(String.fromCharCode(i));
	}
	return arr;
};

/* ---------------------------------- 头部搜索 ---------------------------------- */
const CityListTop = memo(({ FuncSearch, ClickBack }) => {
	const [inputValue, setInputValue] = useState("");
	const input = useRef();
	const preventShake = useCallback(PreventShake(500), []);

	// ChangeInputValue 改变输入的内容，执行搜索任务
	const ChangeInputValue = useCallback(() => {
		// 获取ref的值，赋值给inputValue
		setInputValue(input.current.value);
	}, [input]);

	// 搜索操作
	useEffect(() => {
		preventShake(FuncSearch, inputValue);
	}, [inputValue, FuncSearch, preventShake]);

	return (
		<div className="top x-y-center">
			<i className="back iconfont icon-ai207" onClick={ClickBack} />
			<div className="search x-y-center">
				<i className="iconfont icon-search" />
				<input
					ref={input}
					className="in"
					type="text"
					onChange={ChangeInputValue}
				/>
				<i className="iconfont icon-cancel" />
			</div>
		</div>
	);
});
CityListTop.propTypes = {
	FuncSearch: PropTypes.func,
	ClickBack: PropTypes.func,
};

/* ---------------------------------- 右侧边字母 --------------------------------- */
const CityListLetter = memo(({ letters, FuncGoToCity }) => {
	return (
		<div className="letter-wrapper">
			{letters.map((val, idx) => (
				<li
					className="item"
					onClick={() => FuncGoToCity(val)}
					key={idx}
				>
					{val}
				</li>
			))}
		</div>
	);
});
CityListLetter.propTypes = {
	letters: PropTypes.arrayOf(PropTypes.string),
	FuncGoToCity: PropTypes.func,
};

/* ---------------------------------- 渲染列表 ---------------------------------- */
const CityItem = memo(({ trainingLetter, data, FuncUpdateCity }) => {
	return (
		<div className="list">
			<h3 className="letter" data-letter={trainingLetter}>
				{trainingLetter}
			</h3>
			<ul className="city-wrapper">
				{data.map((val, idx) => (
					<li
						className="city"
						key={idx}
						onClick={() => FuncUpdateCity(val)}
					>
						{val}
					</li>
				))}
			</ul>
		</div>
	);
});
CityItem.propTypes = {
	trainingLetter: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.string),
	FuncUpdateCity: PropTypes.func,
};

/* ---------------------------------- main ---------------------------------- */
const CityList = memo(function CityList({
	list,
	searchList,
	isSearch,
	fromWhere,
	history,
	UpdateFrom,
	UpdateTo,
	UpdateFromWhere,
	UpdateIsSearch,
	UpdateSearchList,
}) {
	if (fromWhere <= 0) history.goBack();
	const letters = useMemo(Letter, []);

	// FuncUpdateCity 更新城市数据
	const FuncUpdateCity = useCallback(
		(val) => {
			UpdateFromWhere(0);
			if (fromWhere === CityMap.from) {
				return UpdateFrom(val);
			}
			if (fromWhere === CityMap.to) {
				return UpdateTo(val);
			}
		},
		[UpdateFromWhere, UpdateFrom, UpdateTo, fromWhere],
	);

	// FuncGoToCity 跳到指定的位置
	const FuncGoToCity = useCallback((city) => {
		let aim = document.querySelector(
			`.city-list>.list>.letter[data-letter=${city}]`,
		);
		aim && aim.scrollIntoView();
	}, []);

	// FuncSearch 头部搜索函数
	const FuncSearch = useCallback(
		(inputValue) => {
			if (inputValue.length <= 0) return UpdateIsSearch(false);
			let letter = pinyin(inputValue, {
				style: pinyin.STYLE_NORMAL,
			})[0][0][0].toUpperCase();
			for (let val of list) {
				if (val.trainingLetter === letter) {
					let arr = [];
					for (let item of val.data) {
						if (item.indexOf(inputValue) >= 0) {
							arr.push(item);
						}
					}
					UpdateSearchList([
						{
							trainingLetter: letter,
							data: arr,
						},
					]);
				}
			}
			UpdateIsSearch(true);
		},
		[list, UpdateSearchList, UpdateIsSearch],
	);

	// 头部返回按钮
	const ClickBack = useCallback(() => history.goBack(), [history]);

	const lists = useMemo(() => {
		if (isSearch) {
			return searchList;
		} else {
			return list;
		}
	}, [isSearch, searchList, list]);

	return (
		<div className="city-list">
			<CityListTop FuncSearch={FuncSearch} ClickBack={ClickBack} />
			<div className="data-wrapper x">
				<div className="data-list">
					{lists.map((val, idx) => (
						<CityItem
							key={val.trainingLetter}
							trainingLetter={val.trainingLetter}
							data={val.data}
							FuncUpdateCity={FuncUpdateCity}
						></CityItem>
					))}
				</div>
			</div>
			<CityListLetter letters={letters} FuncGoToCity={FuncGoToCity} />
		</div>
	);
});

const mapStateToProps = (state) => ({
	...state.CityListReducer,
});

const mapDispatchToProps = (dispatch) => ({
	UpdateFrom(from) {
		dispatch(UpdateFrom(from));
	},
	UpdateTo(to) {
		dispatch(UpdateTo(to));
	},
	UpdateFromWhere(data) {
		dispatch(UpdateFromWhere(data));
	},
	UpdateIsSearch(bool) {
		dispatch(UpdateIsSearch(bool));
	},
	UpdateSearchList(list) {
		dispatch(UpdateSearchList(list));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withRouter(CityList));
