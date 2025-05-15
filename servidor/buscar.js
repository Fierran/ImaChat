const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = '';
const CX = 'e7babd2c62c9e465f';

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor activo y corriendo');
});

app.post('/servidor', async (req, res) => {
  const { palabras } = req.body; // El texto ingresado por el usuario

  try {
    const promises = palabras.split(' ').map(async (palabra) => {
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
        params: {
          q: palabra,
          searchType: 'image',
          key: API_KEY,
          cx: CX,
          num: 1, // Solo queremos una imagen por palabra
        },
      });

      const imageUrl = response.data.items[0]?.link || ''; // URL de la primera imagen
      return imageUrl;
    });

    const images = await Promise.all(promises);
    res.json({ images });
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar imágenes', error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
