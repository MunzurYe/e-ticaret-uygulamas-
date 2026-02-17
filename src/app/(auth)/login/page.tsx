"use client"
import Image from 'next/image'
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';



const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null)


  const correctPassword = "123456"
  const correctEmail = "munzuryeşilçayır@gmail.com"

  const handleSignup = () => {
    router.push("/signup")
  }

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {

      if (password == correctPassword && email == correctEmail) {
        setLoading(false);
        localStorage.setItem("isAuthenticated", "true");
        toast.current?.show({
          severity: "success",
          summary: "Başarılı",
          detail: "Başarıyla giriş yaptınız",
          life: 2000
        })


        setTimeout(() => router.push("/"), 1500)
      } else {
        setLoading(false)
        toast.current?.show({
          severity: "error",
          summary: "Hata",
          detail: "Giriş başarısız",
          life: 2000
        })
      }
    }, 2000);

  }



  return (
    <section className="py-8 h-130 ">
      <div className="max-w-[1200px] mx-auto px-4  gap-8 md:grid-cols-2 items-center flex">
        <div className="hidden md:block">
          <Image src="/login1.png" alt="Giriş Görseli" width={600} height={400} priority />
        </div>
        <div className='h-70 gap-10 flex flex-col '>
          <h1 className='text-3xl'>Lütfen giriş yapınız</h1>

          <FloatLabel>
            <InputText id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="g-mail">g-mail</label>
          </FloatLabel>

          <FloatLabel>
            <InputText id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="password">Şifre</label>
          </FloatLabel>
          <div className='flex flex-col justify-center gap-3'>
            <Button
              loading={loading}
              label="Giriş Yap"
              onClick={handleLogin}
              disabled={!email.trim() || !password.trim()}
              severity={!email.trim() || !password.trim() ? "secondary" : "danger"}
            />
            <div className='flex items-center justify-center gap-2 my-4' >
              <div className="flex-1 h-px bg-gray-500"></div>
              <div className="text-gray-80000 text-sm">Ve Ya</div>
              <div className="flex-1 h-px bg-gray-500"></div>
            </div>
            <div className='flex items-center justify-center' >
              <div className='cursor-pointer font-bold' onClick={handleSignup} >Kayıt ol</div>
            </div>
          </div>
        </div>
      </div>
      <Toast ref={toast} />
    </section>

  )
}

export default LoginPage