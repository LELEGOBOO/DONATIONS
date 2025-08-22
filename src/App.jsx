import Home from "./pages/Home"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200">
      <header className="p-6 text-center bg-sky-500 text-white text-2xl font-bold">
        Whole 4 World 🌍
      </header>
      <Home />
    </div>
  )
}

export default App
import { useState } from "react";
import { supabase } from "./supabaseClient";

const ngos = [
  { name: "UNRWA", url: "https://donate.unrwa.org/" },
  { name: "WFP", url: "https://donate.wfp.org/" },
  { name: "KIZILAY", url: "https://www.kizilay.org.tr/bagis" },
  { name: "MAP (Medical Aid for Palestinians)", url: "https://www.map.org.uk/donate" }
];

function App() {
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [utmRef, setUtmRef] = useState(window.location.search);

  const handleDonate = async () => {
    if (!selectedNgo) {
      alert("Lütfen bir NGO seçin");
      return;
    }

    // Supabase'e kayıt düş
    const { error } = await supabase.from("donations").insert([
      {
        user_email: userEmail || null,
        ngo_name: selectedNgo.name,
        utm_ref: utmRef || null,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      alert("Kayıt yapılamadı!");
      return;
      import React from "react";
import Donations from "./components/Donations";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Donations />
    </div>
  );
}

export default App;
    }

    // Kullanıcıyı NGO sayfasına yönlendir
    window.location.href = selectedNgo.url;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">🌍 Whole 4 World</h1>
      <p className="mb-4">Lütfen bağış yapmak istediğiniz kuruluşu seçin:</p>

      <input
        type="email"
        placeholder="E-mail (opsiyonel)"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        className="p-2 border rounded mb-4"
      />

      <div className="space-y-3">
        {ngos.map((ngo) => (
          <button
            key={ngo.name}
            onClick={() => setSelectedNgo(ngo)}
            className={`px-4 py-2 rounded ${
              selectedNgo?.name === ngo.name ? "bg-blue-600 text-white" : "bg-white border"
            }`}
          >
            {ngo.name}
          </button>
        ))}
      </div>

      <button
        onClick={handleDonate}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Donate
      </button>
    </div>
  );
}

export default App;
