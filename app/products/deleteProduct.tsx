/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import {SyntheticEvent, useState} from 'react'
import { useRouter } from 'next/navigation';

type Product = {
    id: number,
    title : string,
    price : string
}

export default function deleteProduct(product : Product){

    const [modal,setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    
    const handleChange = () =>{
        setModal(!modal)
    }
    const handleDelete = async (productId : number) => {
        setIsLoading(true)
        await fetch(`http://localhost:5000/products/${productId}`,{
            method : 'DELETE',
        })
        router.refresh();
        setModal(false)
        setIsLoading(false)
    }
    return (
        <div className="">

            <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete {product.title} ?</h3>
                        <div className="modal-action">
                            <button className="btn" type="button" onClick={handleChange}>Cancel</button>
                            {!isLoading?(
                                <button className="btn btn-primary" type="button" onClick={()=> handleDelete(product.id)}>Delete</button>
                            ):(
                                <button className="btn btn-primary" type="button">Deleting...</button>
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
}