'use client'

import Header from '@/components/Header'
import React, {  useState } from 'react'
import {api} from '@/app/lib/api'
import { useRouter } from 'next/navigation'

interface AddProduct {
    id: number
    title : string
    thumbnail : string
    description : string
    price: number
    rating : number
    stock: number
    brand: string
}

const AddProductPage = () => {

    const [product , setProduct] = useState<AddProduct>({
        id:0,
        title: '',
        thumbnail: '',
        description: '',
        price:0,
        rating:0,
        stock: 0,
        brand: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    
    const router = useRouter()

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()

        //getting api products
        const res = await api.get('')
        const apiProducts = res.data.products

        //getting local products
        const local = localStorage.getItem('product')
        const localProducts: AddProduct[] = local ? JSON.parse(local) : [];

        //spreading both products into an array and assign id
        const totalProducts = [...apiProducts,...localProducts]
        const newId = totalProducts.length + 1

        const newProduct = {
            ...product,
            id: newId
        }
        
        await api.post('/add' , newProduct)
        .then(()=> {
            alert("Successfully added")

            //setting multiple product in localstorage
            const updatedProducts = [...localProducts, newProduct]
            localStorage.setItem('product', JSON.stringify(updatedProducts))
            router.push('/')
        })
        .catch((err)=> {
            console.log("error adding data" , err)
        })
    }  

  return (
    <div>
        <Header/>
        <h1 className='text-center font-mono text-[30px] py-10'>
            Add Product
        </h1>
        <div >
            <div className="min-h-screen  flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Add Product</h2>

                <form className="space-y-4 p-4 max-w-xl mx-auto bg-white shadow-md rounded-xl" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1">Product Name</label>
                        <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        className="w-full text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1">Brand</label>
                        <input
                        type="text"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        className="w-full text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product brand"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1">Thumbnail URL</label>
                        <input
                        type="text"
                        name="thumbnail"
                        value={product.thumbnail}
                        onChange={handleChange}
                        className="w-full text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter thumbnail URL"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1">Price</label>
                        <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter price"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1">Rating</label>
                        <input
                        type="number"
                        name="rating"
                        value={product.rating}
                        onChange={handleChange}
                        className="w-full text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter rating"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1">Stock</label>
                        <input
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        className="w-full text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter available stock"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-1">Description</label>
                        <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full text-gray-800 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product description"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full  bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                 </form>
            </div>
            </div>
        </div>
    </div>
  )
}

export default AddProductPage