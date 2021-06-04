import Route from './route';

import MainPage from 'pages/main';

class Routes {
	private list: Route[] = [];
	constructor(routes: Route[]) {
		this.list = routes;
	}

	get routeList() {
		return this.list;
	}
}

const Main = new Route({
	title: '메인',
	path: '/main',
	component: MainPage
})

const list = [
	Main,
]

export default new Routes(list);
