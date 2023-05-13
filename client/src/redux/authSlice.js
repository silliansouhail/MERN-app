import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const user = JSON.parse(localStorage.getItem('user'));
const initialState = {

    user:user?user:null,
    usersList:null,
    loading:false,
    success:false,
    error:null,
    message:'',

}

export const getUsers = createAsyncThunk("auth/getUsers", async(arg,{rejectWithValue})=>{
    try {
        const {data}= await axios.get('http://localhost:8080/api/getUsers')
        const list = data.map(({...data})=>{
            return {
                _id:data._id,
                name: data.name,
                email: data.email
            }
        })

        return list
    } catch (error) {
        rejectWithValue(error.response.data)
    }
})

export const statusUpdate=createAsyncThunk('auth/statusUpdate',
    async(user,{rejectWithValue}) =>{

        try {
            await axios.post('http://localhost:8080/api/admin',user)
            
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const register=createAsyncThunk('auth/register',
    async(user,{rejectWithValue}) =>{

        try {
            // eslint-disable-next-line no-unused-vars
            const response = await axios.post('http://localhost:8080/api/register',user)
            
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const login = createAsyncThunk('auth/login',async(user,{rejectWithValue}) =>{

    try {
        const response = await axios.post('http://localhost:8080/api/login',user)

        if(response.data){
            localStorage.setItem('user',JSON.stringify(response.data))
        }
        return response.data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const logout = createAsyncThunk('auth/logout',async(user,{rejectWithValue}) =>{
    localStorage.removeItem('user')
    try {
        await axios.post('http://localhost:8080/api/logout',user)

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const user__payload = createAsyncThunk('auth/user__payload',async(basket,{rejectWithValue})=>{

    try {
        await axios.post('http://localhost:8080/api/userProduct',basket)

    } catch (error) {
        return rejectWithValue(error.response.data)
    }

})

export const authSlice = createSlice({

    name: 'auth',
    initialState,
    reducers:{

        reset:(state)=>{
            state.loading = false
            state.success = false
            state.error = null
            state.message = ''
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(register.pending,(state)=>{
            state.loading = true;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading = false
            state.success = true
            state.user = action.payload
            state.error = null
            state.message = "User registered successfully"
        })
        .addCase(register.rejected,(state,action)=>{
            state.loading = false
            state.success = false
            state.error = action.payload
            state.message = "User registration failed"
        })
        .addCase(login.pending,(state)=>{
            state.loading = true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading = false
            state.success = true
            state.error = null
            state.user = action.payload
            state.message = `Welcome User ${action.payload.name}`
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading = false
            state.success = false
            state.error = action.payload
            state.message = "Login failed"
        })
        .addCase(logout.pending,(state)=>{
            state.loading = true;
        })
        .addCase(logout.fulfilled,(state)=>{
            state.loading = false
            state.success = true
            state.user = null
            state.error = null
            state.message = 'User logged out'
        })
        .addCase(logout.rejected,(state,action)=>{
            state.loading = false
            state.success = false
            state.error = action.payload
            state.message = "Logout failed"
        })
        .addCase(getUsers.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.loading = false
            state.usersList = action.payload
            state.success = true
            state.error = null
            state.message = "Users List displayed successfully"
        })
        .addCase(getUsers.rejected,(state,action)=>{
            state.loading = false
            state.success = false
            state.error = action.payload
            state.message = "an error has occurred"
        })
        .addCase(statusUpdate.pending,(state)=>{
            state.loading = true;
        })
        .addCase(statusUpdate.fulfilled,(state,action)=>{
            state.loading = false
            state.success = true
            state.error = null
            state.message = "Status Updated successfully"
        })
        .addCase(statusUpdate.rejected,(state,action)=>{
            state.loading = false
            state.success = false
            state.error = action.payload
            state.message = "an error has occurred"
        })
        .addCase(user__payload.pending,(state)=>{
            state.loading = true;
        })
        .addCase(user__payload.fulfilled,(state)=>{
            state.loading = false
            state.success = true
            state.message = "basket has been successfully registered"
        })
        .addCase(user__payload.rejected,(state,action)=>{
            state.loading = false
            state.success = false
            state.error = action.payload
            state.message = "basket registration failed "
        })
    }
})


export const {reset} = authSlice.actions
export default authSlice.reducer