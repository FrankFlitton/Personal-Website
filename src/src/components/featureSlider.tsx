import { useEffect, useMemo, useRef, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProgressRing } from "./progressRing";
import { Preloader } from "./preloader";
import { useSwipeable } from "react-swipeable";

type FeatureSlide = {
  slug: string;
  title: string;
  description: string;
  image: string;
  color: string;
};

export const FeatureSlider = ({ slides = [] }: { slides: FeatureSlide[] }) => {
  const [activeSlide, setActiveSlide] = useState(-1);

  const interval = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  const goToProject = (index: number) => {
    router.push(`/projects/${slides[index].slug}`);
  };

  // increment activeSlide every 5 seconds
  useEffect(() => {
    // load all images, then show first slide
    const successfulSlides: boolean[] = [];
    for (let i = 0; i < slides.length; i++) {
      const img = new Image();
      img.src = slides[i].image;
      img.onload = () => {
        successfulSlides[i] = true;
        if (successfulSlides.every((slide) => slide)) {
          setTimeout(() => {
            setActiveSlide(0);
          }, 1000);
        }
      };
    }

    setTimeout(() => {
      interval.current = setInterval(() => {
        setActiveSlide((prev) => {
          if (prev === -1) return prev;
          return prev + 1;
        });
      }, 5000);
    }, 1000);

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [slides]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    if (interval.current) clearInterval(interval.current);
    interval.current = setInterval(() => {
      setActiveSlide((prev) => prev + 1);
    }, 5000);
  };

  const isLoading = useMemo(() => activeSlide === -1, [activeSlide]);

  const config = {
    delta: 10, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: true, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
  };

  const swipeProps = useSwipeable({
    onSwiped: (eventData) => {
      if (isLoading) return;
      if (eventData.dir === "Left") {
        const newVal = activeSlide - 1;
        const moduloFix = newVal < 0 ? slides.length - 1 : newVal;
        goToSlide(moduloFix);
      } else if (eventData.dir === "Right") {
        const newVal = (activeSlide + 1) % slides.length;
        goToSlide(newVal);
      }
    },
    ...config,
  });

  return (
    <div
      className="relative w-full h-[calc(100dvh-80px-1rem)] min-h-[400px] bg-black"
      {...swipeProps}
    >
      {slides.length &&
        slides.map((slide, index) => {
          return (
            <div
              key={slide.slug}
              className={`${
                activeSlide % slides.length === index
                  ? "animate-featureSliderIn"
                  : "animate-featureSliderOut"
              } ${
                activeSlide === -1 ? "hidden" : ""
              } opacity-0 absolute w-full h-[calc(100dvh-80px-1rem)] min-h-[400px] top-0 left-0 overflow-hidden bg-black`}
              style={{
                backgroundColor: slide.color,
              }}
            >
              <div
                className={`${
                  activeSlide % slides.length === index
                    ? "inset-[0rem]"
                    : "inset-[-2rem]"
                } transition-inset duration-[2000ms] absolute`}
              >
                <NextImage
                  src={slide.image}
                  alt={slide.title}
                  width={1920}
                  height={1080}
                  className="object-cover h-full"
                />
              </div>

              <div
                className={`absolute h-full top-0 left-0 bottom-0 right-0 md:right-[45%] lg:right-[60%] xl:right-[70%] text-white text-center cursor-pointer group`}
                style={{ backgroundColor: `${slide.color.toUpperCase()}DD` }}
                onClick={() => goToProject(index)}
              >
                {/* background color hover modifier */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                <div className="grid grid-rows-4 grid-flow-col gap-8 h-full p-8 z-1 relative">
                  {/* flex center */}
                  <div className="flex items-end justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold">
                      {slide.title}
                    </h2>
                  </div>
                  <div className="flex items-start justify-center">
                    <h3 className="text-2xl">{slide.description}</h3>
                  </div>
                  <div className="flex items-center justify-center">
                    {!isLoading && (
                      <ProgressRing
                        className="none sm:block"
                        activeIndex={activeSlide % slides.length}
                        markerIndex={index}
                        totalLength={slides.length}
                      />
                    )}
                  </div>
                  <div className="flex items-start justify-center">
                    <Link
                      href={`/projects/${slide.slug}`}
                      className="text-xl md:text-2xl hover:bg-white/50 text-white p-4 border-b-white border-b-2"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <ul className="absolute z-3 sm:bottom-1 right-2 hidden sm:visible sm:top-[unset] top-2 bottom-[unset] h-fit">
        {slides.length &&
          slides.map((_, index) => {
            return (
              <li
                key={index}
                role="button"
                className={`${
                  activeSlide % slides.length === index
                    ? `text-white bg-black`
                    : ""
                } w-[2rem] h-[2rem] flex hover:bg-white/30 text-center justify-center items-center transition-colors duration-200`}
                onClick={() => goToSlide(index)}
              >
                —
              </li>
            );
          })}
      </ul>

      <Preloader isActive={isLoading} className="absolute z-5 inset-0" />
    </div>
  );
};
