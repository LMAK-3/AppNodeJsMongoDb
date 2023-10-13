const mongoose = require('mongoose')

const productoSchema = mongoose.Schema(
	{
		nombre:{
			type: String,
			required: [true, "Por favor ingrese el nombre del producto"]
		},
		cantidad:{
			type: Number,
			required: true,
			default: 0
			
		},
		precio:{
			type: Number,
			required: true,
		},
		imagen:{
			type: String,
			required: false,
		}
	},
	{
		timestamps: true
	
	}
)


const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;