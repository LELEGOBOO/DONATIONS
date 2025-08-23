import { useState } from "react";
import { supabase } from "./supabaseClient";
import Home from "./pages/Home";

const ngos = [
  { 
    name: "UNRWA", 
    url: "https://donate.unrwa.org/", 
    description: "Birleşmiş Milletler’in Filistinli mülteciler için yardım ajansı." 
  },
  { 
    name: "WFP", 
    url: "https://donate.wfp.org/", 
    description: "Birleşmiş Milletler Dünya Gıda Programı, açlıkla mücadele ediyor." 
  },
  { 
    name: "KIZILAY", 
    url: "https://www.kizilay.org.tr/bagis", 
    description: "Türkiye Kızılay Derneği, insani yardım ve afet desteği sağlar." 
  },
  { 
    name: "MAP (Medical Aid for Palestinians)", 
    url: "https://www.map.org.uk/donate", 
    description: "Filistin’de sağlık yardımı ve insani destek sağlar." 
  }
];

function App() {
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [utmRef] = useState(window.location.search);

  const handleDonate = async () => {
    if (!selectedNgo) {
      alert("Lütfen bir NGO seçin");
      return;
    }

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
    }

    // Kullanıcıyı NGO sayfasına yönlendir
    window.location.href = selectedNgo.url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 text-gray-900">
      {/* Header */}
      <header className="p-6 text-center bg-sky-500 text-white text-2xl font-bold">
        Whole 4 World 🌍
      </header>

      {/* Banner görsel */}
      <div className="flex justify-center mt-6">
        <img 
          src="https://source.unsplash.com/1200x400/?world,help" 
          alt="World help banner" 
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Home sayfa içeriği */}
      <div className="p-6">
        <Home />
      </div>

      {/* Bağış Bölümü */}
      <div className="flex flex-col items-center p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Lütfen bağış yapmak istediğiniz kuruluşu seçin:
        </h2>

        <input
          type="email"
          placeholder="E-mail (opsiyonel)"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="p-2 border rounded mb-4 w-72"
        />

        {/* NGO Butonları */}
        <div className="flex flex-wrap gap-3 justify-center">
          {ngos.map((ngo) => (
            <button
              key={ngo.name}
              onClick={() => setSelectedNgo(ngo)}
              className={`px-4 py-2 rounded-lg shadow-md transition ${
                selectedNgo?.name === ngo.name 
                  ? "bg-blue-600 text-white" 
                  : "bg-white border hover:bg-blue-100"
              }`}
            >
              {ngo.name}
            </button>
          ))}
        </div>

        {/* Seçilen NGO Kartı */}
        {selectedNgo && (
          <div className="mt-6 p-4 w-80 bg-white border rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">{selectedNgo.name}</h3>
            <p className="text-gray-700 mb-4">{selectedNgo.description}</p>
            <a 
              href={selectedNgo.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              Daha fazla bilgi
            </a>
          </div>
        )}

        {/* Donate Butonu */}
        <button
          onClick={handleDonate}
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
        >
          Donate
        </button>
      </div>
    </div>
  );
}

export default App;
