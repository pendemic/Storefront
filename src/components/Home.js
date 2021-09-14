import React, { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
var ReactDOM = require('react-dom');

class Home extends Component{
    render() {
        return(
            <div>
                <div className="hero is-small cactus-bg ">
            <div className="hero-body container">
              <h4 className="title"></h4>
            </div>
          </div>
                      <Carousel autoPlay="true"
                      interval="5000"
                      infiniteLoop={true}
                      showThumbs={false}>
                      <div>
                          <img src="./img/c1.png" />
                      </div>
                      <div>
                          <img src="./img/c2.png" />
                      </div>
                  </Carousel>
            </div>

        );
    }

}
export default Home;
