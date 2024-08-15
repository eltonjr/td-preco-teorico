const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/MeusInvestimentos/ListLastOperations', async(req, res) => {
	setTimeout(() => {
		res.sendFile(path.join(__dirname, 'public', 'ListLastOperations.html'));
	}, 1000);
})

app.post('/MeusInvestimentos/PositionSummaryChart', async(req, res) => {
	setTimeout(() => {
		res.sendFile(path.join(__dirname, 'public', 'PositionSummaryChart.html'));
	}, 1000);
})

app.post('/MeusInvestimentos/LoadDetalhe', async(req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'LoadDetalhe.json'));
})

app.get('/*', async(req, res) => {
	const filename = path.basename(req.path);
	res.sendFile(path.join(__dirname, 'public/assets', filename));
});

app.listen(8080, () => {
    console.log("Server successfully running on port 8080");
});
