import React from "react";
import style  from  "./index.module.less"
import { Button } from 'antd';
import api from "/service/index"

function Index() {
  async function doGet(){
    try{
        const res = await api.sample.doGet({ ArticleId:11 })
    }catch(error){
        console.log('error: ', error);
    }
  }
  async function doPost(){
    try{
        const res = await api.sample.doPost({ name:"ff" })
    }catch(error){
        console.log('error: ', error);
    }
  }

  return (
    <>
        <div className={style.test}>index</div>
        <Button type="primary" onClick={doGet}>get</Button>
        <Button type="primary" onClick={doPost}>post</Button>
    </>
  )
}
export default  Index;


