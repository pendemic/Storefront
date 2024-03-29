import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import AddProduct from './components/AddProduct';
import Cart from './components/Cart';
import Home from './components/Home';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import Context from "./Context";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import "./Style.css";
import TagManager from 'react-gtm-module';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: [],
    };
    this.routerRef = React.createRef();

    const tagManagerArgs = {
      gtmId: process.env.REACT_APP_GTM_ID,
      events:{
        Checkout: "Checkout"
      }
    }
    TagManager.initialize(tagManagerArgs)
  }
  render() {
    return (
      <Context.Provider
      value={{
        ...this.state, removeFromCart: this.removeFromCart, addToCart: this.addToCart, login: this.login, addProduct: this.addProduct, clearCart: this.clearCart, checkout: this.checkout
      }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <nav
            className="navbar container"
            role="navigation"
            aria-label="main navigation"
            >
              <div
              className="navbar-brand"
              >
                {/* <Link to='/' className="navbar-item is-size-4 has-text-weight-bold">Cactus Club</Link> */}
                <a href="/">
                  <img className="logo" src="./img/Logo.PNG"></img>
                  </a>
                <label
                role="button"
                class="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ showMenu: !this.state.showMenu});
                }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </label>
              </div>
              <div className={`navbar-menu ${this.state.showMenu ? "is-active" : ""}`}>
                <Link to="/products" className="navbar-item" style={{marginLeft: "auto"}}>Products</Link>
                {this.state.user && this.state.user.accessLevel < 1 && (<Link to="/add-product" className="navbar-item">Add Product
                </Link>
              )}
              <Link to="/cart" className="navbar-item">Cart
              <span className="tag is-warning" style={{ marginLeft: "5px" }}>
                { Object.keys(this.state.cart).length }
              </span>
              </Link>
              {!this.state.user ? (
                <Link to="/login" className="navbar-item">Login</Link>
              ) : (
                <Link to="/" onClick={this.logout} className="navbar-item">Logout</Link>
              )}
              </div>
            </nav>
            <Switch>
            <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={ProductList} />
            </Switch>
          </div>
          <div>
          </div>
          <Footer/>
        </Router>

      </Context.Provider>
    )
  }
  componentDidMount() {
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : null;
    this.setState({ user });
  }
  login = async (email, password) => {
    const res = await axios.post(
      'https://my-json-server.typicode.com/pendemic/storefrontdb/users',
      { email, password },
    ).catch((res) => {
      return { status: 401, message: 'Unauthorized' }
    })
    
  
    if(res.status === 200) {
      const { email } = jwt_decode(res.data.accessToken)
      const user = {
        email,
        token: res.data.accessToken,
        accessLevel: email === 'admin@example.com' ? 0 : 1
      }
  
      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }
  
  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };
  async componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");
    const products = await axios.get('https://my-json-server.typicode.com/pendemic/storefrontdb/products');
    user = user ? JSON.parse(user) : null;
    cart = cart ? JSON.parse(cart) : {};
    this.setState({ user,  products: products.data, cart });
  }
  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };
  addToCart = cartItem => {
    let cart = this.state.cart;
    if (cart[cartItem.id]){
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({cart});
  };
  removeFromCart = cartItemId => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({cart});
  };
  clearCart = () =>{
    let cart ={};
    localStorage.removeItem("cart");
    this.setState({cart});
  };
  checkout = () => {
    // if(!this.state.user){
    //   this.routerRef.current.history.push("/login");
    //   return;

    // }
    var cartTotal = 0;
    var cartItems = 0;
    const cart = this.state.cart;
    const products = this.state.products.map(p => {
      if (cart[p.name]){
        p.stock = p.stock - cart[p.name]. amount;
        cartTotal += p.price;
        cartItems += 1;
        axios.put(
          `https://my-json-server.typicode.com/pendemic/storefrontdb/products/${p.id}`, {...p},
        )
        TagManager.dataLayer({
          dataLayer:{
            event: "Checkout",
            cartTotal: cartTotal,
            cartItems: cartItems
          }
        });
      }
      return p;
    });
    this.setState({products});
    this.clearCart();
  }
}