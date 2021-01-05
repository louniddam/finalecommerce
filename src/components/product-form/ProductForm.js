import React from 'react'
import Header from '../header/Header'

const ProductForm = () => {

    return(
        <>
        <Header />
        <div className="container-form-product">
            <form method="post">
                <div>
                    <label>Name of product</label>
                    <input type="text" name="prod-name" id="prod-name" onChange={}/>
                </div>
                <div>
                    <label>Image of product</label>
                    <input type="text" name="prod-img" id="prod-img" onChange={}/>
                </div>
                <div>
                    <label>Title of Description</label>
                    <input type="text" name="prod-title" id="prod-title" onChange={}/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea></textarea>
                </div>
                <div>
                    <label>Category</label>
                    <input type="text" name="prod-category" id="prod-category" onChange={}/>
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" name="prod-price" id="prod-price" onChange={}/>
                </div>
                <div>
                    <label>Quantity</label>
                    <input type="number" name="prod-qty" id="ptod-qty" onChange={}/>
                </div>
                <button>Add</button>
            </form>
        </div>
        </>
    )
}