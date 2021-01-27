import React, { Component } from 'react'
import styles from './index.less';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MyIcon } from '../pages/utils/index.js';
import { Skeleton } from 'antd';
import { __GET } from './utils/fetchUtils.js';
import moment from 'moment'
import { Helmet } from 'umi';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MyIcon type='icon-xialakuang' onClick={onClick} className={className} style={{ ...style, fontSize: '20px' }} />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MyIcon type='icon-xialakuang' onClick={onClick} className={className} style={{ ...style, fontSize: '20px', transform: 'rotateY(180deg)' }} />
  );
}
export default class index extends Component {
  constructor(props) {
    super()
    this.state = {
      serviceList: [],
      company: [],
      mechanism: [],
      news: ['公司新闻', '行业新闻'],
      newsEnterprise: [],
      newsIndustry: [],
      serviceList_new: [],
      mechanism_new: [],
      news_new: [],
      company_new: []
    }
  }
  componentDidMount() {

    this.serveNew()
    this.mechanismNew()
    this.newsNew()
    this.companyNew()
    this.getData()
  }
  getData = () => {
    let url = `/api/service_custom/select/list`;
    __GET(url)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          ...this.state,
          company: myJson,
        });
      })
      .catch(error => {
        console.log(error);
      });
    let url2 = `/api/testing/organization/select/list`;
    __GET(url2)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
          this.setState({
            ...this.state,
            mechanism: myJson,
          });
        console.log(this.state.mechanism[0].description);

      })
      .catch(error => {
        console.log(error);
      });
    let url3 = `/api/service_domain/list`;
    __GET(url3)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          ...this.state,
          serviceList: myJson,
        });

      })
      .catch(error => {
        console.log(error);
      });
    let url4 = `/api/news/enterprise/select/list?limit=8&page=1`;
    __GET(url4)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          ...this.state,
          newsEnterprise: myJson.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
    let url5 = `/api/news/industry/select/list?limit=8&page=1`;
    __GET(url5)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({
          ...this.state,
          newsIndustry: myJson.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  companyNew = () => {
    let company_new = []
    for (let i = 0; i < 3; i++) {
      company_new.push
        (<div className={styles.box} key={i}>
          <div className={styles.box_img}>
            <Skeleton.Image />
          </div>
          <div className={styles.box_text}>
            <Skeleton paragraph={{ rows: 1 }} />
          </div>
        </div>)
    }
    this.setState({
      company_new
    })
  }
  serveNew = () => {
    let serviceList_new = []
    for (let i = 0; i < 8; i++) {
      serviceList_new.push
        (<div className={styles.footer} key={i}>
          <div className={styles.footer_div}>
            <Skeleton.Image />
            <div className={styles.content_01_test}>
              <Skeleton paragraph={{ rows: 0 }} />
            </div>
          </div>
          <div className={styles.content_01_footer}>查看详情 </div>
        </div>)
    }
    this.setState({
      serviceList_new
    })
  }
  mechanismNew = () => {
    let mechanism_new = []
    for (let i = 0; i < 3; i++) {
      mechanism_new.push
        (<div className={styles.subsidiary} key={i}>
          <div className={styles.subsidiary_img}>
            <Skeleton.Image />
          </div>
          <div className={styles.subsidiary_company}>
            <Skeleton paragraph={{ rows: 2 }} />
          </div>
          {/* <div className={styles.subsidiary_more}>查看详情</div> */}
        </div>)
    }
    this.setState({
      mechanism_new
    })
  }
  newsNew = () => {
    let news_new = []
    for (let i = 0; i < 12; i++) {
      news_new.push
        (<li key={i}>
          <Skeleton paragraph={{ rows: 0 }} />
        </li>)
    }
    this.setState({
      news_new
    })
  }
  pushRouter = (url) => {
    window.location.href = url
  }
  render() {
    const settings = {
      className: "center",
      dots: false,
      centerMode: true,
      infinite: true,
      centerPadding: "300px",
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 500,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <div>
        <Helmet encodeSpecialCharacters={false}>
          <title>防火检测报告、耐火极限检测、防火检测机构、华慧检测</title>
        </Helmet>
        <div className={styles.ImgHint}>
          <div className={styles.ImgText}>
            <div className={styles.text}>国内专业防火检测实验室</div>
            <div className={styles.titleText}>
              <span className={styles.itemText}>为工程建筑公司、装饰装修公司、材料厂家提供专业阻燃检测服务</span>
            </div>
            <div onClick={e => {
              this.pushRouter(`/service`)
            }}>
              {/* <a href="/service"> */}
              <button className={styles.immediately} >查看详情    </button>
              {/* </a> */}
            </div>
          </div>
        </div>
        <div className={styles.banner_footer}>
          <span>
            华慧专业的防火检测技术，已成功为客户服务了
		      </span>
          <ul className={styles.calc_nums}>
            <li>0</li>
            <li>1</li>
            <li>0</li>
            <li>2</li>
            <li>7</li>
            <li>8</li>
          </ul>
          <span>
            次防火性能检测
		      </span>
        </div>
        <div className={styles.content}>
          <div className={styles.content_01}>
            <a name='area' className={styles.comments}></a>
            <h1 className={styles.content_title_01}>服务领域</h1>

            {
              this.state.serviceList.length > 0 ?
                <div className={styles.content_01_con}>
                  {
                    this.state.serviceList.map((item, index) => {
                      return <div className={styles.footer} key={index}>
                        <div className={styles.footer_div}>
                          <div className={styles.content_01_img}>
                            <img src={item.img} alt={item.title} draggable="false" />
                          </div>
                          <div className={styles.content_01_test}>{item.title}</div>
                        </div>
                        {/* <a href={`/service?id=${item.id}&i=${index}`}> */}
                        <div className={styles.content_01_footer}
                          onClick={e => {
                            this.pushRouter(`/service?id=${item.id}&i=${index}`)
                          }}
                        >
                          查看详情
                          <MyIcon type='icon-bz' style={{ fontSize: '12px', color: 'white' }} />
                        </div>
                        {/* </a> */}

                      </div>
                    })
                  }
                </div>
                :
                <div className={styles.content_01_con}>
                  {this.state.serviceList_new}
                </div>
            }
          </div>
          <div >
            <h1 className={styles.content_title_02}>做防火检测&nbsp;&nbsp;就找华慧</h1>
            <div className={styles.content_02}>
              <ul className={`${styles.content_02_con}`}>
                <li>
                  <h2 className={styles.content_02_text}>专业</h2>
                  <div>
                    <div>中国计量资质认证</div>
                    <div>中国合格评定国家认可委员会认可(CNAS)</div>
                    <div>交铁体验中心认证授权(JRCC)</div>
                    <div>国家高新技术企业</div>
                    <div>上海市消防协会常务理事单位</div>
                    <div>上海市建设工程检测行业协会会员单位</div>
                  </div>
                </li>
                <li>
                  <h2 className={styles.content_02_text}>高效</h2>
                  <div>
                    <div>24小时电话支持</div>
                    <div> 专业工程师一对一服务</div>
                    <div>全国免费上门取件</div>
                    <div>设计/研发/标准等咨询服务</div>
                    <div>工程/产品技术支持</div>
                    <div></div>
                  </div>
                </li>
                <li>
                  <h2 className={styles.content_02_text}>热情</h2>
                  <div>
                    <div>检测疑问即时解答</div>
                    <div>检测进度实时推送（微信）</div>
                    <div>报告在线下载（微信）</div>
                    <div>报告在线查询（扫码或编号查询）</div>
                    <div>报告物流在线跟踪</div>
                    <div></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <a name='serve' className={styles.comments}></a>
            <h1 className={styles.content_title_02}>您的认可，是我们前进的动力与荣耀 </h1>
            <div className={styles.introduce_content}>
              <div className={styles.control_box}>
                <Slider {...settings}>
                  {
                    this.state.company.length > 0 ?
                      this.state.company.map((item, index) => {
                        return <div className={styles.box} key={index}>
                          <div className={styles.box_img}>
                            <img src={item.img} alt="" draggable="false" />
                          </div>
                          <div className={styles.box_up}>
                            <div className={styles.box_up_div}>
                              <div className={styles.box_up_circle}>
                                <img src={item.logo} alt="" draggable="false" />
                              </div>
                              <div className={styles.box_up_lang}>
                                <span>{item.linkman}</span>
                                <span>{item.enterpriseTitle}</span>
                              </div>
                            </div>
                          </div>
                          <div className={styles.box_text}>
                            {item.description}
                          </div>
                        </div>
                      })
                      :
                      <div>{this.state.company_new}</div>
                  }
                </Slider>
              </div>
            </div>
          </div>
          <div>
            <a name='company' className={styles.comments}></a>
            <h1 className={styles.content_title_02}>专业第三方阻燃检测机构</h1>
            {
              this.state.mechanism.length > 0 ?
                <div className={styles.huahui_subsidiary}>
                  {
                    this.state.mechanism.map((item, index) => {
                      return <div className={styles.subsidiary} key={index}>
                        <div className={styles.subsidiaryDiv}>
                          <div className={styles.subsidiary_img}>
                            <img src={item.img} alt="" draggable="false" />
                          </div>
                          <div className={styles.subsidiary_company}>
                            <div className={styles.subsidiary_title}>{item.enterpriseTitle}</div>
                            <div >
                              <div
                                className={styles.subsidiary_text}
                                style={{whiteSpace:'pre-line' }}
                              >{item.description}</div>
                            </div>
                          </div>
                          {/* <a href={`/about/${item.id}`}> */}
                          <div className={styles.subsidiary_more}
                            onClick={e => {
                              this.pushRouter(`/about/${item.id}`)
                            }}
                          >
                            <span>查看详情 </span>
                          </div>
                          {/* </a> */}

                        </div>
                      </div>
                    })
                  }
                </div>
                :
                <div className={styles.huahui_subsidiary}>
                  {this.state.mechanism_new}
                </div>
            }

          </div>
          <a name='news' className={styles.comments}></a>


          <div className={styles.news}>
            {

              this.state.newsEnterprise.length > 0 ?
                <div className={styles.news_list} >
                  <div className={styles.news_list_title}>
                    <span>公司资讯</span>
                    <a onClick={e => {
                      this.pushRouter(`/news?myI=0`)
                    }}>
                      <span>查看更多</span>
                    </a>
                  </div>
                  <ul className={styles.news_ul}>
                    {
                      this.state.newsEnterprise.map((item, i) => {
                        return <a onClick={e => { this.pushRouter(`/news/${item.id}?myI=${0}`) }} key={i}>
                          <li key={i}>
                            <div
                              className={i == 0 ? styles.news_number_1 : styles.news_number &&
                                i == 1 ? styles.news_number_2 : styles.news_number &&
                                  i == 2 ? styles.news_number_3 : styles.news_number
                              }
                            >
                              {i + 1}
                            </div>
                            <div >{item.title}</div>
                            <div> {moment(item.updateTime).format('YYYY-MM-DD')}</div>
                          </li>
                        </a>
                      })
                    }
                  </ul>
                </div>
                :
                <div className={styles.news_list} >
                  <div className={styles.news_list_title}>
                    <span>公司资讯</span>
                    <span>查看更多</span>
                  </div>
                  <ul className={styles.news_ul_new}>
                    {this.state.news_new}
                  </ul>
                </div>
            }
            {
              this.state.newsIndustry.length ?
                <div className={styles.news_list} key={index}>
                  <div className={styles.news_list_title}>
                    <span>行业新闻</span>
                    <a onClick={e => {
                      this.pushRouter(`/news?myI=1`)
                    }}>
                      <span>查看更多</span>
                    </a>
                  </div>
                  <ul className={styles.news_ul}>
                    {
                      this.state.newsIndustry.map((item, i) => {
                        return <a key={i} onClick={e => { this.pushRouter(`/news/${item.id}?myI=${1}`) }}>
                          <li key={i}>
                            <div
                              className={i == 0 ? styles.news_number_1 : styles.news_number &&
                                i == 1 ? styles.news_number_2 : styles.news_number &&
                                  i == 2 ? styles.news_number_3 : styles.news_number
                              }
                            >
                              {i + 1}
                            </div>
                            <div>{item.title}</div>
                            <div>{moment(item.updateTime).format('YYYY-MM-DD')}</div>
                          </li>
                        </a>
                      })
                    }
                  </ul>
                </div>
                :
                <div className={styles.news_list} >
                  <div className={styles.news_list_title}>
                    <span>行业新闻</span>
                    <span>查看更多</span>
                  </div>
                  <ul className={styles.news_ul_new}>
                    {this.state.news_new}
                  </ul>
                </div>
            }
          </div>
        </div>
      </div>
    )
  }
}
