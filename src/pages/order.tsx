import * as React from "react";
import { memo, FC, useCallback, useMemo, useState, useRef } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import Header from "../components/header";
import "../assets/scss/order.scss";
import ClassName from "../utils/ClassName";

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

/* --------------------------------- 录入用户的消息 -------------------------------- */
interface IOrderList {
	onBind: any;
}
const OrderList: FC<IOrderList> = memo(({ onBind }) => {
	return (
		<div className="lists">
			<OrderInput title="姓名" filed="name" onBind={onBind} />
			<OrderInput title="身份证" filed="cardId" onBind={onBind} />
			<OrderInput title="手机号" filed="phone" onBind={onBind} />
		</div>
	);
});

/* ------------------------------- 录入用户的消息输入框 ------------------------------- */
interface IOrderInput {
	title: string;
	filed: string;
	onBind: any;
}
const OrderInput: FC<IOrderInput> = memo(({ title, filed, onBind }) => {
	const refInput = useRef(null);

	return (
		<div className="item x-y-center">
			<span className="title">{title}</span>
			<i className="span"></i>
			<input
				className="in"
				type="text"
				ref={refInput}
				onChange={() => onBind(filed, refInput.current)}
			/>
		</div>
	);
});

/* ----------------------------------- 选座 ----------------------------------- */
interface ISelectSeat {
	seats: Array<boolean>;
	seatSum: number;
	onBindSeats: any;
}
const SelectSeat: FC<ISelectSeat> = memo(({ seats, seatSum, onBindSeats }) => {
	const curLen = useMemo(() => {
		let count = 0;
		for (let val of seats) {
			if (val === true) {
				count++;
			}
		}
		return count;
	}, [seats]);

	return (
		<div className="select-seat">
			<div className="title x-y-center">
				<span>在线选座</span>
				<span>
					{curLen}/{seatSum}
				</span>
			</div>
			<div className="seat-list x-y-center">
				<span className="text">窗</span>
				<span
					{...ClassName({ select: seats[0] }, "seat-item")}
					onClick={() => onBindSeats(0)}
				>
					A
				</span>
				<span
					{...ClassName({ select: seats[1] }, "seat-item")}
					onClick={() => onBindSeats(1)}
				>
					B
				</span>
				<span
					{...ClassName({ select: seats[2] }, "seat-item")}
					onClick={() => onBindSeats(2)}
				>
					C
				</span>
				<span className="text">过道</span>
				<span
					{...ClassName({ select: seats[3] }, "seat-item")}
					onClick={() => onBindSeats(3)}
				>
					D
				</span>
				<span
					{...ClassName({ select: seats[4] }, "seat-item")}
					onClick={() => onBindSeats(4)}
				>
					F
				</span>
				<span className="text">窗</span>
			</div>
			<p className="p">优先按指定坐席出票，若无票将转购其他座位</p>
		</div>
	);
});

