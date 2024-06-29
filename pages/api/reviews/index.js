import dbConnect from "../../../util/mongo";
import Review from "../../../models/Review";

const handler = async (req, res) => {
  const { method } = req;

  await dbConnect();

  console.log(`Request Method: ${method}`);

  if (method === "GET") {
    try {
      const reviews = await Review.find();
      console.log("Reviews ", reviews)
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (method === "POST") {
    const { clientName, reviewText, rating } = req.body;

    try {
      const newReview = await Review.create({ clientName, reviewText, rating });
      console.log("Review ", newReview)
      //const savedReview = await newReview.create();
      res.status(201).json(newReview);
    } catch (err) {
      res.status(500).json({ error: "Failed to create review" });
    }
  }
};

export default handler;