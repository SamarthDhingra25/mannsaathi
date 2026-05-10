import { motion } from "framer-motion";

export default function CalmBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {/* Soft gradient glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(34,211,238,0.18),transparent_60%)]" />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/10 blur-sm"
          style={{
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: Math.random() * 6 + 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating animated blobs */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]"
        animate={{ x: [0, 120, 0], y: [0, -100, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "-150px", left: "-150px" }}
      />
      <motion.div
        className="absolute w-[450px] h-[450px] bg-cyan-400/20 rounded-full blur-[120px]"
        animate={{ x: [0, -120, 0], y: [0, 120, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "-150px", right: "-150px" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] bg-rose-400/10 rounded-full blur-[140px]"
        animate={{ x: [-60, 60, -60], y: [0, -80, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "30%", left: "50%" }}
      />
    </div>
  );
}
