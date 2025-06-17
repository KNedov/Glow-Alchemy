import { Router  } from "express";

const productController =Router()

productController.get('/create',(req, res) => {
    res.render('product/create')
})


export default productController