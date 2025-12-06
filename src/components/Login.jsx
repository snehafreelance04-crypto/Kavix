export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#160523]">
      <div className="bg-white rounded-2xl p-10 w-[380px]">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Login to Kavix
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded-lg"
        />

        <button className="w-full p-3 bg-cyan-600 text-white rounded-lg">
          Login
        </button>
      </div>
    </div>
  );
}
