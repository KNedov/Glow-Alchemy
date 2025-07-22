import {Router} from 'express'
import productService from '../Services/productService.js'


const homeController = Router()

homeController.get('/',async (req,res)=>{

const products= await productService.getLatest()
    // Last 3 products


    res.render('home',{products: products})
})

homeController.get('/search',async (req, res) => {
    const filter= req.query
    const products= await productService.getAll(filter)
    res.render('search',{products:products})
})
export default homeController