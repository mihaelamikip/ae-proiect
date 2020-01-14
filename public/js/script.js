$(document).ready(function(){
    showCategories()
    showBooks()
})

function showCategories() {
    $.get( "/categories", function( data ) {
        var html = ''
        data.forEach(function(category) {
            html = html + '<li><a href="#" onClick="showBooks('+category.id+')">'+category.name+'</a></li>'
        })
        $('#categories').html(html)
    });
}

//todo: implement showBooks method
function showBooks(categoryId) {
    if(categoryId) {
        var url = '/categories/'+ categoryId +'/books';
    } else {
        var url = '/books'   
    }
    $.get(url, function(data) {
        var html = '';
        data.forEach(
            function(book) {
                html = html + '<div class="book">'
                  +  '<h2>'+ book.name +'</h2>'
                  +  '<p>Autor: ' + book.author + '</p'
                  +  '<p>'+ book.description +'</p>'
                  +  '<p>Pret: '+ book.pret +'</p>'
                  +  '<p>Categorie: '+book.category.name+'</p>'
                + '</div>';
                
                html = html + '<h3>Book reviews</h3>'
                
                if(book.reviews) {
                    book.reviews.forEach(
                        function(reviewData) {
                            html = html + reviewData.name + ' ' + reviewData.content;
                            html = html + '<br>';
                        }
                    )
                }
                
                
            }
        )
        $('#content').html(html);
    })
}