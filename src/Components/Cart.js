import React, { Component } from 'react'
import {Fade} from 'react-reveal'


export default class Cart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: "",
            email: "",
            address: "",
             isCheckOut: false
        }
    }
    handleInput = (e) => {
        this.setState(
        {[e.target.name]: e.target.value}
        )
    }
    createOrder = (e) => {
        e.preventDefault()
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems
        }
        this.props.createOrder(order)
    }
    render() {
        const { cartItems } = this.props
        return (
            <div>
                <div>
                {cartItems.length === 0 ?
                (<div className='cart cart-header'>Your cart is empty.</div>):
                (<div className='cart cart-header'>You have {cartItems.length} items in cart.</div>)
                }
                </div>
                <div className='cart'>
                    <Fade left cascade={true}>
                    <ul className='cart-item'>
                        {cartItems.map(item => (
                            <li key={item._id}>
                                <div>
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className='rightside'>
                                        {item.price} ✖	 {item.count} {" "}
                                    <button  
                                        className='button' 
                                        onClick={() =>this.props.removeFromCart(item)}>
                                    Remove</button>
                                    </div>
                                    
                                </div>
                            </li>
                        ))}
                    </ul>
                    </Fade>
                </div>
                <div className='cart'>
                    <div className='total'>
                        <div>
                            Total : {" "}
                            {
                                cartItems.reduce((a,b) => a + b.price*b.count,0)
                            }
                        </div>
                        <button onClick={()=>{this.setState({isCheckOut: true})}} className='primary-button'>Proceed</button>
                    </div>
                </div>
                <div>
                    {this.state.isCheckOut && (
                        <div>
                            <Fade right>
                        <div className='cart'>
                            <form onSubmit={this.createOrder}>
                                <ul className='form-container'>
                                    <li>
                                        <label>Email:</label>
                                        <input type='email' name='email' required onChange={this.handleInput}>
                                        </input>
                                    </li>
                                    <li>
                                        <label>Name:</label>
                                        <input type='text' name='name' required onChange={this.handleInput}>
                                        </input>
                                    </li>
                                    <li>
                                        <label>Address:</label>
                                        <input type='text' name='address' required onChange={this.handleInput}>
                                        </input>
                                    </li>
                                    <li>
                                        <button className='primary-button'>Checkout</button>
                                    </li>
                                </ul>
                            </form>
                            </div>
                            </Fade>
                            </div>
                    )}
                </div>
               
           
           </div>)
    }
}
