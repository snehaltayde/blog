const mongoose = require('mongoose');
mongoose.set('debug', true);

const articleSchema = mongoose.Schema({
    title:{
      type: String
    },
    subtitle: {
      type:String
    },
    category: {
      type:String
    },
    body: {
      type:String
    },
    author: {
      type:String
    },
    createdat: {
      type:Date,
      default: Date.now
    },
    comments: [{
      comment_subject:{
        type: String
      },

      comment_body:{
        type: String
        },

      comment_author:{
        type: String
        },
      comment_date:{
        type: String
            }
    }]

});

const Article = module.exports = mongoose.model('Article', articleSchema);

//Get Article
module.exports.getArticle = function(callback, limit){
  Article.find(callback).limit(limit).sort([['title', 'ascending']]);
}
//
module.exports.getArticlebyCategory = function(categoryId, callback){
let query = {category: categoryId}
Article.find(query,callback).sort([['title', 'ascending']])

}
//End
//Create Article FUnction
module.exports.addArticle = function(article, callback){

  Article.create(article, callback);
}
//Get Articles by id

module.exports.getArticlebyid = function(id, callback){
  Article.findById(id, callback);
}

//Update Articles

module.exports.updateArticle = function(query, update, options, callback){
Article.findByIdAndUpdate(query, update, options, callback);
}
//Delete Article
module.exports.removeArticle = function(query,callback){
  Article.remove(query,callback);
}

//add COmment

module.exports.addComment = function(query,comment,callback) {
  Article.update(query,{
$push : {
  comments: comment
}
}, callback
);
}
