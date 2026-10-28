import React, { useEffect, useRef, useState } from "react";

const VIDEO_URL =
  "https://res.cloudinary.com/daadrhhk9/video/upload/v1791175307/Creating_seamless_looping_backgr__20261005100710_z2oog0.mp4";

const REVERSE_VIDEO_URL =
  "https://res.cloudinary.com/daadrhhk9/video/upload/v1791218384/1005_gix9el.mov";

const LOGO_URL =
  "https://res.cloudinary.com/daadrhhk9/image/upload/v1791179155/image_167_gapcww.png";

const pickles = [
  {
    name: "Mango Pickle",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791191683/Mango_Pickle_Jar_Product_Shot_nwb1pk.png",
  },
  {
    name: "Garlic Pickle",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791273036/920d3c8c-9cae-41be-bda6-a39a58428f4e_vxxevf.png",
  },
  {
    name: "Dates Pickle",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791212304/Red_Dates_Pickle_Jar_Mockup_ikufqc.png",
  },
  {
    name: "Papaya Pickle",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791290911/Papaya_Pickle_Jar_Product_Mockup_lqozdb.png",
  },
  {
    name: "Lemon Pickle",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791214098/Lemon_Pickle_Jar_Product_Cutout_ysja6d.png",
  },
  {
    name: "Tender Mango Pickle",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791272645/3a803207-4ed0-42cb-a373-43de52aa24a4_l2dt7k.png",
  },
  {
    name: "Pineapple Pickle",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791273348/da9d6b52-90ae-4362-8842-8891222b3dd6_isdfm1.png",
  },
  {
    name: "Gooseberry Pickle",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791272979/5a8578fa-eb1d-476f-88b4-0d446ef80c09_ttpiac.png",
  },
   {
    name: "Mixed Pickle",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791290303/Mixed_Pickle_Jar_Product_Shot_obot8o.png",
  },
   {
    name: "Starfruit Pickle",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791272181/aed065e0-3fad-47ea-915f-d0138b56c1da_v90dzw.png",
  },
 
  {
    name: "Beef Pickle",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791187323/image_72_1_kvnijf.png",
  },

  {
    name: "Fish Pickle",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791187430/image_73_1_ln5mdk.png",
  },
   {
    name: "Chicken Pickle",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791187316/image_71_dka5ik.png",
  },
  {
    name: "Prawns Pickle",
    image:
      "https://res.cloudinary.com/daadrhhk9/image/upload/v1791272136/70aed36a-2772-4d1b-be15-836193a12b82_iiydqs.png",
  },
];

