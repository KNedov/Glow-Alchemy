import { Types } from "mongoose"
import {Schema,model} from 'mongoose'


const productSchema= new Schema({
    name:{
    type: String,
        required: true,
           minLength: [2,'Product should be at least 2 characters'],
    },
    skin:{
    type: String,
        required: true,
           minLength: [10,'Skin should be at least 10 characters'],
           minLength: [100,'Skin should be at max 100 characters'],
    },
    description:{
    type: String,
        required: true,
         minLength: [2,'Description should be at least 2 characters'],
           minLength: [200,'Description should be at max 200 characters'],
    },
    ingredients:{
    type: String,
        required: true,
         minLength: [2,'Ingredients should be at least 2 characters'],
           minLength: [50,'Ingredients should be at max 50 characters'],
    },
    benefits:{
    type: String,
        required: true,
         minLength: [10,'Benefits should be at least 10 characters'],
           minLength: [100,'Benefits should be at max 100 characters'],
    },
    price:{
    type: String,
        required: true,
        min:[0,'Price should be positive number!'],
    },
    image:{
    type: String,
        required: true,
        validate: [/^Https?:\/\//,'Invalid image Url']
    },
    owner:{
        type: Types.ObjectId,
        ref: "User"
    },
    recommends:[{
        type: Types.ObjectId,
        ref: 'User',
    }]
    
})
const Product =  model ('Product',productSchema)

export default Product