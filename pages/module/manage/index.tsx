import React from "react";
import style from "./index.module.scss"
import { Breadcrumb } from 'antd';
import Link from 'next/link'
import { Table, Tag, Space, Input } from 'antd';
const { Search } = Input;
import { Pagination } from 'antd';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';



const onSearch = value => console.log(value);


const columns = [
  {
    title: '模块id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '模块显示名',
    dataIndex: 'moduleName',
    key: 'moduleName',
  },
  {
    title: '服务商名称',
    dataIndex: 'serviceName',
    key: 'serviceName',
  },
  {
    title: '菜单与权限',
    key: 'menuAPower',
    dataIndex: 'menuAPower',
    render: (hasSet, record) => {
      const { id } = record;
      return (
        <>
          {
            hasSet ?
              <div key={`${hasSet}_${id}`} className={style.power_set}>
                <CheckCircleTwoTone style={{ marginRight: "6px" }} twoToneColor="#52c41a" />已设置
              </div>
              :
              (
                <div key={`${hasSet}_${id}`} className={style.power_set}>
                  <CloseCircleTwoTone style={{ marginRight: "6px" }} twoToneColor="#ddd" /> 未设置
                </div>
              )
          }
        </>
      )
    },
  },
  {
    title: '操作权限',
    key: 'operatePower',
    dataIndex: 'operatePower',
    render: hasSet => (
      <>
        {
          hasSet ?
            <div className={style.power_set}>
              <CheckCircleTwoTone style={{ marginRight: "6px" }} twoToneColor="#52c41a" />已设置
            </div>
            :
            (
              <div className={style.power_set}>
                <CloseCircleTwoTone style={{ marginRight: "6px" }} twoToneColor="#ddd" /> 未设置
              </div>
            )
        }
      </>
    ),
  },
  {
    title: '操作',
    key: 'operate',
    dataIndex: 'operate',
    render: (text, record) => {
      const { id } = record;
      return (
        <>
          <Link key={`menu_power_set?id=${id}`} href={`/module/manage/menu_power_set?id=${id}`}>菜单与权限设置</Link>
          &nbsp;&nbsp;
          <Link key={`operate_power_set?id=${id}`} href={`/module/manage/operate_power_set?id=${id}`}>操作权限设置</Link>
        </>
      )
    }
  },
];

const data = [
  {
    key: '1',
    id: 1,
    moduleName: "营销自动化",
    serviceName: "converlab",
    menuAPower: true, //true为已设置 false为未设置
    operatePower: true, //true为已设置 false为未设置
    operate: ''
  },
  {
    id: 2,
    moduleName: "营销自动化",
    serviceName: "converlab",
    menuAPower: false, //true为已设置 false为未设置
    operatePower: false, //true为已设置 false为未设置
    operate: ''
  },
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
        </Breadcrumb>
        <div className={style.search_con}>
          <Search size="middle" placeholder="请输入模块名或服务商名" allowClear onSearch={onSearch} style={{ width: 200 }} />
        </div>
        <div className={style.content_container}>
          <Table rowKey={(record, index) => index} pagination={false} columns={columns} dataSource={data} />
          <div className={style.pagination_con}>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </>
    </>
  );
}

export default Index;