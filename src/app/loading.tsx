export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: "linear-gradient(135deg, #F8F6FF 0%, #EDE9FE 100%)" }}
    >
      {/* Logo */}
      <div className="mb-8 animate-pulse">
        <img
          src="/logo.png"
          alt="Realtor Guide"
          width={200}
          height={60}
          className="object-contain"
        />
      </div>

      {/* Spinner */}
      <div className="relative w-12 h-12">
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            border: "3px solid rgba(139,92,246,0.1)",
            borderTopColor: "#8B5CF6",
          }}
        />
      </div>

      {/* Loading text */}
      <p
        className="mt-6 text-sm font-semibold tracking-[0.2em] uppercase animate-pulse"
        style={{ color: "#8B5CF6" }}
      >
        Loading
      </p>
    </div>
  );
}
