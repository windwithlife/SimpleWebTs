import React from "react";
import style from "./index.module.scss"
import { Breadcrumb } from 'antd';
import Link from 'next/link'
import { Table, Tag, Space, Input } from 'antd';
const { Search } = Input;
import { Pagination } from 'antd';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { Button } from 'antd';




const onSearch = value => console.log(value);


const columns = [
  {
    title: '一级菜单',
    dataIndex: 'oneLevelMenu',
    // render: (text, row, index) => {
      // console.log('text, row, index: ', text, row, index);
    //   return {
    //     children: <a>{text}</a>,
    //     props: {
    //       colSpan: 5,
    //     },
    // },
  },
  {
    title: '二级菜单',
    dataIndex: 'age',
    render: (text, row, index) => {
      return  <a>222</a>;
    },
  },
  {
    title: '二级菜单URL',
    dataIndex: 'age',
    render: (text, row, index) => {
      return  <a>222</a>;
    },
  },
  {
    title: '权限ID',
    dataIndex: 'age',
    render: (text, row, index) => {
      return  <a>222</a>;
    },
  },
];

const data = [
  {
    oneLevelMenu:"客户运营",
    twoLevelMenu:[
      {
        name:"客户资源",
        url:"https://www.baidu.com/?tn=59044660_hao_pg",
        powerId:1,
      },
      {
        name:"客户资源",
        url:"https://www.baidu.com/?tn=59044660_hao_pg",
        powerId:1,
      },
      {
        name:"客户资源",
        url:"https://www.baidu.com/?tn=59044660_hao_pg",
        powerId:1,
      },
      {
        name:"客户资源",
        url:"https://www.baidu.com/?tn=59044660_hao_pg",
        powerId:1,
      },
    ]
  }
];

const Index = ({ children }) => {
  return (
    <>
      <style global jsx>{`
      `}</style>
      <>
        <Breadcrumb style={{ fontSize: "18px", color: "#222" }}>
          <Breadcrumb.Item>
            <Link href="/module/manage">模块管理</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link href="/module/manage/menu_power_set">菜单与权限设置</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className={style.content_container}>
          <div className="text-3xl mt-8 mb-8">营销自动化</div>
          <div className="text-2xl mb-8">
            服务商名称：Converlab
          </div>
          <div className="text-2xl mb-8">
            <Button type="primary">上传菜单与权限</Button>
          </div>

          <div className="mb-8 text-1.5xl font-bold">菜单预览</div>

          <Table rowKey={(record, index) => index} pagination={false} columns={columns} dataSource={data} bordered />
          <div className={style.pagination_con}>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </>
    </>
  );
}

export default Index;