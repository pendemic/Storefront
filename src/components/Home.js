import React, { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
var ReactDOM = require('react-dom');

class Home extends Component{
    render() {
        return(
            <Carousel>
                <div>
                    <img src="./img/c1.jpg" />
                </div>
                <div>
                    <img src="./img/c2.jpg" />
                </div>
            </Carousel>

        );
    }

}
export default Home;
