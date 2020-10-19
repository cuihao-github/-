import React, { memo } from "react";
import "../assets/scss/header.scss";

interface IHeader {
	title: string;
	ClickBack?: () => void;
}
const Header: React.FC<IHeader> = memo(({ title, ClickBack }) => {
	return (
		<div className="header x-y-center">
			<i
				className="iconfont icon-ai207 back"
				onClick={() => ClickBack && ClickBack()}
			/>
			<h1 className="title">{title}</h1>
		</div>
	);
});

export default Header;
