const express = require("express");

const app = express();

app.get("/api/rates", (req, res) => {
  const customers = [
    { id: 1, currency: "USD", price: 2.4 },
    { id: 2, currency: "BC", price: 2.4 }
  ];
  res.json(customers);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on port: ${port}`));