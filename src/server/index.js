const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(cors());

app.post("/add-customer", async (req, res) => {
  try {
    const { cust_name, email, password, Reference, admin_name, phnum } =
      req.body;

    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    // const firstThreeLetters = cust_name.slice(0, 3).toUpperCase();
    const firstThreeLetters = "PA";
    const cust_id = `${firstThreeLetters}${randomDigits}`;

    const randomDigits_ = Math.floor(100000 + Math.random() * 900000);
    const firstThreeLetters_ = cust_name.slice(0, 3).toUpperCase();
    const reference_id = `${firstThreeLetters_}${randomDigits_}`;

    console.log(
      "form details",
      cust_name,
      email,
      password,
      Reference,
      admin_name,
      phnum
    );

    // Check if the customer with the same email already exists
    const existingCustomerEmail = await Customer.findOne({ email });
    if (existingCustomerEmail) {
      return res
        .status(400)
        .json({ error: "A customer with the same email already exists" });
    }

    const existingCustomerPhnum = await Customer.findOne({ phnum });
    if (existingCustomerPhnum) {
      return res
        .status(400)
        .json({ error: "A customer with the Phone Number already exists" });
    }

    let referringCustomer = null;
    let referred_by = null;

    // Check if the referred_by code is provided
    if (Reference) {
      // Find the referring customer based on the referred_by code
      referringCustomer = await Customer.findOne({ reference_id: Reference });
      referred_by = referringCustomer["reference_id"];
      console.log("referring customers is ", referringCustomer["reference_id"]);
      if (!referringCustomer) {
        return res.status(400).json({ error: "Referring customer not found" });
      }
    }

    // Create a new customer instance
    const newCustomer = new Customer({
      cust_name,
      email,
      cust_id,
      password,
      reference_id,
      phnum,
      referred_by,
    });

    // Save the new customer to the database
    await newCustomer.save();
    res.status(201).json(newCustomer); // Respond with the newly created customer
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the customer" });
  }
});

app.listen(3003, () => {
  console.log("Started");
});
