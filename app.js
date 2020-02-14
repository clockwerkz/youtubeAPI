const axios = require('axios');

const key = "Insert Key";

const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCpKV3InanmihC8do0XRoBkQ&maxResults=50&order=date&key=${key}`;

axios.get(endpoint)
	.then(data => console.log(data.data.items[0]))
	.catch(err => console.log(err));

