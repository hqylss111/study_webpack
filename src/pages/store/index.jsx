import React, { Component } from 'react'
import { Menu, Breadcrumb, Pagination, Skeleton } from 'antd';
import styles from './index.less';
import moment from 'moment'
import Detail from './detail.jsx'
import { MyIcon } from '../../pages/utils/index.js';
import { __GET } from '../utils/fetchUtils.js';
import { Helmet } from 'umi';

export default class index extends Component {
    constructor(props) {
        super()
        this.state = {
            titleList: [
            ],
            storelist: [],
            myid: (props.location.query.id ? props.location.query.id : null),
            type: (props.location.query.type ? props.location.query.type : 'library_gbnational_standard'),
            nowPage: 1,
            currentIndex: 0,
            pageSize: 20,
            myTitle: '国家标准（GB）'
        }

    }
    componentDidMount() {
        let url = `/api/standard/library/type/list`;
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    ...this.state,
                    titleList: myJson,
                })
                // console.log(myJson);

            })
            .catch(error => {
                console.log('error', error);
            });
        this.getInfo(this.state.nowPage, this.state.type)
    }
    getInfo = (page, type) => {
        // console.log(page, type, '000');

        let urlList = `/api/standard/library/type/${type ? type : 'library_gbnational_standard'}/list?limit=${this.state.pageSize}&page=${page}`;
        // let urlList = `/api/standard/library/type/${type ? type : 'library_gbnational_standard'}/list?page=${page}&limit=${this.state.pageSize}`;
        fetch(urlList)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    ...this.state,
                    store: myJson,
                    storelist: myJson.data,
                    type: type
                })
                // console.log('this.state.store', this.state.store);
            })
            .catch(error => {
                console.log('error', error);
            });
    }
    changeStore = (title, type) => {
        this.getInfo(1, type)
        this.setState({
            currentIndex: index,
            myTitle: title,
            myid: null
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
                <Helmet encodeSpecialCharacters={false}>
                    <title>标准库、防火检测、耐火检测、华慧检测、燃烧性能检测</title>
                </Helmet>
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
                                this.state?.titleList?.length > 0 &&
                                this.state?.titleList.map((item, index) => {
                                    return <Menu.Item
                                        key={index + 1}
                                        index={index}
                                        onClick={() => this.changeStore(item.title, item.type)}
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
                                                this.state?.storelist?.length > 0 ?
                                                    this.state?.storelist.map((item, index) => {
                                                        return <tr className={styles.contentTr} key={index} onClick={() => this.getId(item.id)}
                                                            style={(index % 2 != 0) ? { backgroundColor: "#F2F2F2" } : { backgroundColor: "#fff" }} >
                                                            <td >
                                                                <a ><span className={styles.leftTb}>{item.title}</span> </a>
                                                            </td>
                                                            <td className={styles.dateTr}>
                                                                <a >{item.createTime}</a>
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
                                            total={this.state?.store?.count}
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
