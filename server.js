const express = require('express');
const connectDB = require("./config/db");
const app = express();
const uuid = require('uuid/v4');
const stripe = require("stripe")("sk_test_d7FW0NFlisO3lWIivjGKZSt800147YgHhx");


//Connect to Database
connectDB();

app.get("/", (req, res) => {
	res.send('API is running')
})

app.use(express.json({extended: false}));


app.post("/checkout", async (req, res) => {
	console.log("Request:", req.body);
  
	let error;
	let status;
	try {
	  const { payment, token } = req.body;
  
	  const customer = await stripe.customers.create({
		email: token.email,
		source: token.id
	  });
  
	  const idempotency_key = uuid();
	  const charge = await stripe.charges.create(
		{
		  amount: payment.price * 100,
		  currency: "PHP",
		  customer: customer.id,
		  receipt_email: token.email,
		  description: `Purchased the ${payment.name}`,
		  shipping: {
			name: token.card.name,
			address: {
			  line1: token.card.address_line1,
			  line2: token.card.address_line2,
			  city: token.card.address_city,
			  country: token.card.address_country,
			  postal_code: token.card.address_zip
			}
		  }
		},
		{
		  idempotency_key
		}
	  );
	  status = "success";
	} catch (error) {
	  console.error("Error:", error);
	  status = "failure";
	}
	res.json({ error, status });
  });


//Define Routes
app.use("/api/guests", require("./routes/api/guests"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/service", require("./routes/api/service"));
app.use("/api/appt", require("./routes/api/appointment"));



const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));