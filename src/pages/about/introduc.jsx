import React, { Component } from 'react'
import styles from './introduc.less';
import { Breadcrumb, Skeleton } from 'antd';
import { __GET } from '../utils/fetchUtils.js';

export default class introduc extends Component {
    constructor(props) {
        super()
        this.state = {
            id: props.id,
            introduc: {}
        }
        console.log(props, '111111');
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
        console.log(this.state.id, 'this.state.id');

        let url = `/api/testing/organization/select/${id}/introduce`;
        __GET(url)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    ...this.state,
                    introduc: myJson,
                });
                // console.log(myJson);
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
                    <Breadcrumb.Item>公司简介</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.introduc_title}>公司简介</div>
                <div className={styles.introduc_content}>
                    <div className={styles.introduc_content_1}>
                        <div className={styles.introduc_content_img}>
                            {
                                this.state.introduc.img ?
                                    <img src={this.state.introduc.img} alt="" draggable="false" />
                                    :
                                    <Skeleton.Image />
                            }
                        </div>
                        <div>
                            <div className={styles.introduc_line}></div>
                            {
                                this.state.introduc.content1 ?
                                    <div className={styles.introduc_text}>
                                        {this.state.introduc.content1}
                                    </div>
                                    : <Skeleton />
                            }
                        </div>
                    </div>
                    <div className={styles.introduc_content_2}>
                        <div className={styles.introduc_line}></div>
                        {
                            this.state.introduc.content2 ?
                                <div className={styles.introduc_text}>
                                    {this.state.introduc.content2}
                                </div>
                                : <Skeleton />
                        }
                    </div>
                    <div className={styles.introduc_content_2}>
                        <div className={styles.introduc_line}></div>
                        {
                            this.state.introduc.content3 ?
                                <div className={styles.introduc_text}>
                                    {this.state.introduc.content3}
                                </div>
                                : <Skeleton />
                        }
                    </div>
                </div>
            </div>
        )
    }
}
