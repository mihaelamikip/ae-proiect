var express = require("express")
var Sequelize = require("sequelize")

//connect to mysql database
var sequelize = new Sequelize('catalog', 'mikip1996', 'mikip1996', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
}).catch( function(err) {
    console.log(err)
})

//define a new Model
var Categories = sequelize.define('categories', {
    name: Sequelize.STRING,
    description: Sequelize.STRING
})

var Books = sequelize.define('books', {
    name: Sequelize.STRING,
    author: Sequelize.STRING,
    category_id: Sequelize.INTEGER,
    description: Sequelize.STRING,
    price: Sequelize.INTEGER,
    image: Sequelize.STRING
})

var Reviews = sequelize.define('reviews', {
    book_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    content: Sequelize.STRING,
    score: Sequelize.INTEGER
})

Books.belongsTo(Categories, {foreignKey: 'category_id', targetKey: 'id'})
Books.hasMany(Reviews, {foreignKey: 'book_id'});

var app = express()

//access static files
app.use(express.static('public'))
app.use('/admin', express.static('admin'))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/createdb', (request, response) => {
    sequelize.sync({force: true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        response.status(500).send('could not create tables')
    })
})

app.get('/createdata', (req, res) => {
    //TODO add some test data here
})

async function getCategories(request, response) {
    try {
        let categories = await Categories.findAll();
        response.status(200).json(categories)
    } catch(err) {
        response.status(500).send('something bad happened')
    }
}

// get a list of categories
app.get('/categories', getCategories)

// get one category by id
app.get('/categories/:id', function(request, response) {
    Categories.findOne({where: {id:request.params.id}}).then(function(category) {
        if(category) {
            response.status(200).send(category)
        } else {
            response.status(404).send()
        }
    })
})

//create a new category
app.post('/categories', function(request, response) {
    Categories.create(request.body).then(function(category) {
        response.status(201).send(category)
    })
})

app.put('/categories/:id', function(request, response) {
    Categories.findById(request.params.id).then(function(category) {
        if(category) {
            category.update(request.body).then(function(category){
                response.status(201).send(category)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/categories/:id', function(request, response) {
    Categories.findById(request.params.id).then(function(category) {
        if(category) {
            category.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/books', function(request, response) {
    Books.findAll(
        {
            include: [{
                model: Categories,
                where: { id: Sequelize.col('books.category_id') }
            }, {
                model: Reviews,
                where: { id: Sequelize.col('books.id')},
                required: false
            }]
        }
        
        ).then(
            function(books) {
                response.status(200).send(books)
            }
        )
})

app.get('/books/:id', function(request, response) {
    Books.findById(request.params.id, {
            include: [{
                model: Categories,
                where: { id: Sequelize.col('books.category_id') }
            }, {
                model: Reviews,
                where: { id: Sequelize.col('books.id')},
                required: false
            }]
        }).then(
            function(book) {
                response.status(200).send(book)
            }
        )
})

app.post('/books', function(request, response) {
    Books.create(request.body).then(function(book) {
        response.status(201).send(book)
    })
})

app.put('/books/:id', function(request, response) {
    Books.findById(request.params.id).then(function(book) {
        if(book) {
            book.update(request.body).then(function(book){
                response.status(201).send(book)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/books/:id', function(request, response) {
    Books.findById(request.params.id).then(function(book) {
        if(book) {
            book.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/categories/:id/books', function(request, response) {
    Books.findAll({
            where:{category_id: request.params.id},
            
            include: [{
                model: Categories,
                where: { id: Sequelize.col('books.category_id') }
            }, {
                model: Reviews,
                where: { id: Sequelize.col('books.id')},
                required: false
            }]
        }
            ).then(
            function(books) {
                response.status(200).send(books)
            }
        )
})

app.get('/reviews', function(request, response) {
    Reviews.findAll().then(function(reviews){
        response.status(200).send(reviews)
    })
})

app.get('/reviews/:id', function(request, response) {
    
})

app.post('/reviews', function(request, response) {
    Reviews.create(request.body).then(function(review) {
        response.status(201).send(review)
    })
})

app.put('/reviews/:id', function(request, response) {
    
})

app.delete('/reviews/:id', function(request, response) {
    
})

app.listen(8080)
