import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Spin, Alert } from 'antd';
import { inject, observer } from 'mobx-react'
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer} = Layout;
import router from 'next/router';
import '../styles/styles.less'

@observer
export default class MyLayout extends React.Component{
   componentDidMount () {
      //console.log(this.props.store)
      //this.props.app.increaseRequest();
  }
  componentWillUnmount () {
    //this.props.app.decreaseRequest();
  }
    render(){
    let display_name = 'block';
    if (!this.props.app.isLoading){
      display_name = 'none';
    }
    //console.log("Render function in layout bbase");
    //console.log("ISLOADINGL" + this.props.app.isLoading);
    //console.log("In LayoutBase Render function");
        return(
  <div>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />

    </Head>


    <Layout>
      <style jsx>{`
        #components-layout-demo-top-side-2 .logo {
          width: 120px;
          height: 31px;
          background: #333;
          border-radius: 6px;
          margin: 16px 28px 16px 0;
          float: left;
        }
      `}</style>

      <Header className="header">
        <div className="logo" />
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
            onClick={this.handleClick}
            >

          <Menu.Item key="/xmodule/list">{this.props.app.headTitle}</Menu.Item>
          
        </Menu>
      </Header> `

     <Layout style={{  display: 'flex', justifyContent: 'center'}}>
        
          <Content style={{ width:400 }}>
            {this.props.children}
          </Content>  
          
      </Layout>
      <Footer className="footer" style={{display: 'flex',flexDirection: 'row'}}>
            <Alert message="XUser ©2019 Created by JOE" style={{flexGrow:'5'}}> </Alert>
              <span style={{ background: '#fff', flexGrow:'1',display: display_name }}> 
              
                <Spin size="small" tip="Loading..."  >
                </Spin>
              </span>
            
      </Footer>    
    </Layout>
  </div>
)}
}
