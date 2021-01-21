import React, { Component } from 'react'
import { Menu, Breadcrumb, Pagination, Skeleton } from 'antd';
import styles from './index.less';
import moment from 'moment'
import Detail from './detail.jsx'
import { MyIcon } from '../../pages/utils/index.js';
import { __GET } from '../utils/fetchUtils.js';

export default class index extends Component {
    constructor(props) {
        super()
        this.state = {
            titleList: [
                { title: '国家标准（GB）' },
                { title: '建筑材料标准（JC）' },
                { title: '建筑工业标准（JG）' },
                { title: '环境保护标准（HJ）' },
                { title: '船舶标准（CB）' },
                { title: '汽车标准（QC）' },
                { title: '民用航空标准（MH）' },
                { title: '铁路运输标准（TB）' },
                { title: '交通标准（JT）' },
                { title: '纺织标准（FZ）' },
            ],
            storelist: [
                {
                    id: 1,
                    title: 'GB 50016-2014(2018年版) 建筑设计防火规范',
                    createTime: '2020-09-27'
                },
                {
                    id: 2,
                    title: 'GB 50016-2014(2018年版) 建筑设计防火规范',
                    createTime: '2020-09-27'
                },
                {
                    id: 3,
                    title: 'GB 50016-2014(2018年版) 建筑设计防火规范',
                    createTime: '2020-09-27'
                },
                {
                    id: 4,
                    title: 'GB 50016-2014(2018年版) 建筑设计防火规范',
                    createTime: '2020-09-27'
                },
            ],
            myid: (props.location.query.id ? props.location.query.id : null),
            type: (props.location.query.type ? props.location.query.type : 'environmental_protection'),
            nowPage: 1,
            currentIndex: 0,
            pageSize: 20,
            myTitle: '国家标准（GB）'
        }
    }
    getInfo = (page, type) => {
        // let urlList = `/api/standard/library/type/${type ? type : 'environmental_protection'}/list?page=${page}&limit=${this.state.pageSize}`;
        // fetch(urlList)
        //     .then(response => {
        //         return response.json();
        //     })
        //     .then(myJson => {
        //         this.setState({
        //             ...this.state,
        //             store: myJson,
        //             storelist: myJson.data,
        //             type: type
        //         })
        //         // console.log('this.state.store', this.state.storelist);
        //     })
        //     .catch(error => {
        //         console.log('error', error);
        //     });
    }
    changeStore = (type) => {
        this.getInfo(1, type)
        this.setState({
            currentIndex: index,
            myTitle: type,
            myid:null
        })
    }
    onChange = (page, pageSize) => {
        this.getInfo(page, this.state.type)
        this.setState({
            nowPage: page
        })
    }
    getId = (id) => {
        let obj =
        {
            ...this.state,
            myid: id
        }
        this.setState(obj);
    }
    pushRouter = (url) => {
        window.location.href = url
    }
    render() {
        return (
            <div>
                <div className={styles.header}>
                    <div className={styles.header_text}>
                        标准库
                        <div className={styles.introduc_line}></div>
                    </div>
                </div>
                <div className={styles.content_flex}>
                    <div className={styles.content_list}>
                        <div className={styles.content_top}>标准库</div>
                        <Menu
                            onClick={this.handleClick}
                            style={{ width: 256 }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            {
                                this.state.titleList.map((item, index) => {
                                    return <Menu.Item
                                        key={index + 1}
                                        index={index}
                                        onClick={() => this.changeStore(item.title, index)}
                                    >
                                        {item.title}
                                    </Menu.Item>
                                })
                            }
                        </Menu>
                    </div>

                    <div className={styles.introduc}>
                        <Breadcrumb className={styles.breadcrumb}>
                            <Breadcrumb.Item
                                onClick={e => {
                                    this.pushRouter(`/`)
                                }}
                            >
                                <a>首页</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item onClick={e => {
                                this.state.myid && this.pushRouter(`/store`)
                            }}><a>标准库</a>
                            </Breadcrumb.Item>
                            {this.state.myid && <Breadcrumb.Item>详情</Breadcrumb.Item>}
                        </Breadcrumb>
                        {
                            !this.state.myid &&
                            <div>
                                <div className={styles.introduc_title}>{this.state.myTitle}</div>
                                <div>
                                    <table className={styles.table}>
                                        <tbody>
                                            <tr className={styles.titleTr}>
                                                <td><span className={styles.leftTbTitle}>标准名称</span></td>
                                                <td>时间</td>
                                            </tr>
                                            {
                                                this.state.storelist?.length > 0 ?
                                                    this.state.storelist.map((item, index) => {
                                                        return <tr className={styles.contentTr} key={index} onClick={() => this.getId(item.id)}
                                                            style={(index % 2 != 0) ? { backgroundColor: "#F2F2F2" } : { backgroundColor: "#fff" }} >
                                                            <td >
                                                                <a ><span className={styles.leftTb}>{item.title}</span> </a>
                                                            </td>
                                                            <td className={styles.dateTr}>
                                                                <a >{moment(item.createTime).format('YYYY-MM-DD')}</a>
                                                            </td>
                                                        </tr>
                                                    })
                                                    :
                                                    <tr className={styles.contentTr} >
                                                        <td >
                                                            <span className={styles.leftTb}></span>
                                                        </td>
                                                        <td className={styles.dateTr}>
                                                        </td>
                                                    </tr>
                                            }
                                        </tbody>
                                    </table>
                                    <div className={styles.page}>
                                        <Pagination
                                            size="small"
                                            total={this.state.storelist.length}
                                            current={this.state.nowPage}
                                            showSizeChanger={false}
                                            showQuickJumper
                                            defaultPageSize={this.state.pageSize}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            this.state.myid && <Detail
                                id={this.state.myid}
                                type={this.state.type}
                                currentIndex={this.state.currentIndex}
                                getChildValue={this.childValue}
                            />
                        }
                    </div>
                </div>
            </div>
        )
    }
}
