import express from 'express';


const InitRouter = app =>{
    const router = express.Router();
    router.get('/test',function(req,res,next){
        app.render(req, res, "/test", {})
    })
    return router
}


export default InitRouter;





