import React, { Component } from 'react'
import styles from './honor.less';
import { Breadcrumb, Skeleton } from 'antd';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { __GET } from '../utils/fetchUtils.js';

export default class honor extends Component {
    constructor(props) {
        super()
        this.state = {
            id: props.id,
            imgArray: [
            ],
            data: []
        }
    }
    componentDidMount() {
        this.getList(this.state.id)
    }
    componentWillUpdate(prevProps, prevState) {
        if (prevProps.id != this.state.id) {
            this.getList(prevProps.id)
            this.setState({
                id:prevProps.id
            })
        }
        console.log(prevState,prevProps,this.state.id);
    }
    getList = (id) => {
        let url = `/api/testing/organization/select/${id}/honor`;
        __GET(url)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                this.setState({
                    ...this.state,
                    data: myJson,
                    imgArray: myJson.img1 ? myJson.img1.split(',') : [''],
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
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "0px",
            slidesToShow: 5,
            speed: 400,
            autoplay: true,
        };
       
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
                    <Breadcrumb.Item>资质荣誉</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.introduc_title}>资质荣誉</div>
                {
                    this.state.data.content ?
                        <div className={styles.text} style={{whiteSpace:'pre-line' }}>
                            {this.state.data.content}
                        </div>
                        :
                        <Skeleton />
                }
                <Slider {...settings} className={styles.imgList} >
                    {
                        this.state.imgArray.map(function (item, index) {
                            return <div
                                className={styles.img}
                                key={index}
                            >
                                <img src={item} />
                            </div>;
                        }.bind(this))
                    }
                </Slider >
            </div>
        )
    }
}
