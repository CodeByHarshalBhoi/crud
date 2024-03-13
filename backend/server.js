const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const cors =require("cors");

app.use(cors())
app.use(express.json());

//db Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/mern")
  .then(() => {
    console.log("DB Connection SuccessFully");
  })
  .catch((err) => {
    console.log(err);
  });

//user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

//create user
app.post("/createuser", async (req, res) => {
  try {
    const bodyData = req.body;
    const user = new User(bodyData);
    const userData = await user.save();
    res.send(userData);
  } catch (err) {
    res.send(err);
  }
});

//READ ALL USER
app.get("/getalluser", async (req, res) => {
  try {
    const userData = await User.find({});
    res.send(userData);
  } catch (err) {
    res.send(err);
  }
});

//GET SINGLE DATA BY ID
app.get("/get/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id });
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

//UPDATE DATA
app.put("/updateuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

//DELETE DATA
app.delete("/deleteuser/:id", async (req, res) => {
    try{

        const id = req.params.id;
        const user = await User.findByIdAndDelete({ _id: id })
        res.send(user);
    }catch(err){
        res.send(err);
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
