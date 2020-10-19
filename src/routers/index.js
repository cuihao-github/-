import { lazy } from "react";
import LazyPage from "../utils/lazy-load-page";
const index = lazy(() => import("../pages/index"));
const cityList = lazy(() => import("../pages/city-list"));
const dateList = lazy(() => import("../pages/date-list"));
const trainList = lazy(() => import("../pages/train-list"));
const trainDetail = lazy(() => import("../pages/train-detail.tsx"));
const order = lazy(() => import("../pages/order.tsx"));

const routes = [
	{
		path: "/index",
		component: LazyPage(index),
	},
	{
		path: "/cityList",
		component: LazyPage(cityList),
	},
	{
		path: "/dateList",
		component: LazyPage(dateList),
	},
	{
		path: "/trainList",
		component: LazyPage(trainList),
	},
	{
		path: "/trainDetail",
		component: LazyPage(trainDetail),
	},
	{
		path: "/order",
		component: LazyPage(order),
	},
];

export default routes;