export default function App() {
  const videoRef = useRef(null);
  const reverseVideoRef = useRef(null);
  const containerRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [centerMousePos, setCenterMousePos] = useState({
    x: 0,
    y: 0,
  });

  const [activeVideo, setActiveVideo] = useState(1);

  const isAnimatingRef = useRef(false);

  // ==================================================
  // SEAMLESS VIDEO LOOP
  // VIDEO 1 → VIDEO 2 → VIDEO 1 → VIDEO 2
  // ==================================================

  useEffect(() => {
    const video1 = videoRef.current;
    const video2 = reverseVideoRef.current;

    if (!video1 || !video2) return;

    const speed = 0.9;

    video1.muted = true;
    video2.muted = true;

    video1.playsInline = true;
    video2.playsInline = true;

    video1.playbackRate = speed;
    video2.playbackRate = speed;

    let switching = false;

    const switchToVideo2 = () => {
      if (switching) return;

      switching = true;

      video2.currentTime = 0;
      video2.playbackRate = speed;

      const start = () => {
        video1.pause();

        setActiveVideo(2);

        video2.play().catch(() => {});

        switching = false;
      };

      if (video2.readyState >= 3) {
        start();
      } else {
        video2.addEventListener(
          "canplay",
          start,
          { once: true }
        );
      }
    };

    const switchToVideo1 = () => {
      if (switching) return;

      switching = true;

      video1.currentTime = 0;
      video1.playbackRate = speed;

      const start = () => {
        video2.pause();

        setActiveVideo(1);

        video1.play().catch(() => {});

        switching = false;
      };

      if (video1.readyState >= 3) {
        start();
      } else {
        video1.addEventListener(
          "canplay",
          start,
          { once: true }
        );
      }
    };

    const handleVideo1Ended = () => {
      switchToVideo2();
    };

    const handleVideo2Ended = () => {
      switchToVideo1();
    };

    video1.addEventListener(
      "ended",
      handleVideo1Ended
    );

    video2.addEventListener(
      "ended",
      handleVideo2Ended
    );

    // Start first video
    video1.currentTime = 0;
    video1.play().catch(() => {});

    return () => {
      video1.removeEventListener(
        "ended",
        handleVideo1Ended
      );

      video2.removeEventListener(
        "ended",
        handleVideo2Ended
      );

      video1.pause();
      video2.pause();
    };
  }, []);

  // ==================================================
  // CHANGE PICKLE
  // ==================================================

  const changePickle = (direction) => {
    if (isAnimatingRef.current) return;

    setCurrent((prev) => {
      const next = prev + direction;

      if (next >= 0 && next < pickles.length) {
        isAnimatingRef.current = true;

        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 700);

        return next;
      }

      return prev;
    });
  };

  const nextPickle = () => {
    changePickle(1);
  };

  const previousPickle = () => {
    changePickle(-1);
  };

  // ==================================================
  // WHEEL
  // ==================================================

  useEffect(() => {
    const node = containerRef.current;

    if (!node) return;

    const handleWheel = (e) => {
      const primaryDelta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY)
          ? e.deltaX
          : e.deltaY;

      if (Math.abs(primaryDelta) > 12) {
        e.preventDefault();

        if (primaryDelta > 0) {
          previousPickle();
        } else {
          nextPickle();
        }
      }
    };

    node.addEventListener(
      "wheel",
      handleWheel,
      {
        passive: false,
      }
    );

    return () => {
      node.removeEventListener(
        "wheel",
        handleWheel
      );
    };
  }, []);

  // ==================================================
  // TOUCH
  // RIGHT SWIPE → LEFT ITEM
  // LEFT SWIPE  → RIGHT ITEM
  // ==================================================

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;

    const endX = e.changedTouches[0].clientX;
    const difference = touchStartX - endX;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        nextPickle();
      } else {
        previousPickle();
      }
    }

    setTouchStartX(null);
  };

  // ==================================================
  // MOUSE DRAG
  // ==================================================

  const handleMouseDown = (e) => {
    setTouchStartX(e.clientX);
  };

  const handleMouseUp = (e) => {
    if (touchStartX === null) return;

    const difference = touchStartX - e.clientX;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        nextPickle();
      } else {
        previousPickle();
      }
    }

    setTouchStartX(null);
  };

  // ==================================================
  // CENTER BOTTLE MOUSE EFFECT
  // ==================================================

  const handleCenterMouseMove = (e) => {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const xVal =
      e.clientX -
      rect.left -
      rect.width / 2;

    const yVal =
      e.clientY -
      rect.top -
      rect.height / 2;

    const x =
      (xVal / (rect.width / 2)) * 15;

    const y =
      (yVal / (rect.height / 2)) * -15;

    setCenterMousePos({
      x,
      y,
    });
  };

  const handleCenterMouseLeave = () => {
    setCenterMousePos({
      x: 0,
      y: 0,
    });
  };

  return (
    <main
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="relative w-screen h-screen overflow-hidden bg-black select-none cursor-grab active:cursor-grabbing"
    >
      {/* ==================================================
          BACKGROUND VIDEO
      ================================================== */}

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-black">

        {/* VIDEO 1 */}

        <video
          ref={videoRef}
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: activeVideo === 1 ? 1 : 0,
            visibility:
              activeVideo === 1
                ? "visible"
                : "hidden",
            zIndex: activeVideo === 1 ? 2 : 1,
            pointerEvents: "none",
          }}
        />

        {/* VIDEO 2 */}

        <video
          ref={reverseVideoRef}
          src={REVERSE_VIDEO_URL}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: activeVideo === 2 ? 1 : 0,
            visibility:
              activeVideo === 2
                ? "visible"
                : "hidden",
            zIndex: activeVideo === 2 ? 2 : 1,
            pointerEvents: "none",
          }}
        />
      </div>

      <div className="absolute inset-0 bg-black/10 z-[1] pointer-events-none" />

      {/* ==================================================
          HEADER
      ================================================== */}

      <header className="absolute top-0 left-0 w-full z-30 px-5 md:px-6 lg:px-11 py-5 md:py-6 flex items-center justify-between text-white">

        {/* DESKTOP LOGO / MOBILE HIDDEN */}

        <div className="hidden md:block text-center text-3xl md:text-2xl font-extrabold tracking-tight">
         <p>KE TASTE</p>
         
        </div>

        {/* MOBILE MENU ICON */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((prev) => !prev);
          }}
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
        >
          <span
            className={`w-5 h-[1.5px] bg-white transition-transform duration-300 ${
              menuOpen
                ? "rotate-45 translate-y-[4px]"
                : ""
            }`}
          />

          <span
            className={`w-5 h-[1.5px] bg-white transition-opacity duration-300 ${
              menuOpen
                ? "opacity-0"
                : "opacity-100"
            }`}
          />

          <span
            className={`w-5 h-[1.5px] bg-white transition-transform duration-300 ${
              menuOpen
                ? "-rotate-45 -translate-y-[4px]"
                : ""
            }`}
          />
        </button>

        {/* DESKTOP NAV */}

        <nav className="hidden md:flex items-center gap-8 text-lg">
          <span>Home</span>
          <span>About</span>
          <span>Prodects</span>
          <span>Contact</span>
        </nav>

        {/* LOGO */}

        <div className="flex items-center justify-center">
          <img
            src={LOGO_URL}
            alt="Logo"
            className="w-14 lg:w-18 h-auto object-contain"
          />
        </div>
      </header>

      {/* ==================================================
          MOBILE MENU
      ================================================== */}

      <div
        className={`absolute top-[72px] left-4 right-4 z-25 md:hidden transition-all duration-300 ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-5 flex flex-col gap-5 text-white text-sm">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </div>

      {/* ==================================================
          MAIN CAROUSEL
      ================================================== */}

      <section className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
        <div
          className="
            relative
            w-full
            max-w-7xl
            h-[430px]
            md:h-[550px]
            flex
            items-center
            justify-center
          "
        >
          {pickles.map((pickle, index) => {
            const offset = index - current;

            /*
             * DESKTOP
             */

            const desktopX = -offset * 480;

            const desktopY =
              offset * 100 +
              Math.pow(
                Math.abs(offset),
                1.2
              ) *
                29;

            /*
             * MOBILE
             */

            const mobileX = -offset * 200;

            const mobileY =
              offset * 35 +
              Math.pow(
                Math.abs(offset),
                1.2
              ) *
                90;

            const x = desktopX;
            const y = desktopY;

            const scale =
              offset === 0
                ? 1
                : 0.62 -
                  Math.min(
                    Math.abs(offset) * 0.08,
                    0.2
                  );

            /*
             * MOBILE BOTTLE SIZE
             */

            const mobileScale =
              offset === 0
                ? 0.70
                : 0.30;

            const zIndex =
              20 - Math.abs(offset);

            const rotation = offset * 6;

            const opacity =
              Math.abs(offset) > 2.2
                ? 0
                : 1;

            const baseSize = 400;

            const currentSize =
              baseSize * scale;

            const mobileSize =
              baseSize * mobileScale;

            const isCenter =
              offset === 0;

            return (
              <div
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(index);
                }}
                onMouseMove={
                  isCenter
                    ? handleCenterMouseMove
                    : undefined
                }
                onMouseLeave={
                  isCenter
                    ? handleCenterMouseLeave
                    : undefined
                }
                className="absolute flex items-center justify-center cursor-pointer transition-all duration-700 ease-out group"
                style={{
                  width: `${currentSize}px`,
                  height: `${currentSize}px`,

                  "--mobile-x": `${mobileX}px`,
                  "--mobile-y": `${mobileY}px`,
                  "--mobile-size": `${mobileSize}px`,

                  transform: `
                    translate(${x}px, ${y}px)
                    rotate(${rotation}deg)
                    ${
                      isCenter
                        ? `
                          perspective(1000px)
                          rotateX(${centerMousePos.y}deg)
                          rotateY(${centerMousePos.x}deg)
                        `
                        : ""
                    }
                  `,

                  zIndex,
                  opacity,

                  filter: isCenter
                    ? "brightness(1) contrast(1)"
                    : "brightness(0.6) contrast(0.8) saturate(0.8)",
                }}
              >
                {/* CENTER SHADOW */}

                {isCenter && (
                  <>
                    <div className="absolute -bottom-19 w-3/4 h-8 bg-black/85 rounded-[100%] filter blur-md pointer-events-none transition-all duration-700" />

                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 via-transparent to-amber-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none filter blur-xl" />
                  </>
                )}

                {/* BOTTLE */}

                <img
                  src={pickle.image}
                  alt={pickle.name}
                  draggable="false"
                  className={`w-[95%] h-[95%] object-contain pointer-events-none ${
                    isCenter
                      ? "animate-bottle-float drop-shadow-[0_30px_25px_rgba(0,0,0,0.35)]"
                      : "drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)]"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================
          PICKLE NAME
      ================================================== */}

      <div className="absolute left-1/2 -translate-x-1/2 bottom-[160px] md:bottom-18 z-20 text-white text-center pointer-events-none w-full px-4">
        <h1
          key={current}
          className="text-2xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
        >
          {pickles[current].name}
        </h1>
      </div>

      {/* ==================================================
          DESCRIPTION
      ================================================== */}

      <div className="absolute left-1/2 -translate-x-1/2 bottom-[90px] md:left-6 md:translate-x-0 md:bottom-8 lg:left-16 lg:bottom-12 z-20 text-white text-center md:text-left max-w-[300px] md:max-w-[280px]">
        <p className="mt-2 md:mt-3 text-xs md:text-sm lg:text-base leading-relaxed">
          Traditional flavors crafted with carefully selected ingredients
          for an unforgettable homemade taste.
        </p>
      </div>

      {/* ==================================================
          NAVIGATION
      ================================================== */}

      <div className="absolute left-1/2 -translate-x-1/2 bottom-7 md:left-auto md:translate-x-0 md:right-6 md:bottom-8 lg:right-16 lg:bottom-12 z-20 text-white flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            previousPickle();
          }}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/40 flex items-center justify-center hover:bg-white hover:text-black transition"
        >
          ←
        </button>

        <span className="text-xs md:text-sm">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(pickles.length).padStart(2, "0")}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextPickle();
          }}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/40 flex items-center justify-center hover:bg-white hover:text-black transition"
        >
          →
        </button>
      </div>

      {/* ==================================================
          BOTTOM SWIPE TEXT
      ================================================== */}

      <div className="hidden md:block absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-white/70 text-[10px] uppercase tracking-[0.25em]">
        Scroll or Swipe to Navigate
      </div>

      {/* ==================================================
          ANIMATIONS
      ================================================== */}

      <style>{`
        @keyframes bottleFloat {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        .animate-bottle-float {
          animation: bottleFloat 4s ease-in-out infinite;
        }

        @media (max-width: 767px) {
          .group {
            width: var(--mobile-size) !important;
            height: var(--mobile-size) !important;

            transform:
              translate(
                var(--mobile-x),
                var(--mobile-y)
              )
              rotate(0deg) !important;
          }
        }
      `}</style>
    </main>
  );
}