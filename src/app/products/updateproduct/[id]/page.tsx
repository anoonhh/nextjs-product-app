'use client'

import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import {api} from '@/app/lib/api'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface UpdateType {
  title: string
  price: number
  thumbnail: string
  description: string
  rating: number
  brand: string
  stock: number
}

const UpdateProductPage = () => {

  const [product , setProduct] = useState<UpdateType>({  
    title: '',
    price: 0,
    thumbnail:'',
    description: '',
    rating: 0,
    brand: '',
    stock: 0
  })

  const params = useParams()
  const id = Number(params.id)

  const router = useRouter()

  useEffect(() => {
    api.get(`/${id}`)
    .then((res) => {
      setProduct(res.data)
    })
    .catch(() => {
      alert('Error fetching data!!!')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }


  const handleSubmit = async(e: React.FormEvent) => {
     e.preventDefault();

    console.log(typeof id,"type of id")
    
    await api.patch(`/${id}`, {
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      description: product.description,
      rating: product.rating,
      brand: product.brand,
      stock: product.stock,
    })
    .then((res) => {
      console.log("first", product)
      localStorage.setItem('updatedproduct',JSON.stringify(res.data))
      alert('product updated successfully')
      router.push(`/products/view/${id}`)
      
    }).catch((err) => {
      console.log(err,"rroorrrr.........")
      alert('Error updating product!!!')
    })
  }

  return (
    <div>
      <Header />
      <h1 className='text-center font-mono text-[30px] py-10'>Update Product</h1>
      <div>
      <div>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-xl bg-white p-6 rounded-xl shadow-md"
        >
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="Product Title"
              className="w-full text-gray-800 border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
            <input
              type="text"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              placeholder="Brand"
              className="w-full text-gray-800 border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-sm font-bold mb-2">thumbnail</label>
            <input
              type="text"
              name="thumbnail"
              value={product.thumbnail}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full text-gray-800 border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-bold mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full text-gray-800 border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-bold mb-1">Rating</label>
            <input
              type="number"
              name="rating"
              value={product.rating}
              onChange={handleChange}
              placeholder="Rating"
              className="w-full text-gray-800 border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-bold mb-1">Stock</label>

            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-full text-gray-800 border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-bold mb-1">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Description"
              rows={4}
              className="w-full text-gray-800 border px-4 py-2 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
      </div>
    </div>
  )
}

export default UpdateProductPage