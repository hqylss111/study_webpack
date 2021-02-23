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
            // myIndex: 0,
            // myIndex2: 0,
            myId: 1,
            business: {},
            service: [],
            myTitle: '',
        } 
    }
    componentDidMount() {
        this.getData()
    }
    componentWillReceiveProps(nextProps) {
        const { dispatch } = this.props;
        if (this.props.location.query.i != nextProps.location.query.i) {
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
                    myId: this.props.match.params.id==0 ?
                        myJson[this.props.location.query.i]?.businessDomains[0]?.id :
                        this.props.match.params.id,
                    business: this.props.match.params.id==0 &&
                        myJson[this.props.location.query.i].businessDomains[0] ,
                    myTitle: this.props.match.params.id==0 ?
                        myJson[this.props.location.query.i].title :
                        myJson[0].title
                });
                
                myJson[this.props.location.query.i].businessDomains.map((item)=>{
                    if(this.props.match.params.id==item.id){
                        this.setState({
                            business:item
                        })
                    }
                })
                if (this.state.myId)
                    this.getService()
            })
            .catch(error => {
                console.log(error);
            });
    }
    getService = () => {
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
    pushRouter = (url) => {
        window.location.href = url
    }
    render() {
        return (
            <div>
                {/* <Helmet encodeSpecialCharacters={false}>
                    <title>防火材料检测、防火等级检测、耐火材料检测、华慧检测</title>
                </Helmet> */}
                <div className={styles.header}>
                    <div className={styles.header_text}>
                        防火阻燃检测
                            <div className={styles.introduc_line}></div>
                    </div>
                </div>
                <div className={styles.content_flex}>
                    <div className={styles.content_list}>
                        <div className={styles.content_top}>业务领域</div>
                        {
                            this.state?.serve&&this.state?.serve[this.props.location.query.i]&&
                            <Menu
                                onClick={this.handleClick}
                                style={{ width: 256 }}
                                defaultSelectedKeys={[this.state?.serve[this.props.location.query.i]?.businessDomains[0]?.id.toString()]}
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
                                                            style={{
                                                                color:Number(this.props.match.params.id) === it.id ? '#C2264E': 'null'
                                                            }}
                                                            key={it.id}
                                                            // onClick={() => this.changeStore(it, it.id, i, item.title)}
                                                            onClick={e => {
                                                                this.pushRouter(`/service/${it.id}?i=${index}`)
                                                            }}
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
                        }
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
                                            style={{ whiteSpace: 'pre-line' }}
                                            className={styles.introduc_text}
                                        // dangerouslySetInnerHTML={{ __html: this.state?.business?.content }}
                                        >
                                            {this.state?.business?.content}
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
                                                style={{ whiteSpace: 'pre-line' }}
                                            // dangerouslySetInnerHTML={{ __html: item.standard }}
                                            >
                                                {item.standard}
                                            </span>
                                        </div>
                                        <div className={styles.text_flex}>
                                            <div>
                                                <div className={styles.one}></div>
                                                <div className={styles.two}></div>
                                            </div>
                                            <span>标准介绍：</span>
                                            <span
                                                style={{ whiteSpace: 'pre-line' }}
                                            // dangerouslySetInnerHTML={{ __html: item.introduction }}
                                            >
                                                {item.introduction}
                                            </span>
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
