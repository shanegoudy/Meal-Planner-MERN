import './App.css';
import { useState } from 'react';
import RegForm from './components/RegForm';
import LoginForm from './components/LoginForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import NewRecipe from './views/NewRecipe';
import Recipe from './views/Recipe';
import MyPlan from './views/MyPlan';
import EditRecipe from './views/EditRecipe';
import RecipeBook from './views/RecipeBook';

function App() {
  const [user, setUser] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LoginForm changeUser={setUser}/>} path="/" default/>
          <Route element={<Dashboard user={user}/>} path="/dashboard"/>
          <Route element={<RegForm changeUser={setUser}/>} path="/register"/>
          <Route element={<NewRecipe user={user}/>} path="/recipes/new"/>
          <Route element={<EditRecipe user={user}/>} path="/recipes/edit/:id"/>
          <Route element={<Recipe user={user}/>} path="/recipes/:id"/>
          <Route element={<MyPlan user={user}/>} path="/myplan"/>
          <Route element={<RecipeBook user={user}/>} path="/recipebook"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
