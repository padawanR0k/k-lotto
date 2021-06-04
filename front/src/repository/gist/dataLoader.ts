class GistLoader {
	URL = 'https://api.github.com/gists/';
	gistID: string = '';
	constructor(gistID: string) {
		this.gistID = gistID;
	}

	async fetch() {
		const res = await fetch(this.URL + this.gistID);
		const json = await res.json();
		return json;
	}
}

export default GistLoader;