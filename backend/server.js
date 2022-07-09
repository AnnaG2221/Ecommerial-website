const express = require("express");
const colors = require("colors");
const connectDB = require("./database/db");
const User = require("./database/models/userModel");
const Product = require("./database/models/ProductModel");
const cors = require("cors");

const app = express();

connectDB();

// console.log(User);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/api/allPruducts", async (req, res) => {
  const allProducts = await Product.find({}).exec();
  res.json(allProducts);
});

app.get("/api/allPruducts/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email, password });
  if (foundUser) {
    const token = foundUser.generateAuthToken();
    res
      .status(200)
      .json({ data: foundUser, message: "login success!", foundUser });
  } else {
    res.status(400).json({ error: "Not authorized" });
  }
});

app.get("/api/user", async (req, res) => {
  const allUsers = await User.find();
  res.json(allUsers);
});

app.put("/api/cart", async (req, res) => {
  const { email, cart } = req.body;
  const foundUser = await User.findOneAndUpdate({ email }, { cart });
  // console.log (foundUser);
  if (foundUser) {
    res.status(200).json({ data: foundUser, message: "Cart Updated" });
  } else {
    res.status(400).json({ error: "Cart Update not success!" });
  }
});

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const findUser = await User.findOne({ email });
  if (!email) {
    res.status(400).json({ error: "Please input correct email" });
  } else if (!password) {
    res.status(400).json({ error: "please input your password" });
  } else {
    if (findUser) {
      res.status(400).json({ error: "User exist" });
    } else {
      var user = await User.create({ email, password });
      res.status(200).json({ success: "register success", user });
    }
  }
});

app.post("/api/add", async (req, res) => {
  const { name } = req.body;
  const foundOne = await Product.findOne({ name });
  if (foundOne) {
    res.status(400).json({ error: " Duplicate product" });
  } else {
    const product = await Product.create(req.body);
    res.status(200).json({ success: "product was added", product });
  }
});

app.post("/api/edit/:id", async (req, res) => {
  const { _id} = req.body;
  const findOne = await Product.findOneAndUpdate({_id }, req.body);
  if (JSON.stringify(findOne) === JSON.stringify(req.body)) {
    res.status(400).json({ Error: "No changed made" });
  } else {
    if (findOne) {
      res.status(200).json({ success: "product was updated" });
    } else {
      res.status(400).json({ Error: "failed to update" });
    }
  }
});

app.delete("/api/edit/:id", async (req, res) => {
  const {id} = req.params;
  console.log(id)
  const foundOne = await Product.findOneAndDelete({_id:id})
  if(foundOne) {
    res.status(200).json({message: 'product Deleted'});
  } else {
    res.status(400).json({Error: 'product not found'})
  }
})

// handle error
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  res.json({
    message: err.message,
  });
};

app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server started on the port 8000");
});
