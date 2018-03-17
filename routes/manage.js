const express = require('express');
const router = express();
Category = require('../model/category.js');


//Route For Getting Articles
router.get('/articles', (req,res,next) => {
  Article.getArticle((err, article)=>{
    if (err) {
      res.send(err);
    }
    res.render('manage_article', {
      title:'Manage Articles',
      article:article
    });

  });
  });
//End

//Route for Getting all categories
router.get('/categories', (req,res,next) => {
Category.getCategories((err, categories) => {
  if(err){
    res.render(err);
    return next;
  }
  res.render('manage_category', {
  title: 'Manage Category',
  category: categories
});
return next;
});
});
//End

//Route for Adding Article
router.get('/articles/add', (req,res,next) => {
Category.getCategories((err,categories) => {
if(err){
  res.send(err);
}
res.render('add_article.ejs', {
  title: 'Add Category',
  categories : categories
});
});
});
//ENd
//Route For Add Category
router.get('/categories/add', (req,res,next) => {
  res.render('add_category', {title: 'Add Category'});
});
//ENd

//Route for Edit Category
router.get('/categories/edit/:id', (req,res,next) => {

  Category.getCategoriesbyid(req.params.id, (err, resultcategory) => {
    if(err){
      res.send(err);
    }
    res.render('edit_category', {
      title: 'Edit Category',
    category: resultcategory
  });

  })
});
//Get Route For Edit Category
//Route for Edit Category
router.get('/articles/edit/:id', (req,res,next) => {
let id = req.params.id;
  Article.getArticlebyid(id, (err, resultarticle) => {
    if(err){
      res.send(err);
    }
    Category.getCategories((err,category)=> {
      res.render('edit_article', {
        title: 'Edit Article',
      article: resultarticle,
      category: category
    });

    });


  })
});
//Get Route For Edit Category

module.exports = router;
