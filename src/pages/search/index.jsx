import React, { Component } from 'react'
import styles from './index.less';
import { MyIcon } from '../../pages/utils/index.js';

export default class index extends Component {
    constructor(props) {
        super()
        this.state = {
            content: ''
        }
    }
    render() {
        return (
            <div>
                <div className={styles.header}>
                    <div className={styles.header_text}>
                        报告查询
                        <div className={styles.introduc_line}></div>
                    </div>
                </div>
                <div className={styles.bodyOut}>
                    {
                        this.state.content == '' &&
                        <div className={styles.body}>
                            <div className={styles.title}>上海华慧检测技术有限公司</div>
                            <div className={styles.title}>检测报告</div>
                            <div className={styles.describe}>
                                <span>报告编号：FH20202334</span>
                                <span>查询时间：2020-01-01</span>
                            </div>
                            <div className={styles.line}></div>
                            <table className={styles.table}>
                            <tbody>
                                <tr>
                                    <td>样品名称</td>
                                    <td>纸面石膏板</td>
                                </tr>
                                <tr>
                                    <td>委托单位</td>
                                    <td>上海沁丰商业管理发展有限公司</td>
                                </tr>
                                <tr>
                                    <td>检测结果</td>
                                    <td>本样品所检项目符合GB 8624-2012规定的平板状建筑材料及制品不燃A（A2-s1，d0）级的燃烧性能要求。</td>
                                </tr>
                                <tr>
                                    <td>检测机构</td>
                                    <td>上海华慧检测技术有限公司</td>
                                </tr>
                                <tr>
                                    <td>签发日期</td>
                                    <td>2020年12月25日</td>
                                </tr>
                                <div className={styles.zhang}><img src="" alt="" /></div>
                                </tbody>
                            </table>
                        </div>
                    }

                    {
                        !this.state.content == '' && <div className={`${styles.body} ${styles.my_margin}`}>
                            <div className={styles.noFind}>未查询到相关报告</div>
                            {/* <MyIcon type='iconbianzu_3beifen' className={styles.icon} /> */}
                            <img
                                src="http://huahui-website.oss-cn-shanghai.aliyuncs.com/huahui/service/download@1x-rc-upload-1610942006205-3.png"
                                alt=""
                                className={styles.myImg}
                            />
                            <div className={styles.noFind_text}>请您确认相关信息后重新查询</div>
                            <div className={styles.noFind_text}>
                                或致电
                           <span>021-69913579</span>
                            获取帮助
                        </div>
                        </div>
                    }

                </div>
            </div>
        )
    }
}