/* ---------------------------------- main ---------------------------------- */
interface IOrder extends RouteComponentProps {
	selectTrain: any;
	date: Array<any>;
	seatClass: string;
	price: number;
}
const Order: FC<IOrder> = memo(
	({ history, selectTrain, date: DateArray, seatClass, price }) => {
		/* ----------------------------------- 数据 ----------------------------------- */
		// 用户录入信息
		const [orderList, setOrderList] = useState([
			{
				name: "",
				cardId: null,
				phone: null,
			},
		]);

		// 选择的座位
		const [seats, setSeats] = useState([false, false, false, false, false]);

		// date日期数据
		const date = useMemo<string>(() => {
			return `${DateArray[1]}-${DateArray[2]} ${DateArray[3]}`;
		}, [DateArray]);

		// 计算总的价格
		const sumPrice = useMemo(() => {
			return orderList.length * price;
		}, [orderList.length, price]);

		/* ----------------------------------- 方法 ----------------------------------- */
		// 返回上一页
		const ClickBack = useCallback(() => history.goBack(), [history]);

		// 修改用户的输入
		const onBind = useCallback(
			(idx: number, filed: string, e: any) => {
				let arr: Array<any> = [...orderList];
				arr[idx][filed] = e.value;
				setOrderList([...arr]);
			},
			[orderList],
		);

		// 添加票
		const onAddTicket = useCallback(() => {
			let obj = {
				name: "",
				cardId: null,
				phone: null,
			};
			setOrderList([...orderList, obj]);
		}, [orderList]);

		// 删除一个票数
		const onCancelTicket = useCallback(() => {
			if (orderList.length <= 1) return;
			orderList.pop();
			setOrderList([...orderList]);
		}, [orderList]);

		// 改变座位
		const onBindSeats = useCallback(
			(idx: number) => {
				// 如果选择的座数量大于票数，返回
				if (seats[idx] === true) {
					seats[idx] = !seats[idx];
					setSeats([...seats]);
				} else {
					let counter = 0;
					for (let val of seats) {
						if (val === true) {
							counter++;
							if (counter >= orderList.length) {
								return;
							}
						}
					}
					// 改变seats中对应idx为true
					seats[idx] = !seats[idx];
					setSeats([...seats]);
				}
			},
			[seats, orderList.length],
		);

		// 提交订单
		const onSubmit = useCallback(() => {
			// 票数
			for (let val of orderList) {
				if (val.cardId === "" || val.name === "" || val.phone === "") {
					return alert("请填写完整的性姓名，身份证，手机号");
				}
			}

			// 座位数
			let count = 0;
			for (let val of seats) {
				if (val === true) {
					count++;
				}
			}
			if (count < orderList.length) return alert("请选择足够的座位数");
			alert("提交订单成功");
		}, [orderList, seats]);

		return (
			<div className="order">
				<Header title="订单填写" ClickBack={ClickBack} />
				<News
					from={selectTrain.from}
					to={selectTrain.to}
					trainNumber={selectTrain.trainNumber}
					startTime={selectTrain.startTime}
					endTime={selectTrain.endTime}
					date={date}
				/>
				<div className="seat-price center">
					<span className="seats">{seatClass}</span>
					<span className="price">￥{price}</span>
				</div>
				<div className="input-ticket">
					{orderList.map((val, idx) => (
						<OrderList
							key={idx}
							onBind={(filed: string, e: any) =>
								onBind(idx, filed, e)
							}
						/>
					))}
				</div>
				<div className="tickets x-y-center">
					<button className="ticket add-ticket" onClick={onAddTicket}>
						添加成人票
					</button>
					<button
						className="ticket cancel-ticket"
						onClick={onCancelTicket}
					>
						取消火车票
					</button>
				</div>

				<SelectSeat
					seats={seats}
					onBindSeats={onBindSeats}
					seatSum={orderList.length}
				/>
				<div className="toast">
					<p>
						据铁路要求，为加强新冠肺炎防治工作，2月1日起，购票时需提供每一名乘车人本人使用的手机，以便在需要时联络。
					</p>
					<p>
						**未成年人/老人等重点旅客及无手机旅客。可提供监护人或能及时联系的亲友手机。
					</p>
					<p>
						**港澳台及外籍旅客可提供邮箱。
						点击提交订单表示已阅读并同意 《预订须知》，
						《火车票服务协议》 出票方：北京津渡远游信息技术有限公司
						工商执照信息
					</p>
				</div>
				<div className="submit x-y-center">
					<p className="sum">
						<span>￥</span>
						{sumPrice}
					</p>
					<button className="btn" onClick={onSubmit}>
						提交订单
					</button>
				</div>
			</div>
		);
	},
);

const mapStateToProps = (state: any) => ({
	selectTrain: state.TrainListReducer.selectTrain,
	date: state.TrainListReducer.date,
	...state.TrainDetailReducer,
});

export default connect(mapStateToProps, null)(withRouter(Order));
