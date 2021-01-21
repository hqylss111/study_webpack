import React, { Component } from 'react'
import styles from './test.less';
import { Breadcrumb, Skeleton } from 'antd';
import { MyIcon } from '../../pages/utils/index.js';

export default class test extends Component {
    constructor(props) {
        super()
        this.state = {
            testList: [
                {
                    title: '咨询沟通',
                    icon: 'icon-zx',
                    content: `客户与技术人员进行沟通，对样品测试要求达成共识。
                    咨询电话:
                    手机/微信:
                    `
                },
                {
                    title: '准备样品、填写委托单',
                    icon: 'icon-ba',
                    content: '确认样品尺寸、数量，客户准备好样品并填写检测委托单，发给对接的业务人员。'
                },
                {
                    title: '寄送样品',
                    icon: 'icon-js',
                    content: '样品按照申请表地址寄给业务人员，或者提供地址，华慧检测可进行上门取样。'
                },
                {
                    title: '回电确认',
                    icon: 'icon-xx',
                    content: '收到检测样品和委托单后，第一时间与客户联系，核对、确认相关信息，并发送客户正式报价单。'
                },
                {
                    title: '支付费用',
                    icon: 'icon-zj',
                    content: '确认检测服务内容后，客户可以以汇款、现金、支票或银行转帐的方式缴付测试费用。。'
                },
                {
                    title: '样品送检',
                    icon: 'icon-yp',
                    content: '测试样品、委托单和测试费收检核对无误后，开始进行检测服务，并计算检测周期。'
                },
                {
                    title: '检测报告',
                    icon: 'icon-bg',
                    content: '报告完成后，线上发送电子版报告，线下可邮寄或由客户自行取回。'
                },
            ],
            test_new: []
        }
    }
    componentDidMount() {
        this.testNew()
    }
    testNew = () => {
        let test_new = []
        for (let i = 0; i < 5; i++) {
            test_new.push
                (<div className={styles.testList} key={i}>
                    <div className={styles.left}>
                        <div className={styles.img}>
                            <Skeleton.Image />
                        </div>
                        <Skeleton paragraph={{ rows: 0 }} />
                        {
                            i != 4 ? <div className={styles.iconOut}>
                                <MyIcon type='iconrenwu-tuandui' className={styles.icon} />
                            </div>
                                : <></>
                        }

                    </div>
                    <div className={styles.compan_text}>
                        <Skeleton paragraph={{ rows: 1 }} />
                    </div>
                </div>)
        }
        this.setState({
            test_new
        })
        console.log(test_new, '0000');

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
                    <Breadcrumb.Item>检测流程</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.introduc_title}>检测流程</div>
                {
                    this.state.testList ?
                        this.state.testList.map((item, index) => {
                            return <div className={styles.testList} key={index}>
                                <div className={styles.left}>
                                    <div className={styles.img}>
                                        <MyIcon type={item.icon} className={styles.icon} />
                                    </div>
                                    <div className={styles.title_li}>{item.title}</div>
                                    {
                                        index != this.state.testList.length - 1 ?
                                            <div className={styles.iconOut}>
                                                <MyIcon type='icon-jt' className={styles.icon} />
                                            </div>
                                            : <></>
                                    }
                                </div>
                                <div className={styles.compan_text}>
                                    {item.content}
                                </div>
                            </div>
                        })
                        :
                        this.state.test_new
                }
            </div>
        )
    }
}