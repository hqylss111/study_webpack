import React, { Component } from 'react'
import styles from './contact.less';
import { Breadcrumb } from 'antd';
import { MyIcon } from '../../pages/utils/index.js';
import { __GET } from '../utils/fetchUtils.js';

export default class contact extends Component {
    constructor(props) {
        super()
        this.state = {
            id: props.id,
            data: []
        }
    }
    componentDidMount() {
        this.getList(this.state.id)
    }
    componentWillUpdate(prevProps, prevState) {
        if (prevProps.id != this.state.id) {
            this.getList(prevProps.id)
            this.setState({
                id:prevProps.id
            })
        }
        console.log(prevState,prevProps,this.state.id);
    }
    getList = (id) => {
        let url = `/api/testing/organization/select/${id}/us`;
        __GET(url)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    ...this.state,
                    data: myJson,
                });
                console.log(myJson);
            })
            .catch(error => {
                console.log(error);
            });
    }
    pushRouter = (url) => {
        window.location.href = url
    }
    render() {
        return (
            <div className={styles.introduc}>
                <Breadcrumb className={styles.breadcrumb}>
                    <Breadcrumb.Item
                        onClick={e => {
                            this.pushRouter(`/`)
                        }}
                    >
                        <a>首页</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item
                    
                        onClick={e => {
                            this.pushRouter(`/about/${this.state.id}`)
                        }}
                    >
                        <a>关于我们</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>联系我们</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.introduc_title}>联系我们</div>
                <div className={styles.contact_text}>
                    <div>
                        <MyIcon type='icon-w' className={styles.icon} />
                        <span>联系人：{this.state.data.linkman}</span>
                    </div>
                    <div>
                        <MyIcon type='icon-hd' className={styles.icon} />
                        <span>电话：{this.state.data.tel}</span>
                    </div>
                    <div>
                        <MyIcon type='icon-hj' className={styles.icon} />
                        <span>手机：{this.state.data.telephone}</span>
                    </div>
                    <div>
                        <MyIcon type='icon-he' className={styles.icon} />
                        <span>邮箱：{this.state.data.email}</span>
                    </div>
                    <div>
                        <MyIcon type='icon-hw' className={styles.icon} />
                        <span>网址：{this.state.data.webSite}</span>
                    </div>
                    <div>
                        <MyIcon type='icon-hdd' className={styles.icon} />
                        <span>地址：{this.state.data.address}</span>
                    </div>
                </div>
                <div className={styles.contact_bg}>
                    <img src='http://huahui-website.oss-cn-shanghai.aliyuncs.com/huahui/about/contact-rc-upload-1610619028927-2.png' alt="" draggable="false" />
                </div>
            </div>
        )
    }
}
