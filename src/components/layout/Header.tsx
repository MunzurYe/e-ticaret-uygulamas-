"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'


const Header = () => {
    const pathname = usePathname();
    const wallet = useSelector((state: RootState) => state.balance)

    // hesap doğrulama
    const [isAuth, setIsAuth] = useState(false);
    const [isWallet, setIsWallet] = useState(wallet.amount)


    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthenticated");
        setIsAuth(authStatus === "true");
        const getWallet = localStorage.getItem("balance")
        if (getWallet) {
            setIsWallet(Number(getWallet))
        }
        else {
            setIsWallet(wallet.amount)
        }


    }, [pathname, wallet]); // Sayfa değişince tekrar kontrol et



    const handleLogout = () => {
        localStorage.setItem("isAuthenticated", "false")
        setIsAuth(false)
        window.location.reload()
    }

    return (
        <header>
            <div className='h-20 flex justify-between items-center'>
                <Link href="/">
                    <div className="hidden md:block">
                        <Image src="/logo.png" alt="Logo" width={80} height={80} priority />
                    </div>
                </Link>
                {!isAuth ? (
                    <div>
                        <Link href="/login">
                            Giriş Yap
                        </Link>
                    </div>
                ) : (<nav className='font-bold flex gap-5'>
                    <Link href="/">Anasayfa</Link>
                    <Link href="/cart">Sepetim</Link>
                    <Link href="/wallet">Cüzdan: <span className='bg-blue-200 p-2 rounded-2xl'>{isWallet}tl</span> </Link>
                    <Link href="/" onClick={handleLogout} >Çıkış Yap</Link>
                </nav>)}

            </div>
        </header>
    )
}

export default Header