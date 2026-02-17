"use client"
import { useGetProductsQuery } from "@/store/api/productApi"
import Image from "next/image"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { useState } from "react"




const NotLog = () => {

  const [loading, setLoading] = useState(false);

  const { data: products, isLoading, error
  } = useGetProductsQuery()


  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Bir hata oluştu lütfen tekrar deneyin</div>
  }

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
  console.log(products)

  return (
    <div className="min-h-[calc(100vh-10rem)] flex flex-col ">
      <div className="h-[10rem] flex-1 shrink-0 items-center px-4 flex justify-between my-10">
        <div className="flex-1">
          <div className="p-inputgroup ">
            <InputText placeholder="Birşeyler arayın" />
            <Button icon="pi pi-search " loading={loading} onClick={handleSearch} className="bg-blue-800" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <Image src="/notlog.jpg" alt="logo" width={500} height={500} className="object-cover rounded-md shadow-blue-400 shadow-2xl" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* içerik ksımı buarada olacaktir */}
        <div className="grid grid-cols-3 gap-4 ">
          {
            products?.map((product) => (
              <div className="bg-white p-4 rounded-md shadow-md items-center" key={product.id}>
                <Image src={product.image} alt="resimler" width={150} height={140} className="object-cover rounded-md shadow-blue-400 shadow-2xl" />
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">
                  {product.title}
                </h3>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default NotLog