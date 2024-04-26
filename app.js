const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser=require('body-parser')

const app = express();
const port = 3000;

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testjs'
});

// Middleware pour traiter les données du formulaire
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '')));

// Route pour servir le fichier HTML du formulaire
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '', 'index.html'));
});

// Route pour gérer la soumission du formulaire
app.post('/inscription', (req, res) => {
    console.log(req.headers); 
    const { nom, prenom, age } = req.body;

    // Insertion des données dans la base de données
    connection.query('INSERT INTO utilisateurs (nom, prenom, age) VALUES (?, ?, ?)', [nom, prenom, age], (error, results) => {
        if (error) {
            console.error('Erreur lors de l\'insertion des données :', error);
            res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'inscription' });
        } else {
            console.log('Utilisateur inséré avec succès');
            res.status(200).json({ message: 'Inscription réussie' });
        }
    });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
