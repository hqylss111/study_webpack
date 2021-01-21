import React, { Component } from 'react'
import { Breadcrumb } from 'antd';
import styles from './detail.less';
import { __GET } from '../utils/fetchUtils.js';
import moment from 'moment'

export default class detail extends Component {
    constructor(props) {
        console.log(props, 'props');
        super();
        this.state = {
            id: props.id,
            myI: props.myI,
            news: {},
            news_content: {}
        }

    }
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        let url = this.state.myI == 0 ?
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
                    news_content: this.state.myI == 0 ? myJson.enterpriseNews : myJson.industryNews,
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
                {console.log(this.state.news?.enterpriseNews, '0000')}
                <div className={styles.news_title}>{this.state?.news_content.title}</div>
                <div className={styles.news_des}>
                    文章来源：
                <span>{this.state?.news_content.source}</span>
                更新时间：
                <span>{moment(this.state?.news_content.updateTime).format('YYYY-MM-DD ')}</span>
                </div>
                <div
                    className={styles.news_content}
                    dangerouslySetInnerHTML={{ __html: this.state?.news_content.content }}
                >
                </div>
                <div className={styles.contentNext}>
                    {this.state.news?.preNews && <a href={`/news?id=${this.state.news?.preNews?.id}&myI=${this.state.myI}`}>
                        上一篇：
                    {this.state.news?.preNews?.title}
                    </a>}
                    <br />
                    {this.state.news?.nextNews && <a href={`/news?id=${this.state.news?.nextNews?.id}&myI=${this.state.myI}`}>
                        下一篇：
                    {this.state.news?.nextNews?.title}
                    </a>}
                </div>
            </div>
        )
    }
}
