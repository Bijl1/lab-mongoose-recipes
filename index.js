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
    return Recipe.deleteMany()
  })
  
  .then(() => {
    return Recipe.create({
      title: 'Pizza Margherita',
      level: 'Easy Peasy',
      ingredients: [
        '1/2 pound homemade pizza dough',
        '1/2 cup tomato sauce',
        '1/4 cup fresh basil leaves',
        '8 ounces fresh mozzarella cheese, sliced',
        '1 tablespoon extra-virgin olive oil',
        'Kosher salt and freshly ground black pepper, to taste',
      ],
      cuisine: 'Italian',
      dishType: 'main_course',
      image: 'https://www.acouplecooks.com/wp-content/uploads/2019/02/Pizza-Margherita-002.jpg',
      duration: 30,
      creator: 'Chef John',
    }
    
    );
  })
  .then(recipe => {
    console.log(`The recipe "${recipe.title}" has been added to the database`);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  const recipes = require('./data.json');

  

 Recipe.insertMany(recipes)
  .then((docs) => {
    console.log("Inserted documents:");
    docs.forEach((doc) => {
      console.log(doc.title);
    });
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("Duration of Rigatoni alla Genovese updated successfully!");
    mongoose.connection.close(); // Close the connection to the database
  })
  .catch((err) => {
    console.error(err);
  });
