const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(8000, () => console.log("Listening on port: 8000"));
