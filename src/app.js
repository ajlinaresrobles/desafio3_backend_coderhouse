const express = require("express");

const ProductManager = require ("./ProductManager");

const app = express();

app.use(express.urlencoded({extended:true}));

const port = 8080;

app.listen(port, ()=>console.log(`server listening on port ${port}`));

const manager = new ProductManager("src/products.json");

app.get("/products", async(req, res)=>{
   try {
        const limit = parseInt(req.query.limit);
        const products = await manager.getProducts();
        if (!limit) {
            return res.send(products);
        }
    
        const limitedProducts = products.slice(0,limit);
        res.send(limitedProducts);
   } catch (error) {
        console.log(error.message); 
   }
   
});

app.get("/products/:pid", async(req,res)=>{
try {
    const id = parseInt(req.params.pid);
    const products = await manager.getProducts();
    const getProductById = products.find((element)=> element.id === id);
    res.send(getProductById);
} catch (error) {
    console.log(error.message);
}
    
});

