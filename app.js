require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

async function pullData() {
	let count = 0;
	let page = 'CO4FEAA';
	let entries = [];
	do {
		console.log(count);
		try {
		const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCpKV3InanmihC8do0XRoBkQ&maxResults=50&order=date&pageToken=${page}&key=${process.env.key}`;
		let res = await axios.get(endpoint);
		page = res.data.nextPageToken;
		const arr = res.data.items.map(entry => {
			const date = entry.snippet.publishedAt.split('T')[0];
			return `${date},${entry.snippet.title}\r\n`;
		});
		entries = entries.concat(arr);
		} catch (err) {
			console.log(err);
		}
		count++;
	} while (count < 40 && page!=='');
	let str = entries.reverse().join('');
	console.log(page);
	fs.writeFile('beyond1031_a.csv', str, (err) => console.log('error writing file:', err));
	//nextPageToken
}
pullData();

