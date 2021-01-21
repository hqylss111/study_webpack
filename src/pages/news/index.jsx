import React, { Component } from 'react'
import { Menu, Breadcrumb, Pagination, Skeleton } from 'antd';
import styles from './index.less';
import { MyIcon } from '../../pages/utils/index.js';
import { __GET } from '../utils/fetchUtils.js';
import moment from 'moment'

const { SubMenu } = Menu;
export default class index extends Component {
    constructor(props) {
        super()
        this.state = {
            newsType: [
                '公司资讯', '行业新闻'
            ],
            count: 0,
            newsList: [],
            nowPage: 1,
            currentIndex: 0,
            pageSize: 14,
            nowIndex: 0,
            myid: props.location.query.id ? props.location.query.id : 0,
            myI: props.location.query.myI ? props.location.query.myI : 0,
        }
        console.log(props, '111111')
    }
    componentDidMount() {
        this.getData(this.state.nowPage)
    }
    getData = (page) => {
        console.log(this.state.myI, 'myI1111111');

        let url = this.state.myI == 0 ?
            `/api/news/enterprise/select/list?limit=${this.state.pageSize}&page=${page}`
            : `/api/news/industry/select/list?limit=${this.state.pageSize}&page=${page}`;
        __GET(url)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    ...this.state,
                    count: myJson.count,
                    newsList: myJson.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    changeStore = (index) => {
        setTimeout(() => {
            this.setState({
                myI: index
            })
        }, 0)
        console.log(index, this.state.myI, 'myI');
        this.getData(1)
    }
    onChange = (page, pageSize) => {
        this.getData(page)
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
                        新闻资讯
                        <div className={styles.introduc_line}></div>
                    </div>
                </div>
                <div className={styles.content_flex}>
                    <div className={styles.content_list}>
                        <div className={styles.content_top}>新闻资讯</div>
                        <Menu
                            onClick={this.handleClick}
                            style={{ width: 256 }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            {
                                this.state.newsType.map((item, index) => {
                                    return <Menu.Item
                                        key={index + 1}
                                        onClick={() => this.changeStore(index)}
                                    >
                                        <div onClick={e => {
                                            this.pushRouter(`/news?myI=${index}`)
                                        }}>
                                            {item}
                                        </div>
                                    </Menu.Item>

                                })
                            }
                        </Menu>
                    </div>
                    {/* {
                        this.state.myid == 0 && */}
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
                                        this.pushRouter(`/news`)
                                    }}
                                >
                                    <a>新闻资讯</a>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item>
                                    {
                                        this.state.myI == 0 ? <span>公司资讯</span> : <span>行业新闻</span>
                                    }
                                </Breadcrumb.Item>
                            </Breadcrumb>
                            <div className={styles.introduc_title}>
                                {
                                    this.state.myI == 0 ? <span>公司资讯</span> : <span>行业新闻</span>
                                }
                            </div>
                            {
                                this.state.newsList ? <ul className={styles.newsList_ul}>
                                    {
                                        this.state.newsList.map((item, index) => {
                                            return <li key={index} onClick={() => this.getId(item.id)} onClick={e => {this.pushRouter(`/news/${item.id}?myI=${this.state.myI}`)}}>
                                                    <div className={styles.newsList_ul_img}>
                                                        <img src={item.img} alt="" draggable="false" />
                                                    </div>
                                                    <div className={styles.newsList_ul_text}>
                                                        <div >
                                                            <span>{item.title}</span>
                                                        </div>
                                                        <div>{moment(item.updateTime).format('YYYY-MM-DD')}</div>
                                                    </div>
                                                    <MyIcon type='iconbianzu_3beifen' className={styles.icon} />
                                            </li>
                                        })
                                    }
                                </ul>
                                    :
                                    <ul className={styles.newsList_ul}>
                                        <li >
                                            <div className={styles.newsList_ul_img}>
                                                <Skeleton.Image />
                                            </div>
                                            <div className={styles.newsList_ul_text}>
                                                <Skeleton paragraph={{ rows: 1 }} />
                                            </div>
                                            <MyIcon type='iconbianzu_3beifen' className={styles.icon} />
                                        </li>
                                        <li  >
                                            <div className={styles.newsList_ul_img}>
                                                <Skeleton.Image />
                                            </div>
                                            <div className={styles.newsList_ul_text}>
                                                <Skeleton paragraph={{ rows: 1 }} />
                                            </div>
                                            <MyIcon type='iconbianzu_3beifen' className={styles.icon} />
                                        </li>
                                    </ul>
                            }
                            <div className={styles.page}>
                                <Pagination
                                    size="small"
                                    total={this.state.count}
                                    current={this.state.nowPage}
                                    showSizeChanger={false}
                                    showQuickJumper
                                    defaultPageSize={this.state.pageSize}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                    {/* } */}
                    {/* {
                        this.state.myid != 0 && <Detail id={this.state.myid} myI={this.state.myI} />
                    } */}
                </div>
            </div>
        )
    }
}
