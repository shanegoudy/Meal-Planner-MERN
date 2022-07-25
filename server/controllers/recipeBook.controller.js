const RecipeBook = require('../models/recipeBook.model');

module.exports = {
    findOne: (req, res) => {
        RecipeBook.findOne({ user: req.params.id })
        .then(book => {
            res.json(book)
        })
        .catch((err) => {
            res.json({ message: 'Error finding one book', error: err })
        });
    },
    
    createNewBook: (req, res) => {
        const newBookObject = new RecipeBook(req.body);
        
        newBookObject.save()
            .then(newlyCreatedBook => {
                res.json({ recipeBook: newlyCreatedBook })
            })
            .catch((err) => {
                res.json({ message: 'Something went wrong', error: err })
            });
    },

    updateBook: (req, res) => {

        RecipeBook.findOneAndUpdate(
            { user: req.params.id },
            req.body,
            { new: true, runValidators: true}
        )
            .then(updatedBook => {
                res.json({ recipeBook: updatedBook })
            })
            .catch((err) => {
                res.json({ message: 'Something went wrong', error: err })
            });
    },

    deleteBook: (req,res) => {

        RecipeBook.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result})
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        });
    }
}