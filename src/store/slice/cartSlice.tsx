import { Product } from "@/types/product";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit"


interface CartItem extends Product {
    //ürün sayısı
    quantity: number
}

interface CartState {
    items: CartItem[]
}

const initialState: CartState = {
    items: []  // Sadece boş array
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // ürünü sepete ekleme
        addToCart: (state, action: PayloadAction<Product>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id)

            if (existingItem) {
                existingItem.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
            localStorage.setItem('cart', JSON.stringify(state))
        },
        //ürün miktarı arttırma
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload)
            if (item) {
                item.quantity += 1
            }
            localStorage.setItem('cart', JSON.stringify(state))
        },
        //ürün miktarı azaltma
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload)
            if (item && item.quantity > 1) {
                item.quantity -= 1
            }
            localStorage.setItem('cart', JSON.stringify(state))
        },
        //ürün silme
        removeFromCart: (state, action: PayloadAction<number>) => {
            //ürünü bulup id si eşitse çıkarır
            state.items = state.items.filter(item => item.id !== action.payload)
            localStorage.setItem('cart', JSON.stringify(state))
        },
      
        //YENİ ACTION: localStorage'dan yükleme için
        setInitialCart: (state, action: PayloadAction<CartState>) => {
            state.items = action.payload.items
        }

    }
})


export const { addToCart, setInitialCart, removeFromCart,increaseQuantity,decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;