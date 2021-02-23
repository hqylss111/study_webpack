import React, { Component } from 'react'
import { Menu, Breadcrumb, Pagination, Skeleton } from 'antd';
import styles from './detail.less';
import { MyIcon } from '../../pages/utils/index.js';
import Detail from './detail';
import { __GET } from '../utils/fetchUtils.js';
import moment from 'moment'

const { SubMenu } = Menu;
export default class index extends Component {
    constructor(props) {
        super()
        this.state = {
            newsType: [
                '行业新闻', '公司资讯'
            ],
            count: 0,
            newsList: [],
            nowPage: 1,
            currentIndex: 0,
            pageSize: 14,
            nowIndex: 0,
            myid: props.location.query.id ? props.location.query.id : 0,
            myI: props.location.query.myI ? props.location.query.myI : 0,
            news: {},
            news_content: {},
            id: props.match.params.id ? props.match.params.id : 0
        }
    }
    componentDidMount() {
        this.getData(this.state.nowPage)
        this.getData2()
    }
    getData = (page) => {

        let url = this.state.myI == 1 ?
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
    getData2 = () => {
        let url = this.state.myI == 1 ?
            `/api/news/enterprise/select/${this.state.id}`
            : `/api/news/industry/select/${this.state.id}`;
        __GET(url)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    ...this.state,
                    news: myJson,
                    news_content: this.state.myI == 1 ? myJson.enterpriseNews : myJson.industryNews,
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
                            defaultSelectedKeys={this.state.myI==1?'2':'1'}
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
                                    this.state.myI == 1 ? <span>公司资讯</span> : <span>行业新闻</span>
                                }
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        {
                            this.state.news_content ?
                                <div>
                                    <div className={styles.news_title}>{this.state?.news_content?.title}</div>
                                    <div className={styles.news_des}>
                                        文章来源：
                                        <span>{this.state?.news_content?.source}</span>
                                            更新时间：
                                        <span>{moment(this.state?.news_content?.updateTime).format('YYYY-MM-DD ')}</span>
                                    </div>
                                    <div
                                        className={styles.news_content}
                                        dangerouslySetInnerHTML={{ __html: this.state?.news_content?.content }}
                                    >
                                    </div>
                                    <div className={styles.contentNext}>
                                        {this.state.news?.preNews && <a href={`/news/${this.state.news?.preNews?.id}?myI=${this.state.myI}`}>
                                            上一篇：
                                        {this.state.news?.preNews?.title}
                                        </a>}
                                        <br />
                                        {this.state.news?.nextNews && <a href={`/news/${this.state.news?.nextNews?.id}?myI=${this.state.myI}`}>
                                            下一篇：
                                        {this.state.news?.nextNews?.title}
                                        </a>}
                                    </div>
                                </div>
                                :
                                <div >
                                    <Skeleton paragraph={{ rows: 5 }} />
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
