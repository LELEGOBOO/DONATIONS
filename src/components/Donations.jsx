import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// 🔹 .env dosyandan Supabase URL ve KEY çekiyoruz
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function Donations() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const { error } = await supabase.from("donations").insert([
      {
        name,
        amount,
        message,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Error inserting donation:", error.message);
      alert("Error: " + error.message);
    } else {
      setSuccess(true);
      setName("");
      setAmount("");
      setMessage("");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Make a Donation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Donate"}
        </button>
      </form>
      {success && (
        <p className="text-green-600 mt-4 text-center">
          ✅ Donation submitted successfully!
        </p>
      )}
    </div>
  );
}

export default Donations;
