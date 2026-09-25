import React, { useState, useEffect, useRef } from "react";

export type HeadState = "attached" | "falling" | "onGround" | "dragging" | "justSnapped";

export default function InteractiveCyberRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<SVGGElement>(null);

  // Mouse tracking
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });

  // Head Falling & Dragging Interactive State
  const [headState, setHeadState] = useState<HeadState>("attached");
  // Position of head relative to default neck center (dx, dy in SVG units)
  const [headOffset, setHeadOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialHeadOffset, setInitialHeadOffset] = useState({ x: 0, y: 0 });
  const [isNearNeck, setIsNearNeck] = useState(false);
  const [celebrateCount, setCelebrateCount] = useState(0);

  // Smooth LERP animation loop for buttery 60/120fps tracking when attached
  useEffect(() => {
    let animId: number;
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const tick = () => {
      setCurrentPos((prev) => ({
        x: lerp(prev.x, targetPos.x, 0.12),
        y: lerp(prev.y, targetPos.y, 0.12),
      }));
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [targetPos]);

  // Global mouse tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 3;

      const rawX = (e.clientX - centerX) / (window.innerWidth * 0.45);
      const rawY = (e.clientY - centerY) / (window.innerHeight * 0.45);

      setTargetPos({
        x: Math.max(-1, Math.min(1, rawX)),
        y: Math.max(-1, Math.min(1, rawY)),
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !e.touches[0] || isDragging) return;
      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 3;

      const rawX = (touch.clientX - centerX) / (window.innerWidth * 0.4);
      const rawY = (touch.clientY - centerY) / (window.innerHeight * 0.4);

      setTargetPos({
        x: Math.max(-1, Math.min(1, rawX)),
        y: Math.max(-1, Math.min(1, rawY)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  // Handle clicking the head to detach it!
  const handleHeadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (headState === "attached" || headState === "justSnapped") {
      setHeadState("falling");
      // Animate head falling to floor (ground position: x ~ +60, y ~ +280)
      let start = Date.now();
      const duration = 650;
      const initialY = 0;
      const targetY = 275;
      const targetX = 65;

      const fallAnim = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(1, elapsed / duration);
        // Bounce easing
        const easeOutBounce = (x: number): number => {
          const n1 = 7.5625;
          const d1 = 2.75;
          if (x < 1 / d1) return n1 * x * x;
          else if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
          else if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
          else return n1 * (x -= 2.625 / d1) * x + 0.984375;
        };

        const currentY = initialY + (targetY - initialY) * easeOutBounce(progress);
        const currentX = targetX * Math.min(1, progress * 1.2);

        setHeadOffset({ x: currentX, y: currentY });

        if (progress < 1) {
          requestAnimationFrame(fallAnim);
        } else {
          setHeadState("onGround");
        }
      };

      requestAnimationFrame(fallAnim);
    }
  };

  // Dragging Head Logic (Mouse & Touch)
  const handleStartDrag = (clientX: number, clientY: number) => {
    if (headState === "onGround" || headState === "dragging") {
      setIsDragging(true);
      setHeadState("dragging");
      setDragStart({ x: clientX, y: clientY });
      setInitialHeadOffset({ ...headOffset });
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const deltaX = (e.clientX - dragStart.x) * 0.9;
      const deltaY = (e.clientY - dragStart.y) * 0.9;

      const nextX = initialHeadOffset.x + deltaX;
      const nextY = initialHeadOffset.y + deltaY;

      setHeadOffset({ x: nextX, y: nextY });

      // Check distance from neck anchor (neck is at 0, 0)
      const dist = Math.sqrt(nextX * nextX + nextY * nextY);
      setIsNearNeck(dist < 70);
    };

    const handleTouchPointerMove = (e: TouchEvent) => {
      if (!containerRef.current || !e.touches[0]) return;
      const touch = e.touches[0];
      const deltaX = (touch.clientX - dragStart.x) * 0.9;
      const deltaY = (touch.clientY - dragStart.y) * 0.9;

      const nextX = initialHeadOffset.x + deltaX;
      const nextY = initialHeadOffset.y + deltaY;

      setHeadOffset({ x: nextX, y: nextY });

      const dist = Math.sqrt(nextX * nextX + nextY * nextY);
      setIsNearNeck(dist < 70);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      // Snap to neck if close enough!
      const dist = Math.sqrt(headOffset.x * headOffset.x + headOffset.y * headOffset.y);
      if (dist < 70) {
        snapBackToNeck();
      } else {
        // Fall back to ground
        setHeadState("onGround");
        setHeadOffset({ x: 65, y: 275 });
        setIsNearNeck(false);
      }
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handleTouchPointerMove);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handleTouchPointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [isDragging, dragStart, initialHeadOffset, headOffset]);

  // Snap back and celebrate
  const snapBackToNeck = () => {
    setHeadOffset({ x: 0, y: 0 });
    setHeadState("justSnapped");
    setIsNearNeck(false);
    setCelebrateCount((prev) => prev + 1);

    setTimeout(() => {
      setHeadState("attached");
    }, 3200);
  };

  // Calculated 3D transforms for head when attached
  const isHeadAttached = headState === "attached" || headState === "justSnapped";
  const rotateY = isHeadAttached ? currentPos.x * 22 : 0;
  const rotateX = isHeadAttached ? -currentPos.y * 16 : 0;
  const eyeShiftX = isHeadAttached ? currentPos.x * 14 : 0;
  const eyeShiftY = isHeadAttached ? currentPos.y * 10 : 0;

  // Active white lens & pupil tracking: slides directly towards cursor arrow in all 4 directions
  const pupilTrackingX = isHeadAttached ? currentPos.x * 6.5 : 0;
  const pupilTrackingY = isHeadAttached ? currentPos.y * 6.5 : 0;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center select-none w-full max-w-[440px] mx-auto py-2"
      style={{ perspective: "1100px" }}
    >
      {/* Background Soft Ambient Light */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none" />

      {/* Main Interactive Stage */}
      <div
        className="relative w-[340px] sm:w-[390px] h-[450px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <svg
          viewBox="0 0 390 450"
          className="w-full h-full overflow-visible drop-shadow-xl"
        >
          <defs>
            {/* Glossy White Ceramic Shader */}
            <radialGradient id="glossyWhite" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#ffffff" />
              <stop offset="65%" stopColor="#e2e8f0" />
              <stop offset="95%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </radialGradient>

            {/* Shaded Limb Gradient for 3D Volume */}
            <linearGradient id="limbShading" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#f8fafc" />
              <stop offset="75%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            {/* Horizontal Cylinder Shading for crossed thighs */}
            <linearGradient id="horizontalCylinder" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#f1f5f9" />
              <stop offset="70%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>

            {/* Dark Metallic Joints & Armor */}
            <linearGradient id="darkMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            {/* Chrome Ball Joint Sphere */}
            <radialGradient id="chromeBall" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="40%" stopColor="#475569" />
              <stop offset="85%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>

            {/* Luxury Walnut Wood Chair */}
            <linearGradient id="woodFinish" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="40%" stopColor="#78350f" />
              <stop offset="80%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#291002" />
            </linearGradient>

            {/* Egyptian Tea Liquid */}
            <linearGradient id="egyptianTea" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="45%" stopColor="#991b1b" />
              <stop offset="90%" stopColor="#450a0a" />
            </linearGradient>

            {/* Cyan LED Glow */}
            <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#06b6d4" />
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#38bdf8" floodOpacity="0.8" />
            </filter>

            {/* Head Snap Target Glow */}
            <filter id="snapGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#10b981" />
              <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#34d399" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* 1. Floor Shadows */}
          <ellipse cx="195" cy="425" rx="145" ry="14" fill="#0f172a" opacity="0.09" />
          <ellipse cx="205" cy="425" rx="90" ry="8" fill="#0f172a" opacity="0.14" />
          {/* Head shadow on floor if detached */}
          {!isHeadAttached && (
            <ellipse
              cx={190 + headOffset.x}
              cy={105 + headOffset.y + 40}
              rx="42"
              ry="8"
              fill="#0f172a"
              opacity="0.22"
            />
          )}

          {/* 2. Sleek Modern Café Chair (Polished Walnut & Metal) */}
          <g>
            {/* Backrest: Curved Ergonomic Wood */}
            <path
              d="M 110 175 Q 190 145 270 175 Q 260 280 250 290 Q 190 282 130 290 Q 120 280 110 175 Z"
              fill="url(#woodFinish)"
              stroke="#291002"
              strokeWidth="2.5"
            />
            {/* Backrest Highlights & Cushioned Contour */}
            <path
              d="M 125 185 Q 190 160 255 185 L 242 278 Q 190 270 138 278 Z"
              fill="#78350f"
              opacity="0.4"
            />
            {/* Chair Seat Cushion */}
            <ellipse cx="190" cy="298" rx="86" ry="24" fill="url(#woodFinish)" stroke="#291002" strokeWidth="2.5" />
            <ellipse cx="190" cy="295" rx="80" ry="20" fill="#92400e" opacity="0.5" />

            {/* Polished Metallic Slender Chair Legs */}
            <line x1="125" y1="305" x2="110" y2="420" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="255" y1="305" x2="270" y2="420" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="145" y1="310" x2="148" y2="400" stroke="#1e293b" strokeWidth="3.5" opacity="0.6" strokeLinecap="round" />
            <line x1="235" y1="310" x2="232" y2="400" stroke="#1e293b" strokeWidth="3.5" opacity="0.6" strokeLinecap="round" />
          </g>

          {/* 3. Small Side Table with Egyptian Mint Tea Glass */}
          <g transform="translate(42, 270)">
            {/* Table Top */}
            <ellipse cx="32" cy="50" rx="34" ry="12" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
            <ellipse cx="32" cy="49" rx="30" ry="9" fill="#ffffff" />
            <line x1="32" y1="62" x2="32" y2="145" stroke="#475569" strokeWidth="4" />
            <path d="M 14 145 L 32 142 L 50 145" stroke="#475569" strokeWidth="4" strokeLinecap="round" />

            {/* Traditional Egyptian "شاي خمسينة" Glass Cup */}
            <path
              d="M 24 28 L 26 48 Q 32 50 38 48 L 40 28 Z"
              fill="rgba(255, 255, 255, 0.45)"
              stroke="#64748b"
              strokeWidth="1.5"
            />
            {/* Dark Red Tea */}
            <path
              d="M 25 35 L 26 47 Q 32 49 38 47 L 39 35 Q 32 36 25 35 Z"
              fill="url(#egyptianTea)"
            />
            {/* Fresh Green Mint Leaf (النعناع البلدي) */}
            <path
              d="M 32 35 Q 35 24 40 22 Q 37 30 34 37 Z"
              fill="#22c55e"
              stroke="#15803d"
              strokeWidth="0.8"
            />
            {/* Steam Wisps */}
            <path
              d="M 28 22 Q 26 15 29 8"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.2"
              strokeDasharray="2 2"
              className="animate-pulse"
            />
            <path
              d="M 34 20 Q 37 12 33 6"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.2"
              strokeDasharray="2 2"
              className="animate-pulse"
              style={{ animationDelay: "400ms" }}
            />
          </g>

          {/* 4. HIGH-QUALITY 3D-SHADED ROBOT BODY & LIMBS */}
          <g>
            {/* Robotic Torso / Chest Plate */}
            <path
              d="M 146 195 C 148 170, 232 170, 234 195 L 222 272 C 200 278, 180 278, 158 272 Z"
              fill="url(#glossyWhite)"
              stroke="#94a3b8"
              strokeWidth="2.5"
            />
            {/* Black Inset Chest Plate with Number 1 */}
            <path
              d="M 166 202 Q 190 196 214 202 L 208 258 Q 190 264 172 258 Z"
              fill="url(#darkMetal)"
              stroke="#334155"
              strokeWidth="1.5"
            />
            {/* Brand "Z" Tech Crest in chest center */}
            <text
              x="190"
              y="236"
              textAnchor="middle"
              fill="#38bdf8"
              fontSize="18"
              fontWeight="900"
              fontFamily="sans-serif"
              filter="url(#cyanGlow)"
            >
              Z
            </text>

            {/* Pelvis / Hip Core */}
            <path
              d="M 160 270 Q 190 282 220 270 L 214 298 Q 190 304 166 298 Z"
              fill="url(#darkMetal)"
              stroke="#0f172a"
              strokeWidth="1.5"
            />

            {/* ============================================================== */}
            {/* --- LEGS IN BALANCED NATURAL SITTING POSE (قاعد عادي برواقة) --- */}
            {/* ============================================================== */}

            {/* --- 1. LEFT LEG (Naturally planted on floor) --- */}
            <g>
              {/* Left Thigh (Smooth rounded cylinder in perspective) */}
              <path
                d="M 166 276 C 160 298, 150 322, 148 338 C 162 344, 180 342, 188 338 C 188 322, 192 296, 194 278 Z"
                fill="url(#limbShading)"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              <path
                d="M 166 284 C 162 302, 156 322, 154 334"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Left Knee Joint (Smooth white armor cap with cyan LED) */}
              <g transform="translate(162, 340)">
                <ellipse cx="0" cy="0" rx="14" ry="12" fill="url(#glossyWhite)" stroke="#94a3b8" strokeWidth="2" />
                <ellipse cx="0" cy="0" rx="8" ry="7" fill="url(#darkMetal)" />
                <circle cx="0" cy="0" r="3" fill="#38bdf8" filter="url(#cyanGlow)" />
              </g>

              {/* Left Shin & Calf (Curved anatomical contour tapering to ankle) */}
              <path
                d="M 150 348 C 146 370, 146 392, 150 412 L 174 412 C 178 392, 178 370, 174 348 Z"
                fill="url(#limbShading)"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              <path
                d="M 154 354 C 150 372, 150 394, 152 408"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Left Ankle Ring */}
              <rect x="146" y="408" width="30" height="5" rx="2.5" fill="url(#darkMetal)" />

              {/* Left Sneaker/Shoe (Planted flat on floor in 3D perspective) */}
              <path
                d="M 136 412 C 140 406, 178 406, 184 412 C 190 418, 186 424, 176 426 L 132 426 C 126 424, 128 418, 136 412 Z"
                fill="url(#glossyWhite)"
                stroke="#94a3b8"
                strokeWidth="1.8"
              />
              {/* Sole */}
              <path
                d="M 130 422 L 180 422 C 184 426, 178 428, 172 428 L 128 428 C 124 428, 126 424, 130 422 Z"
                fill="url(#darkMetal)"
              />
              <circle cx="158" cy="418" r="2.5" fill="#06b6d4" filter="url(#cyanGlow)" />
            </g>

            {/* --- 2. RIGHT LEG (Symmetrically and naturally planted on floor) --- */}
            <g>
              {/* Right Thigh (Smooth rounded cylinder in perspective) */}
              <path
                d="M 186 278 C 188 296, 192 322, 192 338 C 200 342, 218 344, 232 338 C 230 322, 220 298, 214 276 Z"
                fill="url(#limbShading)"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              <path
                d="M 226 284 C 222 302, 216 322, 214 334"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Right Knee Joint (Smooth white armor cap with cyan LED) */}
              <g transform="translate(218, 340)">
                <ellipse cx="0" cy="0" rx="14" ry="12" fill="url(#glossyWhite)" stroke="#94a3b8" strokeWidth="2" />
                <ellipse cx="0" cy="0" rx="8" ry="7" fill="url(#darkMetal)" />
                <circle cx="0" cy="0" r="3" fill="#38bdf8" filter="url(#cyanGlow)" />
              </g>

              {/* Right Shin & Calf (Curved anatomical contour tapering to ankle) */}
              <path
                d="M 206 348 C 202 370, 202 392, 206 412 L 230 412 C 234 392, 234 370, 230 348 Z"
                fill="url(#limbShading)"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              <path
                d="M 226 354 C 230 372, 230 394, 228 408"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Right Ankle Ring */}
              <rect x="204" y="408" width="30" height="5" rx="2.5" fill="url(#darkMetal)" />

              {/* Right Sneaker/Shoe (Planted flat on floor in 3D perspective) */}
              <path
                d="M 196 412 C 200 406, 238 406, 244 412 C 250 418, 246 424, 236 426 L 192 426 C 186 424, 188 418, 196 412 Z"
                fill="url(#glossyWhite)"
                stroke="#94a3b8"
                strokeWidth="1.8"
              />
              {/* Sole */}
              <path
                d="M 190 422 L 240 422 C 244 426, 238 428, 232 428 L 188 428 C 184 428, 186 424, 190 422 Z"
                fill="url(#darkMetal)"
              />
              <circle cx="218" cy="418" r="2.5" fill="#06b6d4" filter="url(#cyanGlow)" />
            </g>

            {/* ============================================================== */}
            {/* --- ARMS & HANDS (Comfortably Resting on Each Knee) --- */}
            {/* ============================================================== */}

            {/* Chair Armrests */}
            <g>
              {/* Left Armrest */}
              <path
                d="M 98 238 Q 120 230 142 242 Q 120 252 98 248 Z"
                fill="url(#woodFinish)"
                stroke="#291002"
                strokeWidth="2"
              />
              {/* Right Armrest */}
              <path
                d="M 282 238 Q 260 230 238 242 Q 260 252 282 248 Z"
                fill="url(#woodFinish)"
                stroke="#291002"
                strokeWidth="2"
              />
            </g>

            {/* --- LEFT ARM (Resting gently on Left Knee) --- */}
            <g>
              {/* Dome Shoulder Cap */}
              <path
                d="M 152 188 C 130 184, 116 196, 120 216 C 132 224, 150 220, 156 208 Z"
                fill="url(#glossyWhite)"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              <ellipse cx="136" cy="204" rx="8" ry="7" fill="url(#chromeBall)" />

              {/* Upper Arm */}
              <path
                d="M 126 214 C 118 234, 112 254, 110 268 C 122 272, 134 270, 140 262 C 140 248, 144 230, 146 216 Z"
                fill="url(#limbShading)"
                stroke="#94a3b8"
                strokeWidth="2"
              />

              {/* Elbow Joint */}
              <ellipse cx="124" cy="268" rx="9" ry="8" fill="url(#chromeBall)" stroke="#64748b" strokeWidth="1.5" />

              {/* Forearm (Angled toward the left knee) */}
              <path
                d="M 122 270 C 130 292, 140 310, 152 326 C 160 322, 162 314, 154 300 C 144 286, 136 270, 132 264 Z"
                fill="url(#limbShading)"
                stroke="#94a3b8"
                strokeWidth="2"
              />

              {/* Wrist Ring */}
              <rect x="146" y="320" width="12" height="5" rx="2" fill="url(#darkMetal)" transform="rotate(-25 146 320)" />

              {/* Left Hand resting naturally over the left knee */}
              <g transform="translate(150, 326)">
                <ellipse cx="6" cy="4" rx="9" ry="7" fill="url(#glossyWhite)" stroke="#94a3b8" strokeWidth="1.5" />
                <path
                  d="M 1 2 C 5 9, 11 9, 15 3"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="6" cy="4" r="2.5" fill="#06b6d4" />
              </g>
            </g>

            {/* --- RIGHT ARM (Resting gently on Right Knee) --- */}
            <g>
              {/* Dome Shoulder Cap */}
              <path
                d="M 228 188 C 250 184, 264 196, 260 216 C 248 224, 230 220, 224 208 Z"
                fill="url(#glossyWhite)"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              <ellipse cx="244" cy="204" rx="8" ry="7" fill="url(#chromeBall)" />

              {/* Upper Arm */}
              <path
                d="M 254 214 C 262 234, 268 254, 270 268 C 258 272, 246 270, 240 262 C 240 248, 236 230, 234 216 Z"
                fill="url(#limbShading)"
                stroke="#94a3b8"
                strokeWidth="2"
              />

              {/* Elbow Joint */}
              <ellipse cx="256" cy="268" rx="9" ry="8" fill="url(#chromeBall)" stroke="#64748b" strokeWidth="1.5" />

              {/* Forearm (Angled toward the right knee) */}
              <path
                d="M 258 270 C 250 292, 240 310, 228 326 C 220 322, 218 314, 226 300 C 236 286, 244 270, 248 264 Z"
                fill="url(#limbShading)"
                stroke="#94a3b8"
                strokeWidth="2"
              />

              {/* Wrist Ring */}
              <rect x="222" y="320" width="12" height="5" rx="2" fill="url(#darkMetal)" transform="rotate(25 222 320)" />

              {/* Right Hand resting naturally over the right knee */}
              <g transform="translate(218, 326)">
                <ellipse cx="6" cy="4" rx="9" ry="7" fill="url(#glossyWhite)" stroke="#94a3b8" strokeWidth="1.5" />
                <path
                  d="M 1 2 C 5 9, 11 9, 15 3"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="6" cy="4" r="2.5" fill="#06b6d4" />
              </g>
            </g>

            {/* Animated gesture when head falls: Body raises hands in confusion! */}
            {!isHeadAttached && (
              <g className="animate-bounce" style={{ animationDuration: "1s" }}>
                {/* Comic "question mark" or "spark" from empty neck */}
                <text
                  x="190"
                  y="125"
                  textAnchor="middle"
                  fill="#ef4444"
                  fontSize="24"
                  fontWeight="black"
                  className="animate-pulse"
                >
                  ?!
                </text>
              </g>
            )}
          </g>

          {/* 5. ARTICULATED NECK (With Snap Target Ring when dragging!) */}
          <g>
            {/* Neck Pillar */}
            <rect x="178" y="152" width="24" height="26" rx="6" fill="#0f172a" />
            <rect
              x="170"
              y="140"
              width="40"
              height="22"
              rx="7"
              fill="url(#glossyWhite)"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />

            {/* Glowing Blue LED Oval on Neck */}
            <ellipse
              cx="190"
              cy="151"
              rx="11"
              ry="6"
              fill={!isHeadAttached ? "#ef4444" : "#06b6d4"}
              filter="url(#cyanGlow)"
              className="animate-pulse"
            />

            {/* If head is detached: Neck emits cartoon electric sparks! */}
            {!isHeadAttached && (
              <g>
                <line x1="184" y1="138" x2="180" y2="128" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                <line x1="190" y1="138" x2="190" y2="124" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                <line x1="196" y1="138" x2="200" y2="128" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
              </g>
            )}

            {/* Target Snap Ring when dragging near neck */}
            {isNearNeck && (
              <g filter="url(#snapGlow)">
                <circle cx="190" cy="100" r="55" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="6 4" className="animate-spin" />
                <circle cx="190" cy="100" r="14" fill="#34d399" opacity="0.6" className="animate-ping" />
              </g>
            )}
          </g>

          {/* ============================================================== */}
          {/* 6. THE ROBOT HEAD (Interactive: Clicks, Falls, Drags, Snaps!) */}
          {/* ============================================================== */}
          <g
            ref={headRef}
            onClick={handleHeadClick}
            onMouseDown={(e) => handleStartDrag(e.clientX, e.clientY)}
            onTouchStart={(e) => {
              if (e.touches[0]) {
                handleStartDrag(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            transform={`translate(${190 + headOffset.x + (isHeadAttached ? currentPos.x * 8 : 0)}, ${
              100 + headOffset.y + (isHeadAttached ? currentPos.y * 6 : 0)
            }) rotate(${isHeadAttached ? rotateY * 0.8 : isDragging ? 15 : headState === "onGround" ? -25 : 45})`}
            className={`cursor-pointer transition-transform ${
              headState === "falling" ? "duration-75" : isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{
              transformOrigin: "center center",
            }}
          >
            {/* Antenna Sticks with Ball Tips */}
            <line x1="-36" y1="-50" x2="-48" y2="-78" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="-49" cy="-80" r="4.5" fill="#0f172a" />

            <line x1="42" y1="-50" x2="55" y2="-82" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="56" cy="-84" r="5" fill="#0f172a" />

            {/* Left Ear Disc */}
            <ellipse cx="-72" cy="0" rx="14" ry="24" fill="#0f172a" />
            <ellipse cx="-72" cy="0" rx="9" ry="16" fill="url(#glossyWhite)" />

            {/* Right Ear Disc */}
            <ellipse cx="72" cy="0" rx="14" ry="24" fill="#0f172a" />
            <ellipse cx="72" cy="0" rx="9" ry="16" fill="url(#glossyWhite)" />

            {/* Main Rounded Glossy Helmet Shell */}
            <rect
              x="-68"
              y="-56"
              width="136"
              height="112"
              rx="52"
              fill="url(#glossyWhite)"
              stroke="#94a3b8"
              strokeWidth="2.5"
            />

            {/* Forehead LED sensor dots */}
            <circle cx="-16" cy="-44" r="2.5" fill="#06b6d4" opacity="0.8" />
            <circle cx="0" cy="-46" r="3" fill="#06b6d4" opacity="0.9" />
            <circle cx="16" cy="-44" r="2.5" fill="#06b6d4" opacity="0.8" />

            {/* Black Glossy Visor Screen */}
            <rect
              x="-48"
              y="-32"
              width="96"
              height="58"
              rx="24"
              fill="url(#darkMetal)"
              stroke="#0f172a"
              strokeWidth="2"
            />

            {/* Visor Gloss Highlight */}
            <path
              d="M -40 -26 Q 0 -34 40 -26 Q 0 -22 -40 -26 Z"
              fill="rgba(255, 255, 255, 0.35)"
            />

            {/* -------------------------------------------------------- */}
            {/* VISOR EYES: EXPRESSION CHANGES BASED ON HEAD STATE! */}
            {/* -------------------------------------------------------- */}
            {isHeadAttached ? (
              // --- NORMAL HAPPY ATTACHED STATE ---
              <>
                {/* Glowing Blue Circular Eyes (Following Mouse) */}
                <g transform={`translate(${eyeShiftX}, ${eyeShiftY})`}>
                  {headState === "justSnapped" ? (
                    // Star / Happy Wink Eyes upon being saved!
                    <>
                      <path
                        d="M -30 -4 Q -22 -14 -14 -4"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter="url(#cyanGlow)"
                      />
                      <path
                        d="M 14 -4 Q 22 -14 30 -4"
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter="url(#cyanGlow)"
                      />
                    </>
                  ) : (
                    // Regular concentric glowing eyes with active white lens tracking cursor
                    <>
                      {/* Left Eye */}
                      <g>
                        <circle cx="-22" cy="-4" r="14" fill="none" stroke="#06b6d4" strokeWidth="3.5" filter="url(#cyanGlow)" />
                        <circle cx="-22" cy="-4" r="10" fill="#0284c7" opacity="0.25" />
                        {/* Inner Iris and White Lens dynamically sliding towards the cursor arrow */}
                        <g transform={`translate(${pupilTrackingX}, ${pupilTrackingY})`}>
                          <circle cx="-22" cy="-4" r="6" fill="#0369a1" />
                          <circle cx="-22" cy="-4" r="4.2" fill="#06b6d4" filter="url(#cyanGlow)" />
                          {/* Main Bright White Lens (العدسة البيضاء المتتبعة للسهم) */}
                          <circle cx="-22" cy="-4" r="3.2" fill="#ffffff" />
                          <circle cx="-20.5" cy="-5.5" r="1.4" fill="#ffffff" />
                        </g>
                      </g>

                      {/* Right Eye */}
                      <g>
                        <circle cx="22" cy="-4" r="14" fill="none" stroke="#06b6d4" strokeWidth="3.5" filter="url(#cyanGlow)" />
                        <circle cx="22" cy="-4" r="10" fill="#0284c7" opacity="0.25" />
                        {/* Inner Iris and White Lens dynamically sliding towards the cursor arrow */}
                        <g transform={`translate(${pupilTrackingX}, ${pupilTrackingY})`}>
                          <circle cx="22" cy="-4" r="6" fill="#0369a1" />
                          <circle cx="22" cy="-4" r="4.2" fill="#06b6d4" filter="url(#cyanGlow)" />
                          {/* Main Bright White Lens (العدسة البيضاء المتتبعة للسهم) */}
                          <circle cx="22" cy="-4" r="3.2" fill="#ffffff" />
                          <circle cx="23.5" cy="-5.5" r="1.4" fill="#ffffff" />
                        </g>
                      </g>
                    </>
                  )}
                </g>

                {/* Big Cheerful Smile */}
                <path
                  d={headState === "justSnapped" ? "M -26 32 Q 0 54 26 32" : "M -24 34 Q 0 48 24 34"}
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </>
            ) : (
              // --- DETACHED / FALLEN STATE: CRYING TEARS (T_T)! ---
              <>
                {/* Crying streaming blue tears */}
                <g>
                  {/* Left Crying Eye: T shape */}
                  <line x1="-30" y1="-8" x2="-14" y2="-8" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" filter="url(#cyanGlow)" />
                  <line x1="-22" y1="-8" x2="-22" y2="12" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" filter="url(#cyanGlow)" />

                  {/* Flowing Animated Teardrops */}
                  <circle cx="-22" cy="18" r="3" fill="#38bdf8" className="animate-ping" />
                  <path d="M -22 6 L -24 16 L -20 16 Z" fill="#38bdf8" />

                  {/* Right Crying Eye: T shape */}
                  <line x1="14" y1="-8" x2="30" y2="-8" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" filter="url(#cyanGlow)" />
                  <line x1="22" y1="-8" x2="22" y2="12" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" filter="url(#cyanGlow)" />

                  {/* Flowing Animated Teardrops */}
                  <circle cx="22" cy="18" r="3" fill="#38bdf8" className="animate-ping" style={{ animationDelay: "200ms" }} />
                  <path d="M 22 6 L 20 16 L 24 16 Z" fill="#38bdf8" />
                </g>

                {/* Sad Wavy Mouth */}
                <path
                  d="M -20 42 Q 0 28 20 42"
                  fill="none"
                  stroke="#0f172a"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </>
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}
