"use client"
import { useEffect, useEffectEvent, useState } from "react";
import NotLog from "./NotLog";
import HomePage from "./Home/Home";







export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);




  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth == "true") {
      setIsAuthenticated(true);
    }
    else {
      setIsAuthenticated(false)
    }
  }, []);

 


  



  return (
    <>
      {/* <div className="fixed right-4 top-4 bg-white p-4 shadow-lg rounded-lg border">
        <h3 className="font-bold text-lg mb-2">🛒 Sepet ({cart.length})</h3>

        {cart.length === 0 ? (
          <p className="text-gray-500">Sepetiniz boş</p>
        ) : (
          <div className="max-h-60 overflow-y-auto">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center gap-2 py-2 border-b">
                <img src={item.image} alt={item.title} className="w-8 h-8 object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                  <p className="text-green-600 text-xs">{item.price} TL</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div> */}
      {isAuthenticated ? <HomePage/> : <NotLog />}
    </>
  );
}
