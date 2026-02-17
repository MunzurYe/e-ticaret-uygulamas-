"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { decreaseQuantity, increaseQuantity, removeFromCart, setInitialCart } from '@/store/slice/cartSlice'
import { Button } from 'primereact/button'
import { deductFromBalance } from '@/store/slice/balanceSlice'
import { Toast } from 'primereact/toast';


const Cart = () => {
    const dispatch = useDispatch()
    // ürün ,ekleme ,silme,azaltma arttırma işlemleri 
    const cart = useSelector((state: RootState) => state.cart)
    // hesap bakiye işlemleri
    const balance = useSelector((state: RootState) => state.balance)
    const toast = useRef<Toast>(null);





    useEffect(() => {
        const savedCart = localStorage.getItem("cart")

        if (savedCart) {
            dispatch(setInitialCart(JSON.parse(savedCart)))
        }
    }, [dispatch])

    const removeProduct = (productId: number) => {
        dispatch(removeFromCart(productId))
    }

    //sepet toplam tutar
    const cartTotal = cart.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
    }, 0)


    const handleConfirmCart = () => {
        const control = balance.amount >= cartTotal
        if (control) {
            dispatch(deductFromBalance(cartTotal))
            toast.current?.show({
                severity: 'success',
                summary: 'Başarılı!',
                detail: `Sepet onaylandı! \n Kalan Bakiye: ${balance.amount - cartTotal} TL`
            });

        } else {
            toast.current?.show({
                severity: 'error',
                summary: 'Yetersiz Bakiye',
                detail: `Eksik: ${cartTotal - balance.amount} TL.\n Lütfen bakiye yükleyin.`
            });
        }
    }





    if (cart.items.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-4 text-center">
                <p className="text-gray-500">Sepetiniz boş...</p>
            </div>
        )
    }




    return (
        <div>
            {cart.items.map((item) => (
                <div key={item.id} className="flex items-center m-6 p-4 w-full  rounded-2xl justify-between bg-blue-100" >
                    <div className='flex gap-5' >
                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded border-2 border-cyan-600" />
                        <div className='flex flex-col justify-between'>
                            <div className='font-extrabold'>{item.title}</div>
                            <div className='text-1xl text-gray-700'> {item.rating.count} Adetle Sınırlı </div>
                        </div>
                        <span className='font-medium'>
                            Fiyat :{item.price} tl
                        </span>
                    </div>
                    <div className=' flex gap-5 justify-center items-center'>
                        <div className='flex justify-center items-center gap-3 bg-blue-200 rounded-[50px] p-3'>
                            {/*ürün azaltma*/}
                            <Button icon="pi pi-minus" rounded outlined aria-label="Filter" onClick={() => dispatch(decreaseQuantity(item.id))} disabled={item.quantity <= 1} />

                            <span className='font-bold text-blue-950'>
                                ÜRÜN SAYISI : ({item.quantity})
                            </span>
                            {/* ürün arttırma */}
                            <Button icon="pi pi-plus" rounded outlined aria-label="Filter" onClick={() => dispatch(increaseQuantity(item.id))} />
                        </div>
                        {/* ürün silme */}
                        <i className='pi pi-trash cursor-pointer hover:scale-110 transition-all' style={{ fontSize: "1.5rem" }} onClick={() => removeProduct(item.id)} />
                    </div>
                </div>
            ))}
            <div className='flex items-center justify-center gap-3'>
                <Button label='Sepeti Onayla' severity='secondary' onClick={handleConfirmCart} />
                <span className='bg-blue-200 font-extrabold border-2 rounded-2xl p-2'>Toplam : {cartTotal}tl</span>
            </div>
            <Toast ref={toast} />
        </div>
    )
}

export default Cart