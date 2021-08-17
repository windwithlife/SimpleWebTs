//? this file provide some soa api to others

import express from "express";
import axios from "axios";
import { responseI } from "../interface";


const router = express.Router();


router.get("/test", function (req, res, next) {
  res.json({ name: "fzhange", sex: "man" });
});

router.post("*",async function(req,res,next){
  res.json({
    test:11
  });
})


export default router;
