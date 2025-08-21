import { supabase } from "../supabaseClient"

export default function NGOCard({ ngo, user }) {
  const handleDonate = async () => {
    const refCode = `${user?.id || "guest"}-${Date.now()}`

    await supabase.from("donations").insert([
      {
        ngo_id: ngo.id,
        user_name: user?.name || "Guest",
        user_email: user?.email || null,
        status: "redirected",
        ref_code: refCode,
      },
    ])

    const donationUrl = `${ngo.donation_link}?utm_source=whole4world&utm_medium=referral&utm_campaign=donation&ref=${refCode}`
    window.open(donationUrl, "_blank")
  }

  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col items-center bg-blue-50">
      <img src={ngo.logo_url} alt={ngo.name} className="w-24 h-24 mb-2" />
      <h2 className="text-lg font-bold text-blue-700">{ngo.name}</h2>
      <p className="text-sm text-gray-600">{ngo.description}</p>
      <button
        onClick={handleDonate}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Donate
      </button>
    </div>
  )
}
