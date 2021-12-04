const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();

const routes = require("./routes");

app.use((req, res, next) => {
	if(req.query.method) req.method = req.query.method.toUpperCase()

	next()
})

app.use("/api", routes);

app.all("*", (req, res) => {
	res.status(404).json({message: "not found"});
})

app.listen(PORT, () => {
	console.log(`Listening on PORT: ${PORT}`);
});