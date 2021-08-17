import React from "react";
// import "./index.module.scss";
import { Layout } from 'antd';
import style from "./index.module.scss"
const { Header, Footer, Content } = Layout;
import Sider from "/layouts/Sider/index"

const Head = (props) => {
  const {children,pathname} = props;
  return (
    <>
      <style global jsx>{`
      `}</style>
      <>
        <Layout>
          <Header>
            <div className={style.header_container}>
              <div className={style.title}>
                运营后台
              </div>
              <div className={style.user_con}>
                <div className={style.user_name}>fzhange</div>
                <img className={style.user_avatar} src="https://img0.baidu.com/it/u=3039536949,1280163652&fm=26&fmt=auto&gp=0.jpg"/>
              </div>
            </div>
          </Header>
        </Layout>
      </>
    </>
  );
}


export default Head;