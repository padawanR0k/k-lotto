import React from 'react';
import { Container } from '@material-ui/core';
import Header from './Header';
import { Redirect, Route } from 'react-router-dom'

import routes from 'routes';
import SideMenu from './SideMenu';

interface Props {

}

interface States {
	open: boolean
}

class Layout extends React.Component<Props, States> {
	constructor(props: Props) {
		super(props);
		this.state = {
			open: false
		}
	}

	toggleSideMenu = () => {
		this.setState(({ open }) => ({ open: !open }))
	}

	render() {
		const { open } = this.state;

		return (
			<>
				<SideMenu toggle={this.toggleSideMenu} open={open} list={routes.routeList} />
				{
					routes.routeList.map((item, i) => {
						const Comp = item.component!;
						return (
							<Route
								key={i}
								path={item.path}
								render={props => <>
									<Header toggle={this.toggleSideMenu} title={item.title} />
									<Container>
										<Comp {...props} {...this.props}/>
									</Container>
								</>}
								{...this.props}/ >
						)
				})
				}
				<Redirect from="/" to="/main" />
			</>
		)
	}
}

export default Layout;