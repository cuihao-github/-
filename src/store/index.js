import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import IndexReducer from "./index/index";
import CityListReducer from "./city-list";
import DateListReducer from "./date-list/index";
import TrainListReducer from "./train-list/index";
import TrainDetailReducer from "./train-detail/index.tsx";
import OrderReducer from "./order/index";

const store = createStore(
	combineReducers({
		IndexReducer,
		CityListReducer,
		DateListReducer,
		TrainListReducer,
		TrainDetailReducer,
		OrderReducer,
	}),
	composeWithDevTools(),
);

export const dispatch = store.dispatch;

export default store;
