import React from 'react';
import { inject, observer } from 'mobx-react';
import { Form, Card, Input, Button, Select } from 'antd';
import router from 'next/router';
import XSelect from '../common/components/select';
const { TextArea } = Input;


@inject('accountStore')
@observer
export default class AddPage extends React.Component {
    formRef = React.createRef();

    Store = () => {
        return this.props.accountStore;
    }
    constructor(props) {
        super(props);
        this.state = {};
    }

    onFinish = values => {
        var that = this;
        let projectId = this.props.query.projectId;
        values.projectId = projectId;
        console.log(values);
        this.Store().login(values, () => { console.log('finished add row'); });
    }

    onUploadError=(info)=>{
        console.log('error happened during upload file!' + info.file.name);
    }
    onUploadEnd=(fieldName, info)=>{
        console.log('error happened during upload file!' + JSON.stringify(info));
        console.log(info.file.response.path);
        let webImageFilePath = info.file.response.path;
        this.formRef.current.setFieldsValue({fieldName:webImageFilePath});
    }
    render() {
        var that = this;

        return (
    
            <Card id="xxx">
                <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish.bind(that)}>
   
                          < Form.Item name="name" label="用户名：">
                           <Input />
                          </Form.Item>

                          < Form.Item name="password" label="密码">
                           <Input />
                          </Form.Item>

                    <Card type="inner">
                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large">登录</Button>
                           
                        </Form.Item>
                    </Card>
                </Form>
            </Card>
        );
    }
}
AddPage.getInitialProps = async function (context) {
    return { query: context.query };
}

