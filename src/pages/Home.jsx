import React, { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import NGOCard from "../components/NGOCard"

export default function Home() {
  const [ngos, setNgos] = useState([])

  useEffect(() => {
    async function fetchNGOs() {
      let { data } = await supabase.from("ngos").select("*")
      setNgos(data)
    }
    fetchNGOs()
  }, [])

  // Test kullanıcı (ileride gerçek auth bağlanabilir)
  const user = { id: "u123", name: "Ali", email: "ali@example.com" }

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {ngos.map((ngo) => (
        <NGOCard key={ngo.id} ngo={ngo} user={user} />
      ))}
    </div>
  )
}
