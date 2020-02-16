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
//pullData();
function saveCSVFile() {
	try {
		const data = fs.readFileSync('data.txt', 'utf8')
		const arr = data.split('\n');
		let dateRegex = /\d{2}[\/\.]\d{2}[\/\.]2?0?\d{2}/;
		let dayRegex = /Day \d{1,4}/;
		let urlRegex = /\/watch\?v=[\w_-]{11}/;
		const formattedCells = arr.map((entry,i) => {
			let date = entry.match(dateRegex);
			let day = entry.match(dayRegex);
			let video = entry.match(urlRegex);
			let url = video ? 'https://www.youtube.com'+video[0] : 'no link';	
			let formattedEntry = entry.replace(urlRegex,'');
			formattedEntry = formattedEntry.replace(',','\,');
			return `${day ? day[0]:''};${date ? date[0] : ''};${url};${formattedEntry}`;
		});
		let str = formattedCells.join('');
		fs.writeFile('beyond1031.csv', str, (err) => console.log('error writing file:', err));
	} catch (err) {
		console.error(err)
	}
}
saveCSVFile();
// let str1 = 'Hellmouth  Vlog 09/26/10 [Day 1]  - Prop Car Intro	/watch?v=1MRFmIiohE0';
// let str2 = 'Hangouts and The Witch!! [Day 1936 - 02.18.16]	/watch?v=aoxsaI6pr84';
// let dateRegex = /\d{2}[\/\.]\d{2}[\/\.]2?0?\d{2}/;
// let dayRegex = /Day \d{1,4}/;
// let urlRegex = /\/watch\?v=\w{11}/;
// //https://www.youtube.com/watch?v=a5TJfUWjvKk
// console.log(str1.match(dateRegex)[0]);
// console.log(str2.match(dateRegex)[0]);
// console.log(str1.match(dayRegex)[0]);
// console.log(str2.match(dayRegex)[0]);
// console.log(str1.match(urlRegex)[0]);
// console.log(str2.match(urlRegex)[0]);
