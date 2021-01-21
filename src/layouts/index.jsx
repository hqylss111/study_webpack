import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';
import { ConfigProvider, BackTop, Anchor, Skeleton } from 'antd';
import { NavLink } from 'react-router-dom'
import locale from 'antd/lib/locale/zh_CN';
import Mobile from '../pages/mobile'
import { MyIcon } from '../pages/utils/index.js';
import { __GET } from '../pages/utils/fetchUtils.js';

const { Link } = Anchor;
const initState = {
    titleList: [
        {
            text: "首页",
            key: "/"
        },
        {
            text: "关于华慧",
            key: "/about",
            data: [
            ]
        },
        {
            text: "业务领域",
            key: "/service",
            data: [
                {
                    text: '防火阻燃检测',
                    key: '/service'
                },
                {
                    text: '耐火构件检测',
                    key: '/service'
                },
                {
                    text: '建筑节能检测',
                    key: '/service'
                },
                {
                    text: '室内空气检测',
                    key: '/service'
                },
            ]
        },
        {
            text: "新闻资讯",
            key: "/news"
        },
        {
            text: "标准库",
            key: "/store"
        },
    ],
    footList: [
        {
            title: "首页",
            href: "/",
            data: [
                {
                    href: "/#area",
                    text: "服务领域"
                },
                {
                    href: "/#serve",
                    text: "服务客户"
                },
                {
                    href: "/#company",
                    text: "检测机构"
                },
                {
                    href: "/#news",
                    text: "动态资讯"
                }
            ]
        },
        {
            title: "关于华慧",
            href: "/about/1",
            data: [
                {
                    href: "/about",
                    text: "上海华慧"
                },
                {
                    href: "/about",
                    text: "江苏华慧"
                },
            ]
        },
        {
            title: "业务领域",
            href: "/service",
            data: [
                {
                    href: "/service",
                    text: "防火阻燃检测"
                },
                {
                    href: "/service",
                    text: "耐火构件检测"
                },
                {
                    href: "/service",
                    text: "建筑节能检测"
                },
                {
                    href: "/service",
                    text: "空气环境检测"
                },
            ]
        },
        {
            title: "新闻资讯",
            href: "/news",
            data: [
                {
                    href: `/news?myI=${0}`,
                    text: "公司资讯"
                },
                {
                    href: `/news?myI=${1}`,
                    text: "行业新闻"
                }
            ]
        }
    ]
}
export default function Index(props) {
    const headList = useRef()
    const [isFixed, setState] = useState()
    const [link, setLink] = useState([])
    const [listNew, setList] = useState([])
    const [service, setService] = useState([])
    const [enterprise, setEnterprise] = useState({})
    const [emailNew, setEmailNew] = useState([])
    const isPhone = () => {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        __GET('/api/enterprise/select')
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                setEnterprise(myJson)
            })
            .catch(error => {
                console.log(error);
            });
        __GET(`/api/testing/organization/select/list`)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                setList(myJson)
            })
            .catch(error => {
                console.log(error);
            });
        __GET(`/api/service_domain/list`)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                setService(myJson)
            })
            .catch(error => {
                console.log(error);
            });
        __GET(`/api/blog/roll/list`)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                setLink(myJson)
            })
            .catch(error => {
                console.log(error);
            });

    }, [])

    props.history.listen((route) => {
        if (props.location.pathname != route.pathname) {
            window.scrollTo(0, 0)
        }
    })
    const handleScroll = event => {
        const scrollY = event?.path[1].scrollY
        if (scrollY >= 100) {
            setState(true)
        }
        else if (scrollY < 100) {
            setState(false)
        }
    }
    const handleClick = (e, link) => {
        e.preventDefault();
        console.log(link);
    }
    const pushRouter = (url) => {
        window.location.href = url
    }

    if (isPhone()) {
        return <Mobile></Mobile>
    }
    return (
        <ConfigProvider locale={locale}>
            <div className={styles.header_out} style={(!isFixed) ? { position: 'relative', top: 0, zIndex: 9, } : { position: 'fixed', top: 0, zIndex: 9 }}>
                <div className={styles.header} ref={headList}>
                    <div>
                        <img src={enterprise.enterpriseImg} alt="上海华慧防火检测" draggable="false" />
                    </div>
                    <div className={styles.header_01}></div>
                    <div>
                        <img src='http://huahui-website.oss-cn-shanghai.aliyuncs.com/huahui/company/下载-rc-upload-1610525564589-4.png' alt="" draggable="false" />
                    </div>
                    <div className={styles.header_02}>
                        <span>国内专业的防火检测实验室</span>
                    </div>
                    <div className={styles.header_03}>
                        {
                            enterprise.wechatQRCode ?
                                <img src={enterprise.wechatQRCode} alt="二维码" draggable="false" />
                                :
                                <Skeleton.Image />
                        }
                    </div>
                    <div className={styles.header_04}>
                        <div className={styles.header_04_top}>
                            <MyIcon type='icon-dh' style={{ fontSize: '14px', marginRight: '10px' }} />
                            <div>全国服务热线</div>
                        </div>
                        <div className={styles.header_04_bottom}>
                            {enterprise.enterpriseDomain}
                        </div>
                    </div>
                    <div className={styles.header_05}>
                        <a onClick={e => { pushRouter(`/search`) }}>
                            <MyIcon type='icon-ck' style={{ fontSize: '20px', marginLeft: '10px' }} />
                        </a>

                        <input className={styles.reportInput} type="text" name="reportNumber" placeholder="报告真伪查询" />
                    </div>
                </div>
                <div className={styles.nav} style={(!isFixed) ? { opacity: '1', transition: 'opacity 0.5s' } : { opacity: '0', transition: 'opacity 0.5s' }}>
                    {
                        initState.titleList.map((item, index) => {
                            return !item.data ?
                                <NavLink exact to={item.key} key={index} activeClassName={styles.selected}>
                                    <div className={styles.title_Item}>
                                        <span >{item.text}</span>
                                    </div>
                                </NavLink>
                                :
                                <div className={styles.nav_02} key={index}>
                                    <div className={styles.title_Item2}>{item.text}</div>
                                    <div className={styles.nav_list}>
                                        {
                                            index == 1 &&
                                            listNew.map((items, i) => {
                                                return <NavLink key={i} exact to={`/about/${items.id}`}>
                                                    <div className={styles.titleItem}>
                                                        <span >{items.subtitle}</span>
                                                    </div>
                                                </NavLink>
                                            })
                                        }
                                        {
                                            index == 2 &&
                                            service.map((items, i) => {
                                                return <NavLink key={i} exact to={`/service?id=${items.id}&i=${i}`}>
                                                    <div className={styles.titleItem}>
                                                        <span >{items.title}</span>
                                                    </div>
                                                </NavLink>
                                            })
                                        }
                                    </div>
                                </div>
                        })
                    }
                </div>
            </div>
            <div>
                <div className={styles.center}>
                    <BackTop visibilityHeight={-1}>
                        <div className={styles.shang}>
                            <MyIcon type='icon-xiangshang' style={{ fontSize: '60px' }} />
                        </div>
                    </BackTop>
                    <Anchor affix={false} onClick={handleClick} >
                        <Link
                            href="#bottom"
                            title={
                                <div className={styles.xia} >
                                    <MyIcon type='icon-xiangshang' style={{ fontSize: '60px' }} />
                                </div>
                            }
                        >
                        </Link>
                    </Anchor>

                </div>
                {props.children}
            </div>
            <div className={styles.back}>
                <div className={styles.a1}>
                    <div className={styles.foot_box}>
                        <div className={styles.b1}>
                            {
                                initState.footList.map((item, index) => {
                                    return (
                                        <div key={index} className={styles.item_list}>
                                            {
                                                <ul>
                                                    <div>
                                                        <div className={styles.title}>
                                                            <li>
                                                                <a onClick={e => { pushRouter(item.href) }}>{item.title}</a>
                                                            </li>
                                                        </div>
                                                        <div className={styles.text}>
                                                            {
                                                                index != 1 && index != 2 &&
                                                                item.data.map((it, i) => {
                                                                    return <li onClick={e => { pushRouter(it.href) }} key={i}>
                                                                        <a >
                                                                            {it.text}
                                                                        </a>
                                                                    </li>
                                                                })

                                                            }
                                                            {
                                                                index == 1 &&
                                                                listNew.map((it, i) => {
                                                                    return <li onClick={e => { pushRouter(`/about/${it.id}`) }} key={i}>
                                                                        <a >{it.subtitle}</a>
                                                                    </li>
                                                                })
                                                            }
                                                            {
                                                                index == 2 &&
                                                                service.map((it, i) => {
                                                                    return <li onClick={e => { pushRouter(`/service?id=${it.id}&i=${i}`) }} key={i}>
                                                                        <a >{it.title}</a>
                                                                    </li>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </ul>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div style={{ color: "#fff" }}>
                            <div className={styles.title_right}>联系我们</div>
                            <div >
                                <div className={styles.right_text}>
                                    <MyIcon type='icon-bdh' className={styles.icon} />
                                    <span>电话：{enterprise.enterpriseTel}</span>
                                </div>
                                <div className={styles.right_text}>
                                    <MyIcon type='icon-bsj' className={styles.icon} />
                                    <span>手机：{enterprise.enterpriseDomain}</span>
                                </div>
                                <div className={`${styles.right_text} ${styles.emailOut}`}>
                                    <MyIcon type='icon-email' className={styles.icon} />
                                    <div className={styles.emailOut} >
                                        邮箱：
                                        <span className={styles.email}>{enterprise.enterpriseEmail}</span>
                                    </div>
                                </div>
                                <div className={styles.right_text}>
                                    <MyIcon type='icon-addvise' className={styles.icon} />
                                    <span>地址：{enterprise.enterpriseAddress}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.lianxirenText}>
                                微信扫一扫<br />报告跟踪 报告查询
                            </div>
                            <div className={styles.lianxiren}>
                                {
                                    enterprise.wechatQRCode ?
                                        <img src={enterprise.wechatQRCode} alt="" draggable="false" />
                                        :
                                        <Skeleton.Image />
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <a name='bottom' id='bottom' />
                    {
                        link.length ?
                            <div className={styles.footLink}>
                                <div className={styles.footLinkSpan}>友情链接：</div>
                                <div className={styles.footLinkName}>
                                    {
                                        link.map((item, index) => {
                                            return <a href={item.url} key={index} className={styles.src} target="_blank" rel="nofollow">{item.name}</a>
                                        })
                                    }
                                </div>
                            </div>
                            :
                            <div className={styles.footLink}></div>
                    }
                </div>
                <div className={styles.bottom}>
                    <div className={styles.bottomStyle}>
                        <div className={styles.footBeiAn} >
                            <span >
                                © 2018 Hua Hui Testing Inc.&nbsp;&nbsp;
                            </span>
                            <span className={styles.footBottomFont}>
                                上海华慧检测技术有限公司|
                            <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" >
                                    沪ICP备17000168号-1
                            </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    )
}
