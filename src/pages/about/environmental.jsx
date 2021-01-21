import React, { Component } from 'react'
import styles from './environmental.less';
import { Breadcrumb, Skeleton } from 'antd';
import { __GET } from '../utils/fetchUtils.js';

export default class Environmental extends Component {
    constructor(props) {
        super()
        this.state = {
            id: props.id,
            data: {}
        }
    }
    componentDidMount() {
        this.getList()
        // if (this.props.location.query.id != nextProps.location.query.id) {
        //     history.go(0)
        // }
        console.log(this.props.id, this.props.keyName, 'nextProps.location.query.id');

    }
    getList = () => {
        let url = `/api/testing/organization/select/${this.state.id}/style`;
        __GET(url)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    ...this.state,
                    data: myJson,
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
                    <Breadcrumb.Item>企业风貌</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.introduc_title}>企业风貌</div>
                <div>
                    <div className={styles.list_title}>{this.state.data.subhead1}</div>
                    <div className={styles.compan_img}>
                        <div className={styles.compan_img01}>
                            {
                                this.state.data.img1 ?
                                    <img src={this.state.data.img1} alt="" draggable="false" />
                                    :
                                    <Skeleton.Image />
                            }
                        </div>
                        <div>
                            <div className={styles.compan_img02}>
                                {
                                    this.state.data.img2 ?
                                        <img src={this.state.data.img2} alt="" draggable="false" />
                                        :
                                        <Skeleton.Image />
                                }
                            </div>
                            <div className={styles.compan_img02}>
                                {
                                    this.state.data.img3 ?
                                        <img src={this.state.data.img3} alt="" draggable="false" />
                                        :
                                        <Skeleton.Image />
                                }
                            </div>
                        </div>
                    </div>
                    {
                        this.state.data.content1 ?
                            <div className={styles.compan_text}>
                                {this.state.data.content1}
                            </div>
                            :
                            <Skeleton />
                    }
                </div>
                <div className={styles.list_div}>
                    <div className={styles.list_title}>{this.state.data.subhead2}</div>
                    {
                        this.state.data.content2 ?
                            <div className={styles.compan_text02}>
                                {this.state.data.content2}
                            </div>
                            :
                            <Skeleton />
                    }
                    <div className={styles.compan_img2}>
                        <div className={styles.compan_img03}>
                            {
                                this.state.data.img4 ?
                                    <img src={this.state.data.img4} alt="" draggable="false" />
                                    :
                                    <Skeleton.Image />
                            }
                        </div>
                        <div className={styles.compan_img03}>
                            {
                                this.state.data.img5 ?
                                    <img src={this.state.data.img5} alt="" draggable="false" />
                                    :
                                    <Skeleton.Image />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
