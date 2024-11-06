const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");




const handleImageUpload = async(req,res)=> {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data" + req.file.mimetype + ";based64," + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success : true,
            result,
        });
    } catch(error){
        console.log(error);
        res.json({
            success: false,
            message: "error occured",
        });
      } 
};


// add a new products
const addProduct =  async(req,res)=> {
    try{
        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body;

        const newlyCreatedProduct = new Product({image, title, description, category, brand, price, salePrice, totalStock});

        await newlyCreatedProduct.save();
        res.status(201).json({
            success : true,
            data : newlyCreatedProduct,
        });

    }catch(e){
        console.log(e)
        res.json({
            success : false,
            message : 'Error occured!!!',
        });
    }
};


// fetch all products

const fetchAllProduct =  async(req,res)=>{
    try{
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success : true,
            data : listOfProducts,
        });

    }catch(e){
        console.log(e)
        res.json({
            success : false,
            message : 'Error occured!!!',
        });
    }
};


// edit a product

const editProduct =  async(req,res)=>{
    try{
        const {id} = req.params;
        const {image, title, description, category, brand, price, salePrice, totalStock} = req.body;

        const findProduct = await Product.findById(id);
        if(!findProduct)
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });

            findProduct.title = title || findProduct.title;
            findProduct.description = title || findProduct.description;
            findProduct.category = title || findProduct.category;
            findProduct.brand = title || findProduct.brand;
            findProduct.price = title || findProduct.price;
            findProduct.salePrice = title || findProduct.salePrice;
            findProduct.totalStock = title || findProduct.totalStock;
            findProduct.image = title || findProduct.image;

            await findProduct.save();
            res.status(200).json({
                success: true,
                data: findProduct,
            });
    } catch(e){
        console.log(e)
        res.json({
            success : false,
            message : 'Error occured!!!',
        });
    }
};


// delete a product

const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);
  
      if (!product)
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
  
      res.status(200).json({
        success: true,
        message: "Product delete successfully",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Error occured",
      });
    }
  };


module.exports = {handleImageUpload, addProduct, fetchAllProduct, editProduct, deleteProduct};