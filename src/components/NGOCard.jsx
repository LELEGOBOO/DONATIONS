import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export default function DonationForm({ ngo, user }) {
  const [amount, setAmount] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  async function handleDonate() {
    const { error } = await supabase.from("donations").insert([
      {
        user_id: user.id,       // auth.uid()
        ngo_id: ngo.id,         // seçilen NGO
        amount: amount,
        full_name: fullName,
        phone: phone,
        user_email: user.email, // email sadece tek kolon
      },
    ]);

    if (error) {
      console.error(error);
    } else {
      alert("Donation recorded successfully!");
      setAmount("");
      setFullName("");
      setPhone("");
    }
  }

  return (
    <div className="p-4 border rounded shadow bg-white">
      <h2 className="font-bold mb-2">{ngo.name}</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="email"
        placeholder="Your Email"
        value={user.email}
        disabled
        className="w-full p-2 mb-2 border rounded bg-gray-100"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button
        onClick={handleDonate}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Donate
      </button>
    </div>
  );
}
