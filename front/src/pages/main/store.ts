import { makeAutoObservable } from "mobx";
import GistLoader from '../../repository/gist/dataLoader';

class MainPageStore {
	count = 0;
	constructor() {
		makeAutoObservable(this);
	}

	addCount() {
		this.count = this.count + 1;
	}

	async fetchData() {
		const dataLoader = new GistLoader('af700e6457ef5f5a4e6543c47c7ff76d')
		const data = await dataLoader.fetch();
		const {content} = data.files["kor_lotto_history.csv"];

		const [header, body] = content.split('\n').reduce((acc: [string[], [string[]]], curr: string, index: number) => {
			const row = curr.split(',');

			if (index === 0) {
				acc[0] = row;
			}	else {
				acc[1].push(row);
			}

			return acc;
		}, [[], []])
		console.log(header);
		console.log(body);

	}
}

export default MainPageStore;