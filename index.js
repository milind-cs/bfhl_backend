const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
