const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article_controller.js');


// @desc    Get articles
// @route   GET /articles[?params=value1&...]
router.get('/', articleController.getArticles);

// @desc    Get article by id
// @route   GET /articles/{id}
router.get('/:id', articleController.getArticle);

module.exports = router;
