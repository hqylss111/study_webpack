import React, { Component } from 'react'
import styles from './index.less';
import { Menu } from 'antd';
import Introduc from './introduc';
import Environmental from './environmental';
import Honor from './honor';
import Test from './test';
import Contact from './contact';
import { __GET } from '../utils/fetchUtils.js';
import { Helmet } from 'umi';

const { SubMenu } = Menu;
export default class index extends Component {
    constructor(props) {
        super()
        this.state = {
            id: props.match.params.id,
            allList: [
                {
                    title: '公司简介',
                },
                {
                    title: '企业风貌',
                },
                {
                    title: '资质荣誉',
                },
                {
                    title: '检测流程',
                },
                {
                    title: '联系我们',
                },
            ],
            company: [
            ],
            keyIndex: 0,
            keyName: 1
        }
    }
    componentWillReceiveProps(nextProps) {
        const { dispatch } = this.props;
        if (this.props.match.params.id != nextProps.match.params.id) {
            history.go(0)
        }        
    }
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        let url = `/api/testing/organization/select/list`;
        __GET(url)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    ...this.state,
                    company: myJson,
                });
                console.log(this.state.list);

            })
            .catch(error => {
                console.log(error);
            });
    }
    changeStore = (name, index, id) => {
        setTimeout(() => {
            this.setState({
                keyIndex: index,
                id
            })
        }, 0)
    }
    render() {
        return (
            <div>
                <Helmet encodeSpecialCharacters={false}>
                    <title>关于我们、建材防火检测、上海防火检测机构、华慧检测</title>
                </Helmet>
                <div className={styles.header}>
                    <div className={styles.header_text}>
                        国内专业的防火检测一站式服务企业
                        <div className={styles.introduc_line}></div>
                    </div>
                </div>
                <div className={styles.content_flex}>
                    <div className={styles.content_list}>
                        <div className={styles.content_top}>关于我们</div>
                        <Menu
                            onClick={this.handleClick}
                            style={{ width: 256 }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['0','1']}
                            mode="inline"
                        >
                            {
                                this.state.company.map((item, index) => {
                                    return <SubMenu key={index} title={item.subtitle}>
                                        {
                                            this.state.allList.map((it, i) => {
                                                return <Menu.Item
                                                    key={
                                                        index == 0 ? i + 1 : i + 1
                                                            && index == 1 ? i + 6 : i + 1
                                                                && index == 2 ? i + 11 : i + 1
                                                    }
                                                    onClick={() => this.changeStore(item.name, i, item.id)}
                                                >
                                                    {it.title}
                                                </Menu.Item>
                                            })
                                        }
                                    </SubMenu>
                                })
                            }
                        </Menu>
                    </div>
                    {
                        this.state.keyIndex == 0 &&
                        <Introduc keyName={this.state.keyName} id={this.state.id} />
                    }
                    {
                        this.state.keyIndex == 1 &&
                        <Environmental keyName={this.state.keyName} id={this.state.id} />
                    }
                    {
                        this.state.keyIndex == 2 &&
                        <Honor keyName={this.state.keyName} id={this.state.id} />
                    }
                    {
                        this.state.keyIndex == 3 &&
                        <Test keyName={this.state.keyNamed} id={this.state.id} />
                    }
                    {
                        this.state.keyIndex == 4 &&
                        <Contact keyName={this.state.keyName} id={this.state.id} />
                    }
                </div>
            </div>
        )
    }
}
