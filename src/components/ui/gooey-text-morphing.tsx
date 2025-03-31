"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TextConfig {
  text: string;
  mobileSize: string;
  desktopSize: string;
}

interface GooeyTextProps {
  texts: TextConfig[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1.50,
  cooldownTime = 3.50,
  className,
  textClassName
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!text1Ref.current || !text2Ref.current) return;

    // Initialize with first two texts
    text1Ref.current.textContent = texts[0].text;
    text2Ref.current.textContent = texts[1].text;
    
    let textIndex = 0;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    function animate() {
      requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length].text;
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length].text;
            
            // Update text sizes
            const currentText = texts[textIndex % texts.length];
            const nextText = texts[(textIndex + 1) % texts.length];
            
            text1Ref.current.style.fontSize = `clamp(${currentText.mobileSize}, 5vw, ${currentText.desktopSize})`;
            text2Ref.current.style.fontSize = `clamp(${nextText.mobileSize}, 5vw, ${nextText.desktopSize})`;
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    const animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div className={cn("relative w-full", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center w-full h-full"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center",
            "text-black",
            textClassName
          )}
          style={{ 
            fontSize: `clamp(${texts[0].mobileSize}, 5vw, ${texts[0].desktopSize})`,
            lineHeight: 1.2
          }}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center",
            "text-black",
            textClassName
          )}
          style={{ 
            fontSize: `clamp(${texts[1].mobileSize}, 5vw, ${texts[1].desktopSize})`,
            lineHeight: 1.2
          }}
        />
      </div>
    </div>
  );
}