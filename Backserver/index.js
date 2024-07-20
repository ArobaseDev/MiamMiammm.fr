/**
 * Serveur Express pour la mise en place d'un backend Node.js
 */

const express = require('express'); // Import de Express
const app = express(); // Application Express
const port = 4000; // Port de démarrage de l'application
const fs = require ('fs'); //
const path = require('path');
const dbFilePath = path.join(__dirname, ' db.json');
const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8')); //


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');  
  next();
})

// Route "/" accessible avec GET
app.get('/', (req, res) => {
  res.send('OK pour moi ');
});

app.get('/recipes', (req, res) => {
  res.json(recipes);
  })

app.get('/recipes/:id', (req, res) => {
  console.log(req.params)
  const recipe = recipes.find(r => r.id === parseInt(req.params.recipes));
  if (!recipe) return res.status(404).json({ error: 'Aucune recette trouvée ...' });
  res.json(recipe);
})

app.post('/recipes', (req, res) => {
  const newRecipe = { id: Date.now(),...req.body };
  
  db.recipes.push(newRecipe);
  fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2), 'utf8');
  res.status(201).json(newRecipe);
})

app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
