'use client'

import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import {api} from '@/app/lib/api.js'
import { ProductType } from "@/types/product";
import Header from "@/components/Header";
import Link from "next/link";

///type specifying on destructured obj
// interface PropType {
//   name: string
//   age: number
// }

export default function Home(
  // {name, age}: PropType     ------ destructure type declaration 
) {

  const [product ,  setProduct] = useState<ProductType[]>([])

  useEffect(() => {
    api.get('')
    .then((res) => {
      // setProduct(res.data.products)
      const apiProduct = res.data.products

      //get deleted id
      const deletedId: number[] = JSON.parse(localStorage.getItem("deletedProductIds") || '[]')
      const visibleApiProducts = apiProduct.filter((item: ProductType) => !deletedId.includes(Number(item.id)))
      
      //to view updated value
      const updatedProduct = JSON.parse(localStorage.getItem('updatedproduct') || 'null')
      const updatedApiProducts = updatedProduct
      ? visibleApiProducts.map((p: ProductType) => p.id === updatedProduct.id ? updatedProduct : p)
      : visibleApiProducts;

      //load locally added product
      const local = localStorage.getItem('product')
      const localProduct :ProductType[]= local ? JSON.parse(local) : []
      
    
      setProduct([...updatedApiProducts,...localProduct])

    })
    .catch((err) => {
      console.error("error fetching data", err)
    })
  },[])

  return (
    
    <div>
      <Header/>
      <h1 className="text-center p-30 text-[50px] font-mono  ">
        Welcome to world of products
      </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 ">
          {product.map((p: ProductType) => (
             <Link href={`/products/view/${p.id}`} key={p.id} className="block">

                  <Card className="h-full">
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={p.thumbnail}
                        alt={p.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {p.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        ${p.price}<br/>
                        {p.rating}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
              
              </Link>
          ))}
        </div>
      

        
    
  
    </div>
  );
}
