const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.post('/newblog', async (req, res) => {

  const { title, description } = req.body;
  try {
    const { data, error } = await supabase
      .from('blog')
      .insert([
        { title: title, description: description }
      ]);
    if (error) {
      console.log(error);
      return res.status(400).json({ message: 'Blog not created' });
    }
    return res.status(200).json({ message: 'Blog created' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});