const express = require('express');
const router = express();
Article = require('../model/article.js');
Category = require('../model/category.js');


router.get('/', (req,res,next) => {
Article.getArticle((err, article)=>{
  if (err) {
    res.send(err);
  }

  Article.getArticle((err,article) =>{
    res.render('articles', {
      title: 'Articles',
      article: article
    });
});

});
});

router.get('/show/:id', (req,res,next) => {
var id = req.params.id;

Article.getArticlebyid(id, (err,article)=>{
if(err){
  res.send(err);
}
res.render('article_singular', {
  title : 'Singular Article',
  article: article
});

});

});

router.get('/category/:category_id', (req,res,next) => {

  Article.getArticlebyCategory(req.params.category_id,(err,article)=> {
  Category.getCategoriesbyid(req.params.category_id,(err,category)=> {

  res.render('articles', {
    title : category.title + ' Articles',
    article: article
});

  });
  });
});
//Router To Add Post
// Add Article - POST
router.post('/add', (req, res, next) => {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('author', 'Author is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();
  req.checkBody('category', 'Category is required').notEmpty();

  let errors = req.validationErrors();
console.log(errors);
  if(errors){
    Category.getCategories((err, categories) => {
      res.render('add_article', {
        errors: errors,
        title: 'Add Article',
        categories: categories
      });
    });
  } else {
    let article = new Article();
    article.title = req.body.title;
    article.subtitle = req.body.subtitle;
    article.category = req.body.category;
    article.body = req.body.body;
    article.author = req.body.author;

    Article.addArticle(article, (err, article) => {
      if(err){
        res.send(err);
      }
      req.flash('success', 'Article Added');

      res.redirect('/manage/articles');
    });
  }
});
//End

//Router To Edit Post
router.post('/edit/:id', (req,res,next) => {
let article = new Article();
const query = {_id:req.params.id}
const update = {
  title: req.body.title,
  subtitle: req.body.subtitle,
  category: req.body.category,
  body: req.body.body,
  author:req.body.author

}

Article.updateArticle(query,update,{}, (err, article)=> {
if(err){
  res.send(err);
}
req.flash('success', 'Article Updated');

res.redirect('/manage/articles');
})
});
//End

//Delete Category
router.delete('/delete/:id', (req,res,next) => {
  const query = {_id : req.params.id};
  Article.removeArticle(query,(err, article)=> {
    console.log(article);
  if(err){
    res.send(err);
  }
  req.flash('success', 'Article Deleted');

  res.status(200);

});
});
//Delete Category

//COmment post router

router.post('/comments/add/:id',(req,res,next) => {
  req.checkBody('comment_subject', 'Comment Subject is required').notEmpty();
  req.checkBody('comment_email', 'Email is required').notEmpty();
  req.checkBody('comment_author', 'Author is required').notEmpty();
let errors = req.validationErrors();

if(errors){
  Article.getArticlebyid(req.params.id, (err,article)=> {
res.render('article_singular',{
  title: 'Article',
  article: article,
  errors: errors

});
});
} else{
let article = new Article();
let query = {_id:req.params.id }

let comment = {
  comment_subject: req.body.comment_subject,
  comment_email: req.body.comment_email,
  comment_author: req.body.comment_author,
  comment_body: req.body.comment_body
}
Article.addComment(query, comment,(err,article)=> {
res.redirect('/articles/show/'+req.params.id)
});


}

});
module.exports = router;
