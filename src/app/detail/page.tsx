"use client"
import { useGetProductQuery } from '@/store/api/productApi'
import { addToCart } from '@/store/slice/cartSlice'
import { useSearchParams } from 'next/navigation'
import { Button } from 'primereact/button'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Toast } from 'primereact/toast';


const Details = () => {
  const searchParams = useSearchParams()
  const productId = searchParams.get("id")
  const { data: product, isLoading, error } = useGetProductQuery(Number(productId))
  const toast = useRef<Toast>(null)
  //belirli bir karakterden sonrasını kısalt 
  const [isExpanded, setIsExpanded] = useState(false)
  const dispatch = useDispatch()
  const [isAddedToCart, setIsAddedToCart] = useState(false)



  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Hata Oluştu</div>
  if (!productId) return <div>Ürün Bulunamadı</div>

  // gelene veri kontrolü 
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product))
      toast.current?.show({
        severity:'success',
        detail:"Ürün başarıyla sepete eklendi"
      })
      setIsAddedToCart(true)
    } else {
      console.error('Ürün bulunamadı')
    }
  }
  



  return (
    <div className='flex  gap-40 items-center justify-center'>
      <div className='flex justify-center items-center' >
        <img src={product?.image} alt="Ürün resmi" height={200} width={300} />
      </div>
      <div className='flex flex-col gap-10 mt-10'>
        <p className='w-50 font-bold' >{product?.description}</p>
        <span className='flex text-blue-950 font-extrabold border-0 rounded-xl border-b-blue-900 p-2 bg-blue-200 justify-center'>Fiyat:{product?.price}tl</span>

        <Button severity='info' label={isAddedToCart ? "Sepete eklendi":' Sepete Ekle'} icon={isAddedToCart? "pi pi-check" : "pi pi-shopping-cart"} className='p-button-sm' onClick={handleAddToCart} disabled={isAddedToCart}/>
      </div>
      <Toast ref={toast} />
    </div>
  )
}

export default Details