import { Provider } from 'mobx-react';
import * as React from 'react';
import Container from './container';
import MainPageStore from './store';

interface Props {
}

interface States {
}

/**
 * 로또 번호
 * 각 회차 당첨번호 테이블 생성
 */
class Main extends React.Component<Props, States> {
	store: MainPageStore;
	constructor(props: Props) {
		super(props);
		this.store = new MainPageStore();
	}
	componentDidMount() {
		this.store.fetchData()
	}

	render() {
		return (
			<Container store={this.store} />
		);
	}

}

export default Main;