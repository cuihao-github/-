import React, { memo, FC, useMemo, useCallback, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Header from "../components/header";
import "../assets/scss/train-detail.scss";
import ClassName from "../utils/ClassName";
import { dispatch } from "../store";
import {
	UpdateBuyType,
	UpdatePriceInTrainDetail,
	UpdateSeatClass,
} from "../store/train-detail/actions";
import { BuyType, SeatClass } from "../store/train-detail";

/* ---------------------------------- 渲染数据 ---------------------------------- */
interface INews {
	from: string;
	to: string;
	trainNumber: string;
	date: string;
	startTime: Array<any>;
	endTime: Array<any>;
}
const News: FC<INews> = memo(
	({ from, to, trainNumber, startTime, endTime, date }) => {
		return (
			<div className="news x-y-center">
				<div className="left y-x-center">
					<p className="address">{from}</p>
					<p className="time">{startTime}</p>
					<p className="date">{date}</p>
				</div>
				<div className="middle y-x-center">
					<p className="train-number">{trainNumber} 高速动车</p>
					<p className="plane">—— 时刻表 ——</p>
					<p className="time-len">耗时2小时</p>
				</div>
				<div className="right y-x-center">
					<p className="address">{to}</p>
					<p className="time">{endTime}</p>
					<p className="date">{date}</p>
				</div>
			</div>
		);
	},
);

/* ---------------------------------- 座位列表 ---------------------------------- */
interface ISeatList {
	ClickGoToBuy: any;
}
const SeatList: FC<ISeatList> = memo(({ ClickGoToBuy }) => {
	// 下来是够打开
	const [isOpens, setIsOpens] = useState([false, false, false]);

	// 打开列表
	const ClickOpen = useCallback(
		(idx) => {
			let arr = [false, false, false];
			arr[idx] = isOpens[idx];
			arr[idx] = !arr[idx];
			setIsOpens([...arr]);
		},
		[isOpens],
	);

	return (
		<div className="seat-list">
			<SeatItem
				seatClass="二等座"
				price={553}
				ClickOpen={() => ClickOpen(0)}
				isOpen={isOpens[0]}
				ClickGoToBuy={(buyType: string) =>
					ClickGoToBuy({
						seatClass: SeatClass.two,
						buyType: buyType,
						price: 553,
					})
				}
			/>
			<SeatItem
				seatClass="一等座"
				price={933}
				ClickOpen={() => ClickOpen(1)}
				isOpen={isOpens[1]}
				ClickGoToBuy={(buyType: string) =>
					ClickGoToBuy({
						seatClass: SeatClass.one,
						buyType: buyType,
						price: 993,
					})
				}
			/>
			<SeatItem
				seatClass="商务座"
				price={1748}
				ClickOpen={() => ClickOpen(2)}
				isOpen={isOpens[2]}
				ClickGoToBuy={(buyType: string) =>
					ClickGoToBuy({
						seatClass: SeatClass.super,
						buyType: buyType,
						price: 1748,
					})
				}
			/>
		</div>
	);
});

/* --------------------------------- 座位列表元素 --------------------------------- */
interface ISeatItem {
	seatClass: string;
	price: number;
	isOpen: boolean;
	ClickOpen: () => void;
	ClickGoToBuy: (buyType: string) => void;
}
const SeatItem: FC<ISeatItem> = memo(
	({ seatClass, price, isOpen, ClickOpen, ClickGoToBuy }) => {
		return (
			<div className="item">
				<div className="up x-y-center" onClick={ClickOpen}>
					<span className="seat">{seatClass}</span>
					<span className="price">￥{price}</span>
					<span className="yp">有票</span>
					<button className="btn">预定</button>
				</div>
				<ul {...ClassName({ "down-open": isOpen }, "down")}>
					<li className="one x-y-center">
						<img className="img img1" src="" alt="" />
						<div className="buy">
							<p className="top">去哪网快速预定</p>
							<p className="bottom">
								火车票{price}元+40元优惠卷包，7*24小时服务
							</p>
						</div>
						<button
							className="btn"
							onClick={() => ClickGoToBuy(BuyType.fast)}
						>
							买票
						</button>
					</li>
					<li className="two x-y-center">
						<img className="img img2" src="" alt="" />
						<div className="buy">
							<p className="top">普通预定</p>
							<p className="bottom">去哪网帮你买，官网直购</p>
						</div>
						<button
							className="btn"
							onClick={() => ClickGoToBuy(BuyType.slow)}
						>
							买票
						</button>
					</li>
				</ul>
			</div>
		);
	},
);

/* ---------------------------------- main ---------------------------------- */
interface ITrainDefault extends RouteComponentProps {
	selectTrain: any;
	date: Array<any>;
}
const TrainDetail: FC<ITrainDefault> = memo(
	({ selectTrain, date: DateArray, history }) => {
		// date日期数据
		const date = useMemo<string>(() => {
			return `${DateArray[1]}-${DateArray[2]} ${DateArray[3]}`;
		}, [DateArray]);

		// ClickBack头部返回上一页
		const ClickBack = useCallback(() => history.goBack(), [history]);

		// 进入顶大页面
		const ClickGoToBuy = useCallback(
			(data?: any) => {
				// 修改座位的等级
				dispatch(UpdateSeatClass(data.seatClass));
				// 修改购买的方式
				dispatch(UpdateBuyType(data.buyType));
				// 更改价格
				dispatch(UpdatePriceInTrainDetail(data.price));
				// 跳转至order页面
				history.push("/order");
			},
			[history],
		);

		return (
			<div className="train-detail">
				<Header title={selectTrain.trainNumber} ClickBack={ClickBack} />
				<News
					from={selectTrain.from}
					to={selectTrain.to}
					trainNumber={selectTrain.trainNumber}
					startTime={selectTrain.startTime}
					endTime={selectTrain.endTime}
					date={date}
				/>
				<SeatList ClickGoToBuy={ClickGoToBuy} />
			</div>
		);
	},
);

const mapStateToProps = (state: any) => ({
	selectTrain: state.TrainListReducer.selectTrain,
	date: state.TrainListReducer.date,
});

export default connect(mapStateToProps, null)(withRouter(TrainDetail));
