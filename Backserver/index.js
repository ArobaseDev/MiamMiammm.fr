/**
 * Serveur Express pour la mise en place d'un backend Node.js
 */
const express = require('express'); // Import de Express
const app = express(); // Application Express
const port = 4000; // Port de démarrage de l'application


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

app.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`)
})
