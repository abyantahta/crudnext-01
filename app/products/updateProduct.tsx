/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import {SyntheticEvent, useState} from 'react'
import { useRouter } from 'next/navigation';
type Product = {
    id: number,
    title : string,
    price : string
}

export default function updateProduct(product: Product){

    const [title,setTitle] = useState(product.title);
    const [price,setPrice] = useState(product.price);
    const [modal,setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const handleChange = () =>{
        console.log('hai masuk')
        setModal(!modal)
    }
    const handleUpdate = async (e : SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault();
        await fetch(`http://localhost:5000/products/${product.id}`,{
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price : price
            })
        })
        setIsLoading(false) 
        router.refresh();
        setModal(false)
    }
    return (
        <div className="">

            <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Product</h3>
                    <form action="" onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label htmlFor="" className="label font-bold">Title</label>
                            <input type="text" required className="input w-full input-bordered" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="" className="label font-bold">Price</label>
                            <input type="text" required className="input w-full input-bordered" value={price} placeholder="Price" onChange={(e)=>setPrice(e.target.value)} />
                        </div>
                        <div className="modal-action">
                            <button className="btn" type="button" onClick={handleChange}>Close</button>
                            {!isLoading?(
                                <button className="btn btn-primary" type="submit">Update</button>
                            ):(
                                <button className="btn btn-primary" type="button">Updating...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}