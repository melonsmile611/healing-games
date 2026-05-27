"use client";

const RIBBON = "#3da082";

interface Props {
  playing: boolean;
  answered: boolean;
  correct: boolean;
  revealIcon: string;
  onClick: () => void;
}

export default function MysteryBox({ playing, answered, correct, revealIcon, onClick }: Props) {
  const lidLift   = playing && !answered ? -10 : answered ? -54 : 0;
  const lidRotate = playing && !answered ? -5  : answered ? -30 : 0;

  return (
    <button
      onClick={onClick}
      aria-label="Play mystery sound"
      className="flex flex-col items-center"
      style={{ background: "none", border: "none", padding: 0,
               cursor: answered ? "default" : "pointer" }}
    >
      <div style={{
        position: "relative", width: 164,
        animation:
          playing && !answered
            ? "boxShake 0.5s ease-in-out infinite, boxGlow 1.6s ease-in-out infinite"
            : answered && correct
            ? "boxGlow 2s ease-in-out infinite"
            : "none",
      }}>

        {/* lid */}
        <div style={{
          position: "relative", zIndex: 2,
          transform: `translateY(${lidLift}px) rotateX(${lidRotate}deg)`,
          transition: "transform 0.55s cubic-bezier(0.34,1.56,0.64,1)",
          transformOrigin: "bottom center",
        }}>
          <div style={{
            width: 172, height: 38, marginLeft: -4,
            borderRadius: "10px 10px 4px 4px",
            background: "linear-gradient(155deg, #faf0dc 0%, #ead8a8 100%)",
            boxShadow: "inset 0 -3px 7px rgba(0,0,0,0.09), 0 2px 7px rgba(0,0,0,0.13)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position:"absolute",top:"50%",left:0,right:0,height:14,marginTop:-7,background:RIBBON,opacity:0.88 }} />
            <div style={{ position:"absolute",left:"50%",top:0,bottom:0,width:14,marginLeft:-7,background:RIBBON,opacity:0.88 }} />
          </div>
          {/* bow */}
          <div style={{ position:"absolute",top:-20,left:"50%",transform:"translateX(-50%)",display:"flex",gap:2,alignItems:"flex-end" }}>
            <div style={{ width:30,height:23,borderRadius:"50% 0 0 50%",
              background:`radial-gradient(ellipse at 70% 38%, #5bc9a8, ${RIBBON})`,
              transform:"rotate(-20deg) skewX(-8deg)",
              boxShadow:"inset -2px 2px 5px rgba(0,0,0,0.18)" }} />
            <div style={{ width:15,height:15,borderRadius:"50%",
              background:`radial-gradient(circle at 38% 38%, #5bc9a8, #257a58)`,
              boxShadow:"0 2px 5px rgba(0,0,0,0.22)",zIndex:1 }} />
            <div style={{ width:30,height:23,borderRadius:"0 50% 50% 0",
              background:`radial-gradient(ellipse at 30% 38%, #5bc9a8, ${RIBBON})`,
              transform:"rotate(20deg) skewX(8deg)",
              boxShadow:"inset 2px 2px 5px rgba(0,0,0,0.18)" }} />
          </div>
        </div>

        {/* body */}
        <div style={{
          width: 164, height: 136,
          borderRadius: "4px 4px 16px 16px",
          background: "linear-gradient(168deg, #f7ecd8 0%, #e8d4a0 52%, #d2b87c 100%)",
          boxShadow: "0 10px 28px rgba(60,100,80,0.20), inset 0 1px 0 rgba(255,255,255,0.65)",
          position: "relative", overflow: "hidden",
        }}>
          {/* grain */}
          <div style={{ position:"absolute",inset:0,borderRadius:"inherit",
            backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4'%3E%3Ccircle cx='1' cy='1' r='0.5' fill='rgba(0,0,0,0.035)'/%3E%3C/svg%3E")` }} />
          {/* ribbon bands */}
          <div style={{ position:"absolute",top:"50%",left:0,right:0,height:20,marginTop:-10,background:RIBBON,opacity:0.82 }} />
          <div style={{ position:"absolute",left:"50%",top:0,bottom:0,width:20,marginLeft:-10,background:RIBBON,opacity:0.82 }} />
          <div style={{ position:"absolute",left:"50%",top:"50%",width:20,height:20,marginLeft:-10,marginTop:-10,background:"rgba(255,255,255,0.28)" }} />
          {/* shadows / shine */}
          <div style={{ position:"absolute",left:0,top:0,bottom:0,width:16,background:"linear-gradient(to right,rgba(0,0,0,0.11),transparent)",borderRadius:"4px 0 0 16px" }} />
          <div style={{ position:"absolute",left:0,right:0,bottom:0,height:16,background:"linear-gradient(to top,rgba(0,0,0,0.09),transparent)",borderRadius:"0 0 16px 16px" }} />
          <div style={{ position:"absolute",left:0,right:0,top:0,height:10,background:"linear-gradient(to bottom,rgba(255,255,255,0.25),transparent)" }} />
          {/* reveal */}
          {answered && (
            <div style={{ position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
              animation:"floatUp 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards", fontSize:46 }}>
              {revealIcon}
            </div>
          )}
        </div>

        {/* ground shadow */}
        <div style={{ width:134,height:10,margin:"5px auto 0",borderRadius:"50%",background:"rgba(60,100,80,0.17)",filter:"blur(5px)" }} />
      </div>

      <span className="mt-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-300"
        style={{ color: playing && !answered ? "#33a082" : "#6d8c7e" }}>
        {answered ? "已揭晓" : playing ? "正在播放…" : "点击播放 ▶"}
      </span>
    </button>
  );
}
