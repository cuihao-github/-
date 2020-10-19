import React, { Suspense } from "react";

// 懒加载页面
function LazyPage(Page) {
	return function () {
		return (
			<Suspense fallback={<h1>loading</h1>}>
				<Page></Page>
			</Suspense>
		);
	};
}

export default LazyPage;
