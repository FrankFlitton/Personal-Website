import NextImage from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProgressRing } from "./progressRing";
import { act } from "react-dom/test-utils";
import Link from "next/link";

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
          return (prev + 1) % slides.length;
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
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const isLoading = activeSlide === -1;

  return (
    <div className="relative w-full h-[calc(100dvh-80px-1rem)] mb-4 bg-black">
      {slides.length &&
        slides.map((slide, index) => {
          return (
            <div
              key={slide.slug}
              className={`${
                activeSlide === index
                  ? "animate-featureSliderIn"
                  : "animate-featureSliderOut"
              } ${
                activeSlide === -1 ? "hidden" : "visible"
              } opacity-0 absolute w-full h-[calc(100dvh-80px-1rem)] top-0 left-0 overflow-hidden bg-black`}
              style={{
                backgroundColor: slide.color,
              }}
            >
              <div
                className={`${
                  activeSlide === index ? "inset-[0rem]" : "inset-[-2rem]"
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
                className="absolute h-full top-0 left-0 bottom-0 right-0 md:right-[45%] lg:right-[60%] xl:right-[70%] bg-black text-white text-center"
                style={{ backgroundColor: `${slide.color}DD` }}
              >
                <div className="grid grid-rows-4 grid-flow-col gap-8 h-[75%] p-8 mt-[12.5%]">
                  {/* flex center */}
                  <div className="flex items-end justify-center">
                    <h2 className="text-5xl md:text-4xl font-bold">
                      {slide.title}
                    </h2>
                  </div>
                  <div className="flex items-start justify-center">
                    <h3 className="text-3xl md:text-2xl">
                      {slide.description}
                    </h3>
                  </div>
                  <div className="flex items-center justify-center">
                    {!isLoading && (
                      <ProgressRing
                        activeIndex={activeSlide}
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

      <ul className="absolute z-3 bottom-1 right-2">
        {slides.length &&
          slides.map((slide, index) => {
            return (
              <li
                key={index}
                role="button"
                className={`${
                  activeSlide === index ? `text-white bg-black` : ""
                } w-[2rem] h-[2rem] flex hover:bg-white/30 text-center justify-center items-center transition-colors duration-200`}
                onClick={() => goToSlide(index)}
              >
                —
              </li>
            );
          })}
      </ul>

      {isLoading && (
        <div className="absolute z-5 bottom-1 left-1 bg-black">Loading...</div>
      )}
    </div>
  );
};
