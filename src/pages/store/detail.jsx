import React, { Component } from 'react'
import { useLocation } from "umi";
// import { useLocation } from 'react-router-dom';

import styles from './id.less';
import { Breadcrumb, message } from 'antd';
import { MyIcon } from '../utils/index';
import copy from 'copy-to-clipboard';
import { Helmet } from 'umi';
import { __GET } from '../utils/fetchUtils.js';


export default class id extends Component {
    constructor(props) {
        // console.log(props,'props');
        super();
        this.state = {
            id: props.id,
            type: props.type,
            url: props.url,
            data: [],
            store: {
                title: '建筑工业标准（JG）'
            },
        }
        console.log(this.state.id, this.state.type, this.state.url, '222');

    }
    componentDidMount() {
        let url = `/api/standard/library/type/list`;
        __GET(url)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    ...this.state,
                    data: myJson,
                })
                // console.log('this.state.data', this.state.data);
            })
            .catch(error => {
                console.log('error', error);
            });
        let urlCon = `/api/standard/library/type/${this.state?.type}/${this.state?.id}`;
        console.log(urlCon);

        __GET(urlCon)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    ...this.state,
                    store: myJson,
                })
                this.props.getChildValue(this.state?.store?.title)
            })
            .catch(error => {
                console.log('error', error);
            });
    }
    copySuccess = () => {
        let share = `${window.location.host}${this.state.url}?type=${this.state.type}&&id=${this.state.id}`
        copy(share)
        message.success('页面链接已复制');
        console.log(share);
    }
    download = () => {
        this.state?.store?.downloadUrl&&
        window.open(this.state?.store?.downloadUrl)
    }
    render() {
        return (
            <div>
                <Helmet encodeSpecialCharacters={false}>
                    <title></title>
                </Helmet>
                <div className={styles.contentCenter}>
                    <div className={styles.storeflex}>
                        <div className={styles.storeAll}>
                            <h1>{this.state.store?.title}</h1>
                            <div className={styles.share}>
                                {/* <span onClick={this.copySuccess}>
                                    <MyIcon type='iconlujing' className={styles.icon} />分享
                                </span> */}
                                {
                                    this.state?.store?.downloadUrl ?
                                        <span style={{ marginLeft: "48px" }} onClick={this.download}>
                                            <MyIcon type='icon-xiazai' className={styles.icon} />
                                            <span className={styles.uploadColor}>下载</span>
                                        </span>
                                        :
                                        <span></span>
                                }
                            </div>
                            <table className={styles.content}>
                                <tbody>
                                    <tr>
                                        <td>标准代号：</td>
                                        <td>{this.state.store?.code}</td>
                                    </tr>
                                    <tr>
                                        <td>标准分类：</td>
                                        <td>{this.state.store?.classify}</td>
                                    </tr>
                                    <tr>
                                        <td>文件类型：</td>
                                        <td>{this.state.store?.fileType}</td>
                                    </tr>
                                    <tr>
                                        <td>文件大小：</td>
                                        <td>{this.state.store?.fileSize}</td>
                                    </tr>
                                    <tr>
                                        <td>推荐网址：</td>
                                        <td>www.bzko.com</td>
                                    </tr>
                                    <tr>
                                        <td>授权情况：</td>
                                        <td>免费下载</td>
                                    </tr>
                                    <tr></tr>
                                    <tr>
                                        <td colSpan="2">简介</td>
                                    </tr>
                                    <tr >
                                        <td colSpan="2">{this.state.store?.synopsis}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className={styles.upload}>
                                <p>
                                    下载说明：<br />
                                    ☉推荐使用 WinRAR v3.10 以上版本解压本站资料。<br />
                                    ☉如果这个资料不能下载的请点击错误报告，谢谢合作。<br />
                                    ☉为了达到最快的下载速,请不要同时下载几个资源，下载本站资源，如果暂不能下载请过一段时间重试。<br />
                                    ☉本站提供的标准资料仅供学习研究之用，如用于商业用途，请购买正版。<br />
                                </p>
                            </div>
                            {/* <div className={styles.aboutTitle}>相关检测</div>
                            <table className={styles.list}>
                                <tbody>
                                    {
                                        this.state.list.map((item, index) => {
                                            return <tr className={styles.contentTr} key={index} style={(index % 2 == 0) ? { backgroundColor: "#F2F2F2" } : { backgroundColor: "#fff" }}>
                                                <td >
                                                    <a href="/store/1" ><span className={styles.leftTb}>{item.name}</span></a>
                                                </td>
                                                <td className={styles.dateTr}>
                                                    <a href="/store/1" >{item.date}</a>
                                                </td>
                                            </tr>
                                        })

                                    }
                                </tbody>
                            </table> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
