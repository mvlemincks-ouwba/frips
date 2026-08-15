import { AbsoluteFill, useCurrentFrame, interpolate, Sequence } from "remotion";

const GOLD = "#ffc400";
const GOLD_D = "#e0a800";
const INK = "#1a1305";

const FLAVORS: Record<string, { bag: string; name: string }> = {
  Original: { bag: GOLD, name: "Original" },
  Paprika: { bag: "#e2542b", name: "Paprika" },
  Fromage: { bag: "#f2c14e", name: "Fromage & oignon" },
};

// une frite qui tombe et rebondit
const FallingFry = ({ delay }: { delay: number }) => {
  const f = useCurrentFrame();
  const t = Math.max(0, f - delay);
  const y = interpolate(t, [0, 30, 60], [-200, 220, 200], {
    extrapolateRight: "clamp",
  });
  const rot = interpolate(t, [0, 60], [0, 60]);
  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        transform: `translateY(${y}px) rotate(${rot}deg)`,
      }}
    >
      <div
        style={{
          width: 14,
          height: 90,
          borderRadius: 7,
          background: "#fff",
          boxShadow: "inset -3px 0 0 #ffe27a",
        }}
      />
    </AbsoluteFill>
  );
};

export const FripsVideo: React.FC<{ flavor?: string }> = ({ flavor = "Original" }) => {
  const f = useCurrentFrame();
  const { bag, name } = FLAVORS[flavor] ?? FLAVORS.Original;
  // paquet 3D qui tourne
  const spin = interpolate(f, [0, 120], [0, 360]);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg,#fff8e6,#ffe9a8)",
        justifyContent: "center",
        alignItems: "center",
        perspective: 900,
      }}
    >
      {/* frites qui tombent en boucle */}
      <Sequence durationInFrames={90}>
        <FallingFry delay={0} />
        <FallingFry delay={20} />
        <FallingFry delay={40} />
      </Sequence>

      {/* paquet qui tourne */}
      <div
        style={{
          width: 170,
          height: 240,
          borderRadius: 18,
          background: `linear-gradient(155deg, ${bag}, ${GOLD_D})`,
          transformStyle: "preserve-3d",
          transform: `rotateY(${spin}deg)`,
          boxShadow: "0 20px 40px rgba(0,0,0,.25)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "4px solid rgba(255,255,255,.5)",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 13,
                height: 96,
                borderRadius: 6,
                background: "#fff",
                boxShadow: "inset -2px 0 0 #ffe27a",
              }}
            />
          ))}
        </div>
        <div style={{ fontWeight: 900, fontSize: 22, marginTop: 12, color: INK }}>
          FRIPS 🍟
        </div>
        <div style={{ fontWeight: 800, fontSize: 16, color: INK }}>{name}</div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontWeight: 900,
          fontSize: 28,
          color: INK,
          letterSpacing: 2,
        }}
      >
        FRIPS — l'apéro en frite
      </div>
    </AbsoluteFill>
  );
};
