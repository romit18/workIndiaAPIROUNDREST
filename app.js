const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const userRoute = require('./routes/user');
app.use('/app/agent', userRoute);

const postsRoute = require('./routes/posts');
app.use('/app/sites', postsRoute);

app.get("/", (req, res) => {
    res.json({ message: "TODO app" });
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port 5000.");
});
