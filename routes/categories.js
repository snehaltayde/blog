const express = require('express');
const router = express();
Category = require('../model/category.js');
const ObjectID = require('mongodb').ObjectID;


router.get('/', (req,res,next) => {
  Category.getCategories((err, category) =>{
if(err) {
  console.log(err);
}
res.render('categories', {
  title: 'Categories',
  category: category
});
});
});

router.post('/add', (req, res, next) => {
req.checkBody('title', 'Title is required').notEmpty();
req.checkBody('description', 'description is required').notEmpty();

let errors = req.validationErrors();
if(errors){
res.render('add_category.ejs', {
  errors: errors,
  title : 'Add Category'
})

}else{
  let category = new Category();
  category.title = req.body.title;
  category.desc = req.body.description;
  Category.addCategories(category, (err, category)=> {
  if(err){
    res.send(err);
  }
  req.flash('success', 'Category Added');
  res.redirect('/manage/categories');

  })
}

});

//Post UPdate Category

router.post('/edit/:id', (req,res,next) => {
  console.log(req.params.id);
  let category = new Category();
  const query = {_id : req.params.id};
  console.log(req.params.id);
  const update = {title: req.body.title,desc :req.body.description}
console.log(update);
  Category.updateCategory(query,update,{new: true},(err, category)=> {
  if(err){
    res.send(err);
  }
  console.log(category);
  req.flash('success', 'Category updated');
  res.redirect('/manage/categories');

});
});
//Update Category Ends
//Delete Category
router.delete('/delete/:id', (req,res,next) => {
  const query = {_id : req.params.id};
  Category.removeCategory(query,(err, category)=> {
    console.log(category);
  if(err){
    res.send(err);
  }
  req.flash('success', 'Category Removed');

  res.status(200);

});
});
//Delete Category

module.exports = router;
