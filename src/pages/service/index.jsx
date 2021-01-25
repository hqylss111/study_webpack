import React, { Component } from 'react'
import { Menu, Breadcrumb, Pagination, Skeleton } from 'antd';
import styles from './index.less';
import { __GET } from '../utils/fetchUtils.js';
import { Helmet } from 'umi';

const { SubMenu } = Menu;
export default class index extends Component {
    constructor(props) {
        super()
        this.state = {
            serve: [],
            myIndex: 0,
            myIndex2: 0,
            myId: 1,
            business: {},
            service: [],
            myTitle: ''
        }
    }
    componentDidMount() {
        this.getData()
    }
    componentWillReceiveProps(nextProps) {
        const { dispatch } = this.props;
        if (this.props.location.query.id != nextProps.location.query.id) {
            history.go(0)
        }
    }
    getData = () => {
        let url = `/api/service_domain/list`
        __GET(url)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    ...this.state,
                    serve: myJson,
                    myId: this.props.location.query.id ?
                        myJson[this.props.location.query.i]?.businessDomains[0]?.id :
                        myJson[0].businessDomains[0].id,
                    business: this.props.location.query.id ?
                        myJson[this.props.location.query.i].businessDomains[0] :
                        myJson[0].businessDomains[0],
                    myTitle: this.props.location.query.id ?
                        myJson[this.props.location.query.i].title :
                        myJson[0].title
                });

                if (this.state.myId)
                    this.getService()

                console.log(myJson, '11111111');

            })
            .catch(error => {
                console.log(error);
            });
    }
    getService = () => {
        console.log(this.state.myId, 'myid');
        let url = `/api/service_domain/business/${this.state.myId}`
        __GET(url)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    ...this.state,
                    service: myJson,
                });
                console.log(this.state.service, myJson);
                console.log(this.state.myId, 'myid');
            })
            .catch(error => {
                console.log(error);
            });
    }
    changeStore = (it, id, i, title) => {
        this.setState({
            myId: id,
            business: it,
            myTitle: title
        })
        setTimeout(() => {
            if (this.state.myId)
                this.getService()
        }, 0);
    }
    changeTitle = (title) => {
        this.setState({
            myTitle: title
        })

    }
    render() {
        return (
            <div>
                <Helmet encodeSpecialCharacters={false}>
                    <title>防火材料检测、防火等级检测、耐火材料检测、华慧检测</title>
                </Helmet>
                <div className={styles.header}>
                    <div className={styles.header_text}>
                        防火阻燃检测
                            <div className={styles.introduc_line}></div>
                    </div>
                </div>
                <div className={styles.content_flex}>
                    <div className={styles.content_list}>
                        <div className={styles.content_top}>业务领域</div>
                        {console.log(this.props.location.query.i)}
                        <Menu
                            onClick={this.handleClick}
                            style={{ width: 256 }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={[this.props.location.query.i ? this.props.location.query.i : '0']}
                            mode="inline"
                        >
                            {
                                this.state.serve.length > 0 ?
                                    this.state.serve.map((item, index) => {
                                        return <SubMenu key={index} title={item.title}>
                                            {
                                                item.businessDomains.map((it, i) => {
                                                    return <Menu.Item
                                                        key={this.state.myIndex++}
                                                        onClick={() => this.changeStore(it, it.id, i, item.title)}
                                                    >
                                                        {it.title}
                                                    </Menu.Item>
                                                })
                                            }
                                        </SubMenu>
                                    })
                                    :
                                    <SubMenu title=''>
                                        <Skeleton paragraph={{ rows: 1 }} />
                                    </SubMenu>
                            }
                        </Menu>
                    </div>
                    <div className={styles.introduc}>
                        <Breadcrumb className={styles.breadcrumb}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>业务领域</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.myTitle}</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state?.business?.title}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className={styles.news_title}> {this.state?.business?.title}{this.state.myTitle}</div>
                        <div className={styles.introduc_content_1}>
                            <div className={styles.introduc_content_img}>
                                {
                                    this.state?.business?.img ?
                                        <img src={this.state?.business?.img} alt="" draggable="false" />
                                        : <Skeleton.Image />
                                }

                            </div>
                            <div>
                                {
                                    this.state?.business?.content ?
                                        <div
                                            className={styles.introduc_text}
                                            dangerouslySetInnerHTML={{ __html: this.state?.business?.content }}
                                        >
                                        </div>
                                        : <Skeleton />
                                }

                            </div>
                        </div>
                        {this.state.service != [] ?
                            this.state?.service.map((item, index) => {
                                return <div key={index}>
                                    <div className={styles.line}></div>
                                    <div>
                                        <div className={styles.title_little}>
                                            {item.title}
                                        </div>
                                        <div className={styles.text_flex}>
                                            <div>
                                                <div className={styles.one}></div>
                                                <div className={styles.two}></div>
                                            </div>
                                            <span>标准名称：</span>
                                            <span
                                                dangerouslySetInnerHTML={{ __html: item.standard }}
                                            ></span>
                                        </div>
                                        <div className={styles.text_flex}>
                                            <div>
                                                <div className={styles.one}></div>
                                                <div className={styles.two}></div>
                                            </div>
                                            <span>标准介绍：</span>
                                            <span
                                                dangerouslySetInnerHTML={{ __html: item.introduction }}
                                            ></span>
                                        </div>
                                        <div className={styles.text}>
                                            <div className={styles.text_flex}>
                                                <div>
                                                    <div className={styles.one}></div>
                                                    <div className={styles.two}></div>
                                                </div>
                                                <span>检测标准：</span>
                                            </div>
                                            <div
                                                style={{ marginLeft: '20px' }}
                                                dangerouslySetInnerHTML={{ __html: item.content }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            })
                            :
                            <></>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
