const express = require('express')

const mongoose = require('mongoose');

const Producto = require("./Modelos/productModel");

const app = express();


app.use(express.json());



app.get('/home', (req, res) =>{
	res.send('HOLA TRABAJAREMOS CON UNA API');
});

app.get('/blog', (req, res) =>{
	res.send('SOLO TOLIMA');
})

//consulta todos los productos
app.get('/productos', async(req, res) =>{
	try{
		const producto= await Producto.find({})
		res.status(200).json(producto);		
	
	}catch (error){
		res.status(500).json({message: error.message})
	}
})

// entrada consulta por producto
app.get('/productos/:id', async(req, res) =>{
	try{
		const {id} = req.params
		const producto= await Producto.findById(id)
		res.status(200).json(producto);		
	
	}catch (error){
		res.status(500).json({message: error.message})
	}
})

app.post('/productos', async(req, res) =>{
	try{
		const producto = await Producto.create(req.body)
		res.status(200).json(producto);
	
	}catch(error){
		console.log(error.message);
		res.status(500).json({message: error.message})
	}


})

//modificar producto por id 
app.put('/productos/:id', async(req, res) => {
	try{
		const {id} = req.params;
		const producto= await Producto.findByIdAndUpdate(id, req.body);
		if(!producto){
			return res.status(404).json({message: "No puedo encontrar ningún producto con este Id ${id}"});
		}
		const updatedProducto = await Producto.findById(id);
		res.status(200).json(updatedProducto);
	}
	catch(error){
		res.status(500).json({message: error.message});
	}

})

// eliminar producto de la base de datos por Id
app.delete('/productos/:id', async(req, res) => {

	try{
		const {id} = req.params;
		const producto = await Producto.findByIdAndDelete(id);
		if(!producto){
			return res.status(404).json({message: "No puedo encontrar ningún producto con este Id ${id}"});
		}
		res.status(200).json(producto);

	}catch(error){
		res.status(500).json({message: error.message});
	}
})
//mongodb+srv://usuario:contraseña@nodejscluster.fp6mnyz.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://00000000003k:Tangamandapio@nodejscluster.fp6mnyz.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
		console.log('conectado a mongodb!');
		 app.listen(3000, () => {
			console.log('conectado al server');
		})
	}).catch((error) =>{
		console.log(error);
});


