import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const orders = await Order.find().populate("products");
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const { customer, phone, address, total, method, products } = req.body;

     // const productIds = products.map((productId) => mongoose.Types.ObjectId(productId));

      const order = await Order.create({
        customer,
        phone,
        address,
        total,
        method,
        products: products,
      });

      console.log("Order ", order)
      res.status(201).json(order);
     // console.log("Res ", res)
    } catch (err) {
      console.error("Error creating order:", err.message);
      res.status(500).json(err);
    }
  }
};

export default handler;