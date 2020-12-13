const mongoose = require('mongoose');
const tokenManager = require('../utils/token');
const Article = require('../database/article').ArticleModel;

// @desc    Get articles
// @route   GET /articles[?params=value1&...]
// @params  [?length=] number of articles to return (default: 10)
exports.getArticles = (req, res, next) => {
  Article.find({}, null, {sort: '-date'}, function (err, articles) {
    let length = 10
    if (req.query.length !== undefined && req.query.length !== null)
      length = req.query.length
    if (!err && articles !== undefined && articles !== null) {
      res.status(200);
      res.send({
        success: true,
        message: "Articles retrieved",
        articles: articles.slice(0, length)
      });
    } else {
      res.status(500);
      res.send({
        success: false,
        message: "No articles"
      })
    }
  })
}

// @desc    Get article by id
// @route   GET /articles/{id}
exports.getArticle = (req, res, next) => {
  if (req.params.id !== undefined) {
    Article.findOne({ _id: req.params.id }, function(err, article) {
      if (article !== undefined && article !== null) {
        res.status(200);
        res.send({
          success: true,
          message: "Article retrieved",
          article: article
        });
      } else {
        res.status(500);
        res.send({
          success: false,
          message: "Invalid article ID"
        });
      }
    });
  } else {
    res.status(400);
    res.send({
      success: false,
      message: "Article doesn't exist"
    });
  }
}
