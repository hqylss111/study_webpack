import React, { Component } from 'react'
import styles from './index.less';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { MyIcon } from '../utils/index.js';
import { __GET } from '../utils/fetchUtils.js';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class index extends Component {
  constructor(props) {
    super();
    this.state = {
      areaList: [
        {
          title: '防火阻燃',
          img: 'http://huahui-website.oss-cn-shanghai.aliyuncs.com/huahui/index/pexels-photo-417070@1x-rc-upload-1611108388300-5.png',
          data: [
            {
              name: '室内装修'
            },
            {
              name: '船舶材料'
            },
            {
              name: '轨道交通'
            },
            {
              name: '航空材料'
            },
            {
              name: '软体家具'
            },
            {
              name: '纺织品'
            },
          ]
        },
        {
          title: '耐火构建检测',
          img: 'http://huahui-website.oss-cn-shanghai.aliyuncs.com/huahui/index/pexels-photo-417070备份 2@1x-rc-upload-1611108388300-7.png',
          data: [
            {
              name: '建筑构件在一定时间内阻止火焰和热气穿透或在背火面出现火焰的能力。'
            },
          ]
        },
        {
          title: '环境检测',
          img: 'http://huahui-website.oss-cn-shanghai.aliyuncs.com/huahui/index/pexels-photo-417070备份 3@1x-rc-upload-1611109025271-7.png',
          data: [
            {
              name: '室内空气检测'
            },
            {
              name: '有毒有害物质检测'
            },
          ]
        }
      ],
      company: [],
      honor: [],
      connect: {},
      tel: '',
      phone: '',
      description: '',
    }
  }
  componentDidMount() {
    let url_solve = `/api/testing/organization/select/list`;
    __GET(url_solve)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        myJson.map((item) => {
          let telNew = this.change(item?.description)
          this.setState({
            ...this.state,
            company: myJson,
            description: telNew
          })
        })
      })
      .catch(error => {
        console.log(error);
      });
    let url_honor = `/api/testing/organization/select/1/honor`;
    __GET(url_honor)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          ...this.state,
          honor: myJson.img1 ? myJson.img1.split(',') : [''],
        })
      })
      .catch(error => {
        console.log(error);
      });
    let url_connect = `/api/enterprise/select`;
    __GET(url_connect)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        let telNew = this.change(myJson?.enterpriseTel)
        let phoneNew = this.change(myJson?.enterpriseDomain)
        this.setState({
          ...this.state,
          connect: myJson,
          tel: telNew,
          phone: phoneNew
        })
      })
      .catch(error => {
        console.log(error);
      });

  }
  change = (tel) => {
    const telNew = []
    let j = 0,b = 0
    for (let i = 0; i < tel.length; i++) {
      if (tel[i] == ' ' || tel[i] == '、' || tel[i] == '\n') {
          b = i,
          j++
      }
      else {
        telNew[j++] = tel[i]
      }
    }
    telNew[b] = <br/>
      
    return telNew
  }
  jump = () => {
    window.open('http://p.qiao.baidu.com/cps/chat?siteId=16061399&userId=31551638&siteToken=ae4029112122c93889cd7f8a8775a4fe', 'newwindow', 'height=800, width=800, left=600,top=100, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no')
  }
  phone = () => {
    window.location.href = `tel:18951384587`
  }
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "0px",
      slidesToShow: 5,
      speed: 400,
    };
    return (
      <div>
        <div className={styles.head}>
          <img src="http://huahui-website.oss-cn-shanghai.aliyuncs.com/huahui/index/header-title-01-rc-upload-1610526502308-9.png" alt="" draggable="false" />
        </div>
        <div className={styles.body}>
          <div className={styles.top}>
            <div className={styles.topDiv}>
              <div className={styles.topTitle}>国内专业防火检测实验室</div>
              <div className={styles.topText}>为工程建筑公司、装饰装修公司、材料厂家提供专业阻燃检测服务</div>
              <div className={styles.topButton} onClick={this.jump}><span>欢迎咨询</span></div>
            </div>

          </div>
          <div className={styles.main}>
            <div className={styles.mainTitle}>检测领域</div>
            <div>
              {
                this.state.areaList.map((item, index) => {
                  return index % 2 != 0 ? <div className={styles.area} key={index}>
                    <div className={styles.areaTitle}>{item.title}</div>
                    <div className={styles.areaContent}>
                      <div className={styles.areaLeft}>
                        <ul className={styles.areaUl} style={{ padding: '0px' }}>
                          {
                            item.data.map((it, i) => {
                              return <li key={i} className={styles.areali}>
                                <span>{it.name}</span>
                              </li>
                            })
                          }
                        </ul>
                      </div>
                      <div className={styles.areaRight} >
                        <div className={styles.areaimg} >
                          <img src={item.img} alt="" draggable="false" />
                        </div>
                      </div>
                    </div>
                  </div>
                    :
                    <div className={styles.area} key={index}>
                      <div className={styles.areaTitle}>{item.title}</div>
                      <div className={styles.areaContent}>
                        <div className={styles.areaLeft}>
                          <div className={styles.areaimg}>
                            <img src={item.img} alt="" draggable="false" />
                          </div>
                        </div>
                        <div className={styles.areaRight}>
                          <ul className={index == 0 ? styles.areaUl : styles.areaUl2}>
                            {
                              item.data.map((it, i) => {
                                return <li key={i}>
                                  <span>{it.name}</span>
                                </li>
                              })
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                })
              }
            </div>
          </div>
          <div className={styles.nowConnect} onClick={this.jump}>立即咨询</div>
          <div className={styles.main}>
            <div className={styles.mainTitle}>检测服务</div>
            <div className={styles.service}>
              <div className={styles.littleTitle}>做防火检测 就找华慧</div>
              <div className={styles.serviceContentOut}>
                <div className={styles.serviceContent}>
                  <div className={styles.serviceLeft}>
                    <div className={styles.serviceImg}>
                      <MyIcon type='icon-zs' style={{ fontSize: '36px' }} />
                    </div>
                    <div className={styles.serviceSpan}>
                      专业
                  </div>
                  </div>
                  <div className={styles.serviceRight}>
                    中国计量资质认证、国家高新技术企业<br />
                    中国合格评定国家认可委员会认可(CNAS)<br />
                    交铁体验中心认证授权(JRCC)<br />
                    上海市消防协会常务理事单位<br />
                    上海市建设工程检测行业协会会员单位
                  </div>
                </div>
                <div className={styles.serviceContent}>
                  <div className={styles.serviceLeft}>
                    <div className={styles.serviceImg}>
                      <MyIcon type='icon-rq' style={{ fontSize: '36px' }} />
                    </div>
                    <div className={styles.serviceSpan}>
                      专业
                  </div>
                  </div>
                  <div className={styles.serviceRight}>
                    检测疑问即时解答、检测进度实时推送、报告在线下载（微信）   <br />
                    报告在线查询（扫码或编号查询）<br />
                    报告物流在线跟踪<br />
                  </div>
                </div>
                <div className={styles.serviceContent}>
                  <div className={styles.serviceLeft}>
                    <div className={styles.serviceImg}>
                      <MyIcon type='icon-gx' style={{ fontSize: '36px' }} />
                    </div>
                    <div className={styles.serviceSpan}>
                      专业
                  </div>
                  </div>
                  <div className={styles.serviceRight}>
                    专业工程师一对一服务，全国免费上门取件<br />
                  24小时电话支持     <br />
                  工程/产品技术支持设计/研发/标准等咨询服务<br />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.company}>
              <div className={styles.mainTitle}>检测机构</div>
              <div className={styles.littleTitle}>专业第三方阻燃检测机构</div>
              <div className={styles.companyOut}>
                {
                  this.state.company.map((item, index) => {
                    return <div className={styles.companyContent} key={index}>
                      <div className={styles.companyDiv}>
                        <div className={styles.companyImg}>
                          <img src={item.img} alt="" draggable="false" />
                        </div>
                        <div className={styles.companyTitle}>{item.enterpriseTitle}</div>
                        <div className={styles.companyText}>{this.state.description}</div>
                      </div>
                    </div>
                  })
                }
              </div>
            </div>
            <div className={styles.honor}>
              <div className={styles.mainTitle}>资质荣誉</div>
              <Slider {...settings} className={styles.imgList} >
                {
                  this.state.honor.map(function (item, index) {
                    return <div
                      className={styles.img}
                      key={index}
                    >
                      <img src={item} draggable="false" />
                    </div>
                  })
                }
              </Slider >
              <div className={styles.honorText}>实验室认可证书</div>
            </div>
            <div className={styles.about}>
              <div className={styles.mainTitle}>关于我们</div>
              <div className={styles.aboutImg}>
                <img src='http://huahui-website.oss-cn-shanghai.aliyuncs.com/huahui/about/shang_1-rc-upload-1610610902091-13.png' alt="" draggable="false" />
              </div>
              <div>
                具备专业CMA、CNAS认证资质，是上海市建设工程检测行业协会会员单位、上海市消防协会的常务理事单位、国家高新技术企业，ABS合作供应商；与交铁检验认证中心（JRCC）、上海轨道交通检测技术有限公司（SRCC）签约，共同推动我国轨道交通行业提质增效健康发展。
                </div>
            </div>
            <div className={styles.connect}>
              <div className={styles.mainTitle}>联系我们</div>
              <Row>
                <Col span={24} className={styles.fen}>
                  <div className={styles.contact}>
                    {
                      <img src={this.state?.connect?.wechatQRCode} draggable="false" className={styles.lianxiren} />
                    }
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div className={styles.tel}>
                      <div>
                        <MyIcon type='icon-dhh' className={styles.icon} />
                      </div>
                      <span>{this.state.tel}</span>
                    </div>
                    <div className={styles.tel} style={{ marginTop: '24px' }}>
                      <div>
                        <MyIcon type='icon-ssj' className={styles.icon} style={{ color: 'white' }} />
                      </div>
                      <span>{this.state?.phone}</span>
                    </div>
                  </div>
                </Col>
                <Col span={24} className={styles.conText}>
                  <div>
                    <div>公司名称：{this.state?.connect?.enterpriseName}</div>
                    <div className={styles.email}>
                      <span>公司邮箱：</span>
                      <span>{this.state?.connect?.enterpriseEmail}</span>
                    </div>
                    <div>公司地址：{this.state?.connect?.enterpriseAddress}</div>
                  </div>

                </Col>
                <Col span={24} className={styles.beiAn}>
                  <span>© 2018 Hua Hui Testing Inc. 上海华慧检测技术有限公司|
                    <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">
                      沪ICP备17000168号-1
                    </a>
                  </span>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className={styles.foot}>
          <Row style={{ textAlign: 'center', display: 'flex' }}>
            <Col span={12} >
              <div className={styles.footDiv} onClick={this.jump}>
                <div className={styles.footIconOut}>
                  <MyIcon type='icon-zx1' className={styles.footIcon} />
                </div>

                <span>立即咨询</span>
              </div>
            </Col>
            <Col span={12} >
              <div className={styles.footDiv} onClick={this.phone}>
                <div className={styles.footIconOut}>
                  <MyIcon type='icon-bss' className={styles.footIcon} />
                </div>
                <span>联系我们</span>
              </div>
            </Col>
          </Row>
        </div>
      </div >
    )
  }
}

