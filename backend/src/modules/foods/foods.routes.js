
const express = require("express");
const router = express.Router();

const {
    getAllFoods,
    getFoodById,
    searchFoods
} = require("./foods.controller");

// GET /api/foods
router.get("/", getAllFoods);

// GET /api/foods/search?q=com
router.get("/search", searchFoods);

// GET /api/foods/:id
router.get("/:id", getFoodById);

module.exports = router;
