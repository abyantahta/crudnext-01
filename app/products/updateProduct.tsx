/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import {SyntheticEvent, useState} from 'react'
import { useRouter } from 'next/navigation';

export default function addProduct(){

    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const [modal,setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const handleChange = () =>{
        console.log('hai masuk')
        setModal(!modal)
    }
    const handleSubmit = async (e : SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault();
        await fetch('http://localhost:5000/products',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price : price
            })
        })
        setIsLoading(false)
        setTitle('')
        setPrice('')
        router.refresh();
        setModal(false)
    }
    return (
        <div className="">

            <button className="btn" onClick={handleChange}>Add New</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Product</h3>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label htmlFor="" className="label font-bold">Title</label>
                            <input type="text" required className="input w-full input-bordered" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="" className="label font-bold">Title</label>
                            <input type="text" required className="input w-full input-bordered" value={price} placeholder="Price" onChange={(e)=>setPrice(e.target.value)} />
                        </div>
                        <div className="modal-action">
                            <button className="btn" type="button" onClick={handleChange}>Close</button>
                            {!isLoading?(
                                <button className="btn btn-primary" type="submit">Submit</button>
                            ):(
                                <button className="btn btn-primary" type="button">Saving...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}