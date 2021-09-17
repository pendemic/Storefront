import React, { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import {FaLeaf, FaTelegramPlane, FaBox, FaInfo} from "react-icons/fa"
import '../Style.css';
import { Link } from "react-router-dom";
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
                  <div className="columns is-mobile my-6">
                  <div className="column is-one-quarter has-text-centered">
          <FaLeaf size={30} color={"green"}></FaLeaf>
          <p>We are open 5 days a week M-F.</p>
          </div>
          <div className="column is-one-quarter has-text-centered">
          <FaBox size={30} color={"green"}></FaBox>
          <p>We pack your plants with extensive care.</p>
          </div>
          <div className="column is-one-quarter has-text-centered">
          <FaTelegramPlane size={30} color={"green"}></FaTelegramPlane>
          <p>We ship fast. Overnight available.</p>
          </div>
          <div className="column is-one-quarter has-text-centered">
          <FaInfo size={30} color={"green"}></FaInfo>
          <p>Sent with all the care instructions you'll need.</p>
          </div>
                  </div>
                  <figure className="product">
                      <img src="./img/Home-Product.JPG"></img>
                      <Link to="/products">
                      <button className=" product-btn">Shop Plants</button>
                      </Link>
                  </figure>
            </div>

        );
    }

}
export default Home;
