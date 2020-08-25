import React from 'react';
import { Form, Input, Button, Select,Card } from 'antd';
import router from 'next/router';
import { inject, observer } from 'mobx-react'
import formHelper from '../../common/components/form/formhelper.js'
import Page from '../../common/pages/page.js'
import PageWrapper from '../../common/pages/page-wrapper'
import AuthStore from './models/AuthStore';

const { TextArea } = Input;
const FormItem = Form.Item;
var form = formHelper.form_decorator;

@inject('mobxStore') @form('mobxStore') @observer
class RegisterPage extends Page {
    constructor(props) {
        super(props);
        //console.log(this.props.store)
        console.log(this.props.mobxStore.username);
    }
    handleSubmit(e) {
        e.preventDefault();
        var that = this;
        this.props.mobxStore.register(()=>{
            that.props.pageRouter.goto("/usercenter/auth/login");
        });
    }
    render() {

        var that = this;
        const { getFieldDecorator } = this.props.form;
        return (
            <Card>
                <Form onSubmit={this.handleSubmit.bind(this)}>

                    <Card type="inner">
                        <FormItem label="用户名：" >
                            {getFieldDecorator("username", {
                                initialValue: '',
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                    </Card>

                    <Card type="inner">
                        <FormItem label="密 码：" >
                            {getFieldDecorator("password", {
                                initialValue: '',
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                    </Card>
                    <Card type="inner">
                        <FormItem label="昵称：" >
                            {getFieldDecorator("nickname", {
                                initialValue: '',
                            })(
                                <Input type="text" />
                            )}
                        </FormItem>
                    </Card>
                    <Card type="inner">
                        <FormItem className="form-item-clear" >
                            <Button type="primary" htmlType="submit" size="large">注 册</Button>
                        </FormItem>
                    </Card>
                    <Card type="inner">
                                {that.props.mobxStore.statusMessage}
                    </Card>
                </Form>
            </Card>
        );
    }
}

RegisterPage.getInitialProps = async function (context) {
    console.log('render side!')
    return { query: context.query};
}

export default PageWrapper(RegisterPage,AuthStore)


