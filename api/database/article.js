let mongoose = require('mongoose');

let ArticleSchema = new mongoose.Schema({
  title: String,
  summary: String,
  source: String,
  imageFeed: String,
  imageArticle: String,
  url: String,
  date: Date
});

let ArticleModel = mongoose.model("Article", ArticleSchema);

exports.ArticleSchema = ArticleSchema;
exports.ArticleModel = ArticleModel;
