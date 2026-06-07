import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const {
      symbol,
      summary,
      sentiment,
      insight,
      risk,
      user_id,
    } = req.body;

    const { data, error } =
      await supabase
        .from("Watchlist")
        .insert([
          {
            symbol,
            summary,
            sentiment,
            insight,
            risk,
            user_id,
          }
        ]);

    if (error) throw error;

    res.json(data);

  } catch (error) {
  console.log(error);

  res.status(500).json({
    message: error.message
  });
}

});
router.get("/", async (req, res) => {

  try {

    const { data, error } =
      await supabase
        .from("Watchlist")
        .select("*")
        .eq("user_id", req.query.user_id)
        .order("created_at", {
          ascending: false
        });
if (error) {
  console.log(error);
  return res.status(500).json(error);
}

    res.json(data);

  } catch (error) {

  console.log(error);

  res.status(500).json({
    error: error.message
  });
}

});

export default router;