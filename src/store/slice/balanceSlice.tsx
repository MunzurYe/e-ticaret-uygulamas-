import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface BalanceState {
    amount: number
}

const initialState: BalanceState = {
    amount: 1000
}

const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {
        // bakiyeden düşme
        deductFromBalance: (state, action: PayloadAction<number>) => {
            state.amount -= action.payload
            localStorage.setItem('balance',state.amount.toString() )
        },
        //  Bakiye yükleme
        addToBalance: (state, action: PayloadAction<number>) => {
            state.amount += action.payload
            localStorage.setItem('balance', state.amount.toString())
        },
        // Başlangıç bakiyesi yükleme
        setInitialBalance: (state, action: PayloadAction<BalanceState>) => {
            state.amount = action.payload.amount
        }
    }
})
export const { deductFromBalance, addToBalance, setInitialBalance } = balanceSlice.actions
export default balanceSlice.reducer