const mongoose = require('mongoose');
mongoose.set('debug', true);

const categorySchema = mongoose.Schema({
    title:{
      type: String
    },
    desc: {
      type:String
    }

});

const Category = module.exports = mongoose.model('Category', categorySchema);

//Get categories
module.exports.getCategories = function(callback, limit){
  Category.find(callback).limit(limit).sort([['title', 'ascending']]);
}
//Create Category FUnction
module.exports.addCategories = function(category, callback){

  Category.create(category, callback);
}
//Get Categories by id

module.exports.getCategoriesbyid = function(id, callback){
  Category.findById(id, callback);
}

//Update Category

module.exports.updateCategory = function(query, update, options, callback){
Category.findByIdAndUpdate(query, update, options, callback);
}
//Delete category
module.exports.removeCategory = function(query,callback){
  Category.remove(query,callback);
}
