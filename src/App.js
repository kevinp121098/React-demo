import React from 'react'
import {FaShoppingBag} from 'react-icons/fa'
import Cart from './Components/Cart'
import Filter from './Components/Filter'
import Product from './Components/Product'
import data from './Data.json'

class App extends React.Component{
  constructor() {
    super()
  
    this.state = {
       product: data.products,
       size: [],
       sort: "",
       cartItems: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : []
    }
  }
createOrder = (order) =>{
  console.log('crateorder props')
  alert("Your order from "+ order.name)
}
removeFromCart = product => {
  const cartItems = this.state.cartItems.slice()
  this.setState({
    cartItems: cartItems.filter((x)=>x._id !== product._id)
  })
  localStorage.setItem('cartItem',JSON.stringify(cartItems.filter((x)=>x._id !== product._id)))
}
addToCart = (product) => {
  const cartItems = this.state.cartItems.slice()
  let alreadyInCart = false
  cartItems.forEach((item) => {
    if( item._id === product._id){
      item.count++
      alreadyInCart = true
    }
  })
  if(!alreadyInCart){
    cartItems.push({...product, count: 1})
  }
  this.setState({cartItems})
  localStorage.setItem("cartItem",JSON.stringify(cartItems))
}

sortProducts = (event) => {
    const sort = event.target.value
    this.setState((state)=> ({
      sort: sort,
      product: this.state.product.slice().sort((a,b)=>(
        sort === "lowest"?
        ((a.price > b.price) ? 1 : -1):
        sort === "highest"?
        ((a.price < b.price) ? 1 : -1):
        ((a._id < b._id) ? 1 : -1)
      ))
    }))
  }
  filterProducts = (event) =>
  {
    if(event.target.value === ""){
      this.setState({size: event.target.value, product:data.products})
    }
    else{
      this.setState({
        size: event.target.value,
        product: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value)>=0
          )
      })
    }
  }
  
  render(){
    return (
      <div className='grid-container'>
        <header>
          <FaShoppingBag/>
          <a href='/'>E-Cart Shop</a>
        </header>
        <main>
          <div className='content'>
            <div className='main'>
              <Filter 
              count={this.state.product.length}
              size={this.state.size}
              sort={this.state.sort}
              filterProducts={this.filterProducts}
              sortProducts={this.sortProducts}
              />
              <Product products={this.state.product} addToCart={this.addToCart}/>
            </div>
            <div className='sidebar'>
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder}/>
            </div>
          </div>
        </main>
        <footer>
          All rights are reserved.
        </footer>
  
      </div>
    );
  } 
}

export default App;
