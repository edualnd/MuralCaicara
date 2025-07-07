import { getAllRatings } from "../../model/ratingModel.js";

export default async function getTodasAvaliacaoController(req, res) {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const result = await getAllRatings(Number(page), Number(limit));
    
    return res.status(200).json({
      success: true,
      data: result.ratings,
      pagination: result.pagination
    });
  } catch (error) {
  }
}