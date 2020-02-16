require('dotenv').config();
const axios = require('axios');
const cheerio = require('cheerio');
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



async function scrapeVideos() {
	const data = fs.readFileSync('data.txt', 'utf8');
	const arr = data.split('\n');
	let urlRegex = /\/watch\?v=[\w_-]{11}/;
	let videos = [];
	try {
		for (let i=0; i<100; i++) {
			let video = 'https://www.youtube.com'+arr[i].match(urlRegex)[0];
			const response = await axios.get(video);
			const html = response.data;
			//fs.writeFile('page.txt', html, (err) => console.log('error writing file:', err));
			const $ = cheerio.load(html);
			const videoTitle = $('#eow-title');
			const publishedOn = $('.watch-time-text');
			const videoData = {};
			videoData.videoTitle = videoTitle.html().trim();
			videoData.publishedOn = publishedOn.html().trim();
			videos.push(videoData);
		}
		console.log(videos);
	} catch(err) {
		console.log(err);
	}
}

scrapeVideos();

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
//saveCSVFile();