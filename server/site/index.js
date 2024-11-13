const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Index entrypoint

app.get('/Acompanhar', async(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// TD api

app.get('/MeusInvestimentos/Titulo/:broker/:title', async(req, res) => {
	setTimeout(() => {
		res.sendFile(path.join(__dirname, 'public', 'Title.html'));
	}, 1000);
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
});

// Static assets

app.get('/bundles/*', async(req, res) => {
	const filename = path.basename(req.path);
	const possibleExtensions = ['.js', '.css'];
	for (const extension of possibleExtensions) {
		if (fs.existsSync(path.join(__dirname, 'public/assets', `${filename}${extension}`))) {
			res.sendFile(path.join(__dirname, 'public/assets', `${filename}${extension}`));
			return;
		}
	}

	res.sendFile(path.join(__dirname, 'public/assets', filename));
});

app.get('/*', async(req, res) => {
	const filename = path.basename(req.path);
	res.sendFile(path.join(__dirname, 'public/assets', filename));
});

app.listen(8080, () => {
	console.log("Server running on port 8080");
	console.log("Open http://localhost:8080/Acompanhar");
});
