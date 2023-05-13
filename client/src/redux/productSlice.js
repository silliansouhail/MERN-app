import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {

    products:null,
    basket:[],
    basketRemove:[],
    loading:false,
    success:false,
    error:null,
    message:'',

}

export const addProduct=createAsyncThunk('product/addProduct',
    async(product,{rejectWithValue}) =>{

        try {
            await axios.post('http://localhost:8080/api/addProduct',product)
            
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteProduct=createAsyncThunk('product/deleteProduct',
    async(product,{rejectWithValue}) =>{

        try {
            await axios.post('http://localhost:8080/api/deleteProduct',product)
            
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getProducts = createAsyncThunk("product/getProducts", async(arg,{rejectWithValue})=>{
    try {
        const {data}= await axios.get('http://localhost:8080/api/getProducts')
        return data
    } catch (error) {
        rejectWithValue(error.response.data)
    }
})



export const productSlice = createSlice({

    name: 'product',
    initialState,
    reducers:{

        reset:(state)=>{
            state.loading = false
            state.success = false
            state.error = null
            state.message = ''
        },

        addToBasket:(state,action)=>{
            const payload=action.payload
            state.basket= [...state.basket,payload]
        },
        removeFromBasket:(state,action)=>{
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.payload.id);
            let newBasket = [...state.basket];
            if (index>=0) {
                newBasket.splice(index, 1);
            }
            else{
                console.warn(`Cant remove product (id: ${action.id})as its not in the basket`)
            }
            state.basketRemove= newBasket
            state.basket= state.basketRemove
        },
        resetBasket : (state,action)=>{
            state.basket=[]
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(addProduct.pending,(state)=>{
            state.loading = true;
        })
        .addCase(addProduct.fulfilled,(state,action)=>{
            state.loading = false
            state.success = true
            state.error = null
            state.message = "Product added successfully"
        })
        .addCase(addProduct.rejected,(state,action)=>{
            state.loading = false
            state.success = false
            state.error = action.payload
            state.message = "Product addition failed"
        })
        .addCase(getProducts.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.loading = false
            state.products = action.payload
            state.success = true
            state.error = null
            state.message = "Product added successfully"
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.loading = false
            state.success = false
            state.error = action.payload
            state.message = "Product addition failed"
        })
        .addCase(deleteProduct.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.loading = false
            state.success = true
            state.error = null
            state.message = "Product deleted successfully"
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.loading = false
            state.success = false
            state.error = action.payload
            state.message = "Product deletion failed"
        })
    }
})


export const {reset,addToBasket,removeFromBasket,resetBasket,} = productSlice.actions
export default productSlice.reducer