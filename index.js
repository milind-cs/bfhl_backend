const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid data format, expected { data: [...] }",
    });
  }

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highestLowercaseAlphabet =
    alphabets
      .filter((item) => /[a-z]/.test(item))
      .sort()
      .pop() || null;

  res.json({
    is_success: true,
    user_id: "milind_gandhi_25081999",
    email: "milindgandhi6@gmail.com",
    roll_number: "21BCE3595",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
      ? [highestLowercaseAlphabet]
      : [],
  });
});

const url = `https://bfhl-backend-18br.onrender.com`;
const interval = 10000;
function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${
          response.status
        }`
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message
      );
    });
}

setInterval(reloadWebsite, interval);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
