const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let products = [
  { id: 1, product_name: "iPhone 15 Pro", category: "Phones", price: 1200, stock_quantity: 25, description: "Latest Apple flagship", brand: "Apple" },
  { id: 2, product_name: "Dell XPS 13", category: "Laptops", price: 1500, stock_quantity: 10, description: "High performance ultrabook", brand: "Dell" },
  { id: 3, product_name: "Samsung QLED 55", category: "TVs", price: 800, stock_quantity: 15, description: "4K Smart TV", brand: "Samsung" },
  { id: 4, product_name: "Sony WH-1000XM5", category: "Audio", price: 350, stock_quantity: 40, description: "Noise cancelling headphones", brand: "Sony" },
  { id: 5, product_name: "iPad Air", category: "Tablets", price: 600, stock_quantity: 20, description: "10.9 inch Liquid Retina", brand: "Apple" }
];

app.get('/', (req,res)=> res.send('ICT251 Tech Products API - Mulungushi University - Live! Use /api/products'));

app.get('/api/products', (req,res)=> res.json(products));

app.get('/api/products/:id', (req,res)=>{
  const p = products.find(x=> x.id == req.params.id);
  if(!p) return res.status(404).json({message:"Product not found"});
  res.json(p);
});

app.post('/api/products', (req,res)=>{
  const newProduct = { id: products.length+1, ...req.body, created_at: new Date() };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req,res)=>{
  const idx = products.findIndex(x=> x.id == req.params.id);
  if(idx==-1) return res.status(404).json({message:"Not found"});
  products[idx] = { ...products[idx], ...req.body, updated_at: new Date() };
  res.json(products[idx]);
});

app.delete('/api/products/:id', (req,res)=>{
  products = products.filter(x=> x.id != req.params.id);
  res.json({message:"Deleted successfully"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server running on '+PORT));
