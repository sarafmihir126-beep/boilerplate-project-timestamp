// server.js
const express = require("express");
const app = express();

// Serve static files (like your index.html)
app.use(express.static("public"));

// Root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// API route
app.get("/api/:date?", (req, res) => {
  let { date } = req.params;

  // If no date is provided, use the current date
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  }

  // Check if the date is a valid timestamp number
  // (like 1451001600000)
  if (!isNaN(date)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  // Handle invalid dates
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return valid date response
  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
