import { LocalParking } from '@material-ui/icons';
import { observer } from 'mobx-react';
import * as React from 'react';
import MainPageStore from './store';
import View from './view';

const Container: React.FC<{store: MainPageStore}> = observer(({store}) => {
	return (
		<View store={store} />
	);
})

export default Container;