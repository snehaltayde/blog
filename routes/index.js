const express = require('express');
const router = express();
Article = require('../model/article.js');
Category = require('../model/category.js');

router.get('/', (req,res,next) => {
Article.getArticle((err, articles) => {

  res.render('index', {
    title: 'Mediastic Blog',
    articles: articles
  });
});

})

module.exports = router;
