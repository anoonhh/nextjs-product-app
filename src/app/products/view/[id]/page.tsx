'use client'

import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import { api } from '@/app/lib/api'
import { useParams, useRouter } from 'next/navigation'
import { ProductType } from '@/types/product'
import Link from 'next/link'

const ProductPage = () => {
  const [product, setProduct] = useState<ProductType | null>(null )

  const params = useParams()
  const id = Number(params?.id)

  const router = useRouter()

  useEffect(() => {
    const updatedProduct = localStorage.getItem('updatedproduct')
    const localProduct = localStorage.getItem('product')
    
    if(updatedProduct){
      const parsed = JSON.parse(updatedProduct)
      if(parsed.id == id){
        setProduct(parsed)
        return
      }
    }
    
    if(localProduct){
      const parsedLocal = JSON.parse(localProduct)
     const foundLocal = parsedLocal.find((p: ProductType) => Number(p.id) === id);
      if (foundLocal) {
        setProduct(foundLocal);
        return;
      }
    }

    //api call should be outside
    api.get(`/${id}`)
      .then((res) => {
        setProduct(res.data)
      })
      .catch(() => {
        alert('Failed to fetch product.')
      })
      

  }, [id])


  if (!product) {
    return (
      <div>
        <Header />
        <div className="text-center mt-10 text-gray-500 text-lg">Loading product...</div>
      </div>
    )
  }


  const handleDelete = async() => {
    const confirmDelete = confirm("Are you sure want to delete this product?")
    if(!confirmDelete) return
    
    try{

      await api.delete(`/${id}`)
      alert('deleted successfully')

      const deletedItems: number[] = JSON.parse(localStorage.getItem('deletedProductIds') || '[]');

      const numericId = Number(id);

      if (!deletedItems.includes(numericId)) {
        deletedItems.push(numericId);
        localStorage.setItem('deletedProductIds', JSON.stringify(deletedItems));
      }
      router.push('/')

    }catch(err){
      alert("product not deleted")
      console.log(err)
    }
  }

  return (
    <div className=" min-h-screen">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white shadow-md rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="w-full h-[300px] md:h-full">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="p-7 flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">{product.title}</h2>
            <p className="text-sm text-gray-500">{product.brand}</p>

            <p className="text-gray-700 text-base leading-relaxed">
              {product.description}
            </p>

            <div className="pt-2 space-y-1 text-gray-800 text-sm">
              <p><span className="font-medium">Price:</span> ₹{product.price}</p>
              <p><span className="font-medium">Rating:</span> ⭐ {product.rating} / 5</p>
              <p><span className="font-medium">Stock:</span> {product.stock} available</p>
            </div>

            <Link href={`/products/updateproduct/${id}`} className='text-center bg-black p-1 rounded-md hover:bg-stone-700'>
            <button >Update</button> 
            </Link>
            <button onClick={handleDelete} className='bg-red-900 p-1 rounded-md hover:bg-red-700'>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
