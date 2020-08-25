import React from 'react';
import { Form, Input, Button, Select,Card } from 'antd';
import router from 'next/router';
import { inject, observer } from 'mobx-react'
import formHelper from '../common/components/form/formhelper.js'
import Page from '../common/pages/page.js'
import PageWrapper from '../common/pages/page-wrapper'
import AuthStore from './models/AuthStore';

const { TextArea } = Input;
const FormItem = Form.Item;
var form = formHelper.form_decorator;

@inject('mobxStore') @form('mobxStore') @observer
class LoginForm extends Page {
    constructor(props) {
        super(props);
        //console.log(this.props.store)
    }
    handleSubmit(e) {
        e.preventDefault();
        var that = this;
        this.props.mobxStore.login(()=>{
            //this.props.pageRouter.goto("/auth/welcome",{});
        });
    }
    handleTest(e) {
        e.preventDefault();
        var that = this;
        this.props.mobxStore.testCookie(()=>{
            //this.props.pageRouter.goto("/auth/welcome",{});
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
                                initialValue: that.props.mobxStore.username,
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
                        <FormItem className="form-item-clear" >
                            <Button type="primary" htmlType="submit" size="large">登录</Button>
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

LoginForm.getInitialProps = async function (context) {
    //console.log('testtest')
    context.mobxGlobalStore.appStore.setHeadTitle("登录")
    return { query: context.query};

}

export default PageWrapper(LoginForm,AuthStore);


