"use client";

export default function ProgressPips({ correct, toPass }: { correct: number; toPass: number }) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: toPass }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: 14, height: 14,
            background: i < correct ? "#4db89c" : "#daf2ea",
            border: `2px solid ${i < correct ? "#33a082" : "#b2e4d4"}`,
            transform: i < correct ? "scale(1.2)" : "scale(1)",
          }}
        />
      ))}
    </div>
  );
}
