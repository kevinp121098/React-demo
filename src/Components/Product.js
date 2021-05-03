import React, { Component } from 'react'
import {Fade, Zoom} from 'react-reveal'
import Modal from 'react-modal'

export default class Product extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             product: null
        }
    }
    openModal = product => {
        this.setState({product})
    }
    closeModal = () =>{
        this.setState({product: null})
    }

    render() {
         const {product} = this.state
        return (
            <div>
                <Fade bottom cascade={true}>
                <ul className='product-container'>
                    {this.props.products.map( product =>
                        <li key={product._id}>
                            <div className='product-list'>
                                <a href='#'>
                                    <img src={product.image} alt={product.title} onClick={()=>this.openModal(product)}></img>
                                    <p>{product.title}</p>
                                </a>
                                <div className='product-price'>
                                    <div>₹{product.price}</div>
                                    <button onClick={() => this.props.addToCart(product)} className='primary-button'>Add to cart</button>
                                </div>
                            </div>
                        </li>
                        )}
                </ul>
                </Fade> 
                {
                    product && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className='close-modal' onClick={this.closeModal}>X</button>
                                <div className='product-details'>
                                    <img src={product.image} alt={product.title} />
                                    <div className='product-details-desc'>
                                        <p>
                                            <strong>{product.title}</strong>
                                        </p>
                                        <p>
                                            {product.description}
                                        </p>
                                        <p>
                                            Available Size : {' '}
                                            {
                                                product.availableSizes.map((x)=>(
                                                    <span>
                                                        {' '}
                                                        <button className='button'>{x}</button>
                                                    </span>
                                                ))                                                                                  
                                            }
                                        </p>
                                        <div className='product-price'>
                                            {product.price}
                                            <button className='primary-button' onClick={()=>{
                                                this.props.addToCart(product)
                                                this.closeModal()
                                            }} >
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            </div>
        )
    }
}
