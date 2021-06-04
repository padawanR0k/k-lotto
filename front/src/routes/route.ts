import React from 'react';
import { RouteComponentProps } from 'react-router';

class Route {
	path = '';
	title = '';
	component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;

	constructor(opt: {
		path: string,
		component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>,
		title: string
	}) {
		Object.assign(this, opt)
	}
}

export default Route;