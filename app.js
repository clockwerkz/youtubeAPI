require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCpKV3InanmihC8do0XRoBkQ&maxResults=3&order=date&key=${process.env.key}`;

// axios.get(endpoint)
// 	.then(data =>{

// 		console.log(data.data.items);
// 		const arr = data.data.items;
// 		fs.writeFile('data.txt', JSON.stringify(arr), (err)=> {
// 			if (err) console.log("Error writing file",err);
// 		})
// 	})
// 	.catch(err => console.log(err));



//fs.writeFile('2pac.txt', lyrics, (err) => {
// throws an error, you could also catch it here


const data = [
	{
	  kind: 'youtube#searchResult',
	  etag: '"Fznwjl6JEQdo1MGvHOGaz_YanRU/iCpm-RjYLGNBU7SkWIFSrzypW_U"',
	  id: { kind: 'youtube#video', videoId: 'aDFCJW1zcaE' },
	  snippet: {
		publishedAt: '2020-02-14T18:00:00.000Z',
		channelId: 'UCpKV3InanmihC8do0XRoBkQ',
		title: 'Preparing Evidence!! [Day 3392 - 02.13.20]',
		description: 'Beyond1031 Vlogs: SEASON 10 Get your FREE STOCK! No Fees, No Obligation! http://freestock.robinhood.com/troyf254 You can also try WeBull! Free stock!',
		thumbnails: [Object],
		channelTitle: 'Beyond1031',
		liveBroadcastContent: 'none'
	  }
	},
	{
	  kind: 'youtube#searchResult',
	  etag: '"Fznwjl6JEQdo1MGvHOGaz_YanRU/JMiQ_ySa0t0zUq8pXxu1SS0_dMU"',
	  id: { kind: 'youtube#video', videoId: 'slenRYYB7V8' },
	  snippet: {
		publishedAt: '2020-02-13T18:00:09.000Z',
		channelId: 'UCpKV3InanmihC8do0XRoBkQ',
		title: 'Reacting To 1980&#39;s Toys [Day 3391 - 02.12.20]',
		description: 'Beyond1031 Vlogs: SEASON 10 Get your FREE STOCK! No Fees, No Obligation! http://freestock.robinhood.com/troyf254 You can also try WeBull! Fr  ee stock!',
		thumbnails: [Object],
		channelTitle: 'Beyond1031',
		liveBroadcastContent: 'none'
	  }
	},
	{
	  kind: 'youtube#searchResult',
	  etag: '"Fznwjl6JEQdo1MGvHOGaz_YanRU/xIsVH1945uziNbjte7Ph39PrRLQ"',
	  id: { kind: 'youtube#video', videoId: 'd1UaRLEDKYc' },
	  snippet: {
		publishedAt: '2020-02-12T18:00:11.000Z',
		channelId: 'UCpKV3InanmihC8do0XRoBkQ',
		title: 'BIG NEWS [Day 3390 - 02.11.20]',
		description: 'Beyond1031 Vlogs: SEASON 10 Get your FREE STOCK! No Fees, No Obligation! http://freestock.robinhood.com/troyf254 You can also try WeBull! Free stock!',
		thumbnails: [Object],
		channelTitle: 'Beyond1031',
		liveBroadcastContent: 'none'
	  }
	}
  ]
  
  const arr = data.map(entry => {
	const date = 
  });