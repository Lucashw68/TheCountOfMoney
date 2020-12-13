const mongoose = require('mongoose');
const Parser = require('rss-parser');
const Preferences = require('../../database/preferences/app').AppPreferenceModel;
const Article = require('../../database/article').ArticleModel;
const articleConfig = require('../../config/articles');
const images = require('../../config/image')
const parser = new Parser();

function launch(callback) {
  Preferences.findOne({}, function(err, preferences) {
    if (err) {
      console.error("Error retrieving sources feed list");
      return callback(true);
    }
    preferences.feeds_list.forEach(item => {
      getFromSource(item)
    })
    refreshArticles(articleConfig.refreshTime)
    return callback(false)
  })
}

function refreshArticles(refreshTime) {
  setInterval(() => {
    Preferences.findOne({}, function(err, preferences) {
      if (err) {
        console.error("Error retrieving sources feed list");
      }
      preferences.feeds_list.forEach(item => {
        getFromSource(item)
      })
    })
  }, refreshTime)
}

async function getFromSource(sourceURL) {
  try {
    let feed = await parser.parseURL(sourceURL);
    await Promise.all(feed.items.map(async (item) => {

      let newArticle = new Article({
        title:    !!item.title ? item.title : "Title",
        summary:  !!item.contentSnippet ? item.contentSnippet : "Summary",
        source:   !!feed.feedUrl ? feed.feedUrl : "FeedUrl",
        imageFeed:    feed.image !== undefined && !!feed.image.url
          ? feed.image.url
          : "https://img.icons8.com/cotton/2x/news.png",
        imageArticle: images[Math.floor(Math.random() * (images.length))],
        url:      !!item.link ? item.link : "Link",
        date:     !!item.pubDate ? item.pubDate : "PubDate",
      })
      Article.find({ title: newArticle.title }, function (err, articles) {
        if (articles === undefined || articles.length === 0) {
          newArticle.save(function (err, newArticle) {
            if (err) {
              console.error("Add article failed: ", err)
            }
          })
        }
      })
    }))
  } catch (err) {
    console.error(err)
  }
}

module.exports = { launch, refreshArticles, getFromSource };
