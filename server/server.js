require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());

require('./config/mongoose.config');

const UserRoutes = require("./routes/user.routes");
UserRoutes(app);
const RecipeRoutes = require("./routes/recipe.routes");
RecipeRoutes(app);
const IngredientRoutes = require("./routes/ingredient.routes");
IngredientRoutes(app);
const MeasurementRoutes = require("./routes/measurement.routes");
MeasurementRoutes(app);
const CategoryRoutes = require("./routes/category.routes");
CategoryRoutes(app);
const PlanRoutes = require("./routes/plan.routes");
PlanRoutes(app);
const RecipeBookRoutes = require("./routes/recipeBook.routes");
RecipeBookRoutes(app);

app.listen(process.env.MY_PORT, () => console.log('Listening on port:' + process.env.MY_PORT));
