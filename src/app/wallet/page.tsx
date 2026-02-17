"use client"
import React, { useEffect, useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addToBalance } from "@/store/slice/balanceSlice";
import { Toast } from 'primereact/toast';
import { Chart } from 'primereact/chart';



const walletPage = () => {
  const dispatch = useDispatch()
  const balance = useSelector((state: RootState) => state.balance)
  const cart = useSelector((state: RootState) => state.cart)
  const [value, setValue] = useState('');
  const [isBalance, setIsBalance] = useState<number>()
  const toast = useRef<Toast>(null)


  useEffect(() => {
    const savedBalance = localStorage.getItem("balance")

    if (savedBalance) {
      setIsBalance(Number(savedBalance))

    } else {
      setIsBalance(balance.amount)
    }
  }, [dispatch, balance])

  const handleAddBalance = () => {
    const amount = Number(value)
    if (amount > 0) {
      dispatch(addToBalance(amount))
      setValue("")
      toast.current?.show({
        severity: "success",
        summary: "Başarılı",
        detail: `${value}tl hesabınıza eklendi`,
        life: 1000
      })

    }
  }

  // dinamik şekilde sepetteki ürünlere göre DEĞŞİYOR 
  const [chartData, setChartData] = useState({});
  const calculateCategorySpending = () => {
    const categories: { [key: string]: number } = {};

    cart.items.forEach(item => {
      const category = item.category;
      const total = item.price * item.quantity;

      categories[category] = (categories[category] || 0) + total;
    });

    return categories;
  }

  useEffect(() => {
    //  VERİYİ HAZIRLA
    const categorySpending = calculateCategorySpending();

    const data = {
      labels: Object.keys(categorySpending),
      datasets: [
        {
          data: Object.values(categorySpending),
          backgroundColor: ['#3B82F6', '#10B981', '#EF4444', '#F59E0B', '#8B5CF6']
        }
      ]
    };

    setChartData(data);
  }, [cart]); //Sepet değişince yenile



  return (
    <div className="min-h-screen  bg-blue-200 flex flex-col items-center justify-center p-4">
      {/* Ana içerik */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Cüzdan Yönetimi</h1>
          <p className="text-gray-600 mt-2">Güncel bakiyeniz</p>
        </div>

        <div className="card flex flex-col items-center gap-4">
          <div className="w-full flex gap-3">
            <InputText
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Miktar girin..."
              className="w-full p-3 border rounded-lg"
            />
            <Button label="Ekle" onClick={handleAddBalance} />
          </div>
          <div className="text-xl font-semibold text-blue-600">Bakiye : {isBalance}tl  </div>
        </div>
      </div>
      {/* Grafik bölümü */}
      <div className="w-full max-w-4xl mt-8 bg-white rounded-lg shadow-lg p-6 flex-1">
        <div className=" bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="card">
            {Object.keys(chartData).length > 0 && (
              <Chart type="bar" data={chartData} className="w-full felx-1" />
            )}

            {/* SEPET BOŞSA MESAJ GÖSTER */}
            {cart.items.length === 0 && (
              <p>Sepetiniz boş - Ürün ekleyin...</p>
            )}
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </div>
  )
}

export default walletPage