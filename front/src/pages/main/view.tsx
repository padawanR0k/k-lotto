import * as React from 'react';
import MainPageStore from './store';
import { observer } from 'mobx-react';
const View: React.FC<{store: MainPageStore}> = observer(({store}) => {
	return (
		<div>
			메인 페이지의 뷰
			{store.count}
			<button onClick={() => store.addCount()} >+</button>
		</div>
	);
});

export default View;