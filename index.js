const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(recipes => {
    recipes.forEach(recipe => {
      console.log(`Added new recipe: ${recipe.title}`);
    });
  })
  .then(() => {
    return Recipe.create({
      title: 'Spaghetti Carbonara',
      level: 'Easy Peasy',
      ingredients: ['Spaghetti', 'Bacon', 'Eggs', 'Parmesan Cheese', 'Black Pepper', 'Salt'],
      cuisine: 'Italian',
      dishType: 'main_course',
      image: 'https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg',
      duration: 30,
      creator: 'Chef John'
    });
  })
  .then(recipe => {
    console.log(`Added new recipe: ${recipe.title}`);
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })
  .then(recipe => {
    console.log(`Successfully updated recipe: ${recipe.title}`);
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Successfully removed recipe: Carrot Cake');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
