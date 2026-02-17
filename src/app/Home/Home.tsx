"use client"
import { useGetProductsQuery } from '@/store/api/productApi'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useState } from 'react'




const HomePage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const router = useRouter()

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setIsSearching(true)
    }
  }
// beckendden gelen verileri console.log ile görüntülemek için yazdım
console.log(products)

// ürün filitrelemesinde
  const filteredProducts = isSearching
    ? products?.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : selectedCategory
      ? products?.filter(product => product.category === selectedCategory)
      : products


  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Bir hata oluştu lütfen tekrar dene</div>
  }


  return (
    <>
      <div className="min-h-[calc(100vh-10rem)] flex flex-col min-h-0">
        <div className="h-30 shrink-0 flex items-center justify-between gap-3 px-4 mb-20 bg-blue-100">
          <div className='gap-4 flex flex-1 w-full '>
            <InputText placeholder="Ürün ara" className="w-[20rem] flex-1 " onChange={(e) => {
              setSearchTerm(e.target.value)
              setIsSearching(false)
            }} />
            <Button onClick={handleSearch} label="Ara" icon="pi pi-search" />

          </div>
          <div className='flex-1 flex gap-6 justify-between'>
            {
              // ürün kategorilerini alıp türüne göre diziye çevirip tekarar üstünde döndüm
              [...new Set(products?.map(product => product.category))].map((category, index) => (
                <div key={index} className='bg-blue-200 p-3 rounded-md cursor-pointer hover:bg-blue-300' onClick={() => setSelectedCategory(category)}>
                  {category}
                </div>
              ))
            }
          </div>
        </div> 
        <div className='grid grid-cols-3 grid-rows-4 gap-4 justify-between'>
          {
            filteredProducts?.map((product) => (
              <div className="bg-blue-100 p-4 rounded-md shadow-md items-center shadow-[4px 4px 4px] shadow-gray-600  justify-between" key={product.id}>
                <div className='flex-1 mb-3 w-50  ' >
                  <Image src={product.image} alt="resimler" width={100} height={100} className="object-cover rounded-md shadow-2xl w-full h-50 " />
                </div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-2 flex-1">
                  {product.title}
                </h3>
                <div className='flex items-center justify-between mt-auto' >
                  <span className='bg-blue-300 text-blue-950 font-extrabold border-0 rounded-xl border-b-blue-900 p-2 bg-blue-200'>Fiyat : {product?.price}tl</span>
                  <div className='flex flex-col gap-2'>
                    <Button severity='contrast' label='Ürün Detayları' className='p-button-sm' onClick={() => router.push(`/detail?id=${product.id}`)} />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default HomePage
