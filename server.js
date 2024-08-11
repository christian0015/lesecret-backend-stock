const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());
// const cors = require('cors');
app.use(cors({
  origin: '*', // ou l'URL correcte du frontend
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

const mongoose = require('mongoose');
const config = require('./config/config'); // Assure-toi que le chemin est correct

const User = require('./models/User');
const Product = require('./models/Product');
const Sale = require('./models/Sale');
const Supply = require('./models/Supply');

// Connexion à MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/sales', require('./routes/saleRoutes'));

// Erreur 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


const seedData = async () => {
  try {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Sale.deleteMany({});
    await Supply.deleteMany({});

    const admin = new User({
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'adminpassword',
      role: 'admin',
    });

    const user1 = new User({
      username: 'gerant',
      email: 'gerant@gmail.com',
      password: 'gerantpassword',
      role: 'gerant',
    });

    const user2 = new User({
      username: 'serveur',
      email: 'serveur@gmail.com',
      password: 'serveurpassword',
      role: 'serveur',
    });

    await admin.save();
    await user1.save();
    await user2.save();

    const drink1 = new Product({
      name: 'Coca',
      category: 'Boissons Locales',
      price: 1500.00,
      costPrice: 1200.00, // Modifier le champ pour correspondre au modèle
    });

    const drink2 = new Product({
      name: 'Fanta',
      category: 'Boissons Locales',
      price: 1500.00,
      costPrice: 1200.00, // Modifier le champ pour correspondre au modèle
    });

    const drink3 = new Product({
      name: 'Maltina',
      category: 'Boissons Locales',
      price: 2000.00,
      costPrice: 1200.00, // Modifier le champ pour correspondre au modèle
    });

    const drink4 = new Product({
      name: 'Ice Brut',
      category: 'Champagnes',
      price: 290000.00,
      costPrice: 250000.00, // Modifier le champ pour correspondre au modèle
    });

    const drink5 = new Product({
      name: 'Jacques Daniel',
      category: 'Liquers',
      price: 222000.00,
      costPrice: 180000.00, // Modifier le champ pour correspondre au modèle
    });

    await drink1.save();
    await drink2.save();
    await drink3.save();
    console.log('Bière Locale créée');
    await drink4.save();
    console.log('Champagne Brut créé');
    await drink5.save();
    console.log('Liqueur créée');

    // Créer des approvisionnements par défaut
    const supply1 = new Supply({
      product: drink1._id,
      quantity: 100,
    });
    const supply2 = new Supply({
      product: drink2._id,
      quantity: 100,
    });
    const supply3 = new Supply({
      product: drink3._id,
      quantity: 100,
    });
    const supply4 = new Supply({
      product: drink4._id,
      quantity: 50,
    });
    const supply5 = new Supply({
      product: drink5._id,
      quantity: 30,
    });
    
    // Sauvegarder les approvisionnements
    await supply1.save();
    await supply2.save();
    await supply3.save();
    await supply4.save();
    await supply5.save();
    console.log('Approvisionnements enregistrés');
    // Mettre à jour la quantité des produits
    drink1.quantity += 100;
    await drink1.save();
    drink2.quantity += 100;
    await drink2.save();
    drink3.quantity += 100;
    await drink3.save();
    drink4.quantity += 50;
    await drink4.save();
    drink5.quantity += 30;
    await drink5.save();
  console.log('Quantités mises à jour');

    // Créer des ventes par défaut
    const sale1 = new Sale({
      product: drink1._id,
      quantity: 2,
      totalPrice: drink1.price * 2,
      server: user2._id,
      table: 'Table 1',
    });
    const sale2 = new Sale({
      product: drink2._id,
      quantity: 1,
      totalPrice: drink2.price * 1,
      server: user2._id,
      table: 'Table 2',
    });
    // Sauvegarder les ventes
    await sale1.save();
    console.log('Vente 1 enregistrée');
    await sale2.save();
    console.log('Vente 2 enregistrée');

    console.log('Données insérées avec succès !');
  } catch (error) {
    console.error('Erreur lors de l’insertion des données :', error);
  } finally {
    // mongoose.connection.close();
  }
};

// Exécuter le script
// seedData();


// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// const express = require('express');
// const app = express();
// const cors = require('cors');
// app.use(cors());

// const mongoose = require('mongoose');
// const config = require('./config/config'); // Assure-toi que le chemin est correct

// // Connexion à MongoDB
// mongoose.connect(config.mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // useCreateIndex: true,
//   // useFindAndModify: false
// });
// console.log('MongoDB Connected...');


// // Middleware
// app.use(express.json());

// // Routes
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/categories', require('./routes/categoryRoutes'));
// app.use('/api/products', require('./routes/productRoutes'));
// app.use('/api/sales', require('./routes/saleRoutes'));

// // Erreur 404
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Resource not found' });
// });

// // Gestion des erreurs
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// const express = require('express');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
// const productRoutes = require('./routes/productRoutes');
// const saleRoutes = require('./routes/saleRoutes');
// const config = require('./config/config');

// const app = express();

// // Connect Database
// connectDB();

// // Init Middleware
// app.use(express.json());

// // Define Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/sales', saleRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
