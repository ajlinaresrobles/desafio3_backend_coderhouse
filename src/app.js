const express = require("express");

const ProductManager = require ("./ProductManager");

const app = express();

app.use(express.urlencoded({extended:true}));

const port = 8080;

app.listen(port, ()=>console.log(`server listening on port ${port}`));

const manager = new ProductManager("products.json");

app.get("/products", async(req, res)=>{
   
    const limit = parseInt(req.query.limit);
    const products = await manager.getProducts();
    if (!limit) {
       return res.send(products);
    }
    
    const limitedProducts = products.slice(0,limit);
    res.send(limitedProducts);
});

app.get("/products/:id", async(req,res)=>{
    const id = parseInt(req.params.id);
    const products = await manager.getProducts();
    const getProductById = products.find((element)=> element.id === id);
    res.send(getProductById);
});

