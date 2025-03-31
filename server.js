const express = require("express");
const path = require("path");

const app = express();
const PORT = 2000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the 'assets' directory
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Serve static files from the 'src' directory (for JS files)
app.use("/src", express.static(path.join(__dirname, "src")));

// Serve any HTML file in the 'public' folder dynamically
app.get("/:page", (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, "public", `${page}.html`);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send("Page not found");
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});