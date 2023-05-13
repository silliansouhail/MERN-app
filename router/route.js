const router = require('express').Router()
const productController = require('../controllers/productContoller')
const userController = require('../controllers/userController')
const isAuth = require('../middlewares/authMiddleware')


//public path
router.post('/register',userController.register)
router.post('/login',userController.login)
router.post('/logout',userController.logout)
router.post('/userProduct',userController.updateUser_product)
router.get('/getProducts',productController.getProducts)

//private path
//authorization needed
router.get('/me',isAuth,userController.me) 

//admin routes

//products
router.post('/addProduct',productController.addProduct)
router.post('/updateProduct',productController.updateProduct)
router.post('/deleteProduct',productController.deleteProduct)

//users
router.post('/admin',userController.updateStatus)
router.get('/getUsers',userController.getUsers)



module.exports = router