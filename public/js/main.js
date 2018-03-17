$(document).ready(() => {
$('.category-delete').on('click', (e) => {
$target = $(e.target);

$.ajax({
type: 'DELETE',
url: '/categories/delete/'+$target.attr('data-cat-id'),
sucess: (response) => {
  alert('Category Removed');
  window.location.href='/'
},
error: (error) => {
  console.log(error);
}

});
});
});


$(document).ready(() => {
$('.article-delete').on('click', (e) => {
$target = $(e.target);

$.ajax({
type: 'DELETE',
url: '/articles/delete/'+$target.attr('data-cat-id'),
sucess: (response) => {
  alert('Article Removed');
  window.location.href='/'
},
error: (error) => {
  console.log(error);
}

});
});
});
