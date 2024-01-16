import { useEffect, useState } from "react";

export const DialogSlider = ({
  images = [],
  descriptions = [],
  openToIndex = 0,
  onClose,
}: {
  images: string[];
  descriptions: string[];
  openToIndex: number;
  onClose: (i: number) => void;
}) => {
  const [imageIndex, setImageIndex] = useState<number>(openToIndex);

  useEffect(() => {
    setImageIndex(openToIndex);
  }, [openToIndex]);

  const goToImage = (index: number) => {
    setImageIndex(index);
  };

  // esc key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setImageIndex(-1);
        onClose(-1);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return (
    <dialog
      className={`dialog fixed top-0 left-0 right-0 z-50 bg-white w-full h-[100dvh]
        ${imageIndex > -1 ? `opacity-100` : `opacity-0`}
        `}
      open={imageIndex > -1}
    >
      {images.map((image, index) => {
        return (
          <div
            key={`dialog-slider-${image}`}
            className={`${
              imageIndex % images.length === index && imageIndex > -1
                ? "animate-featureSliderIn"
                : "animate-featureSliderOut"
            } ${
              imageIndex === -1 ? "hidden opacity-0" : " opacity-100"
            } absolute w-full h-[calc(100dvh-80px)] hzphone:h-full min-h-[400px] top-[calc(80px)] hzphone:top-0 left-0 right-0 overflow-hidden bg-black`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="absolute top-0 left-0 w-full h-full object-contain p-4 bg-black"
              src={image}
              alt={descriptions[index]}
              onClick={() => goToImage((index + 1) % images.length)}
            />
          </div>
        );
      })}

      {/* Index */}
      <div className="absolute top-0 left-0 z-50 p-4 text-sm text-white block">
        <div className="bg-black w-[48px] h-[48px] relative">
          <div className="text-center top-1 left-1 absolute right-6">
            {imageIndex + 1}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            /
          </div>
          <div className="text-center bottom-1 right-1 absolute left-6">
            {images.length}
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 left-2 right-2 w-full text-white flex">
        <p className="flex m-auto object-center bg-black/50 p-2 text-center">
          {imageIndex > -1 && !!descriptions.length && (
            <span>{descriptions[imageIndex]}</span>
          )}
        </p>
      </div>

      <ul className="absolute z-3 top-[80px] bottom-0 right-0 h-fit my-auto">
        {images.length &&
          images.map((image, index) => {
            return (
              <li
                key={`dialog-slider-index-${image}`}
                role="button"
                className={`${
                  imageIndex % images.length === index
                    ? `text-white bg-black`
                    : "text-white/50"
                } w-[2rem] h-[2rem] flex hover:bg-white/30 text-center justify-center items-center transition-colors duration-200`}
                onClick={() => goToImage(index)}
              >
                —
              </li>
            );
          })}
      </ul>

      {/* Close Button */}
      <button
        className="absolute top-0 right-0 h-[80px] px-7 text-3xl text-black bg-white"
        onClick={() => {
          setImageIndex(-1);
          onClose(-1);
        }}
      >
        &times;
      </button>
    </dialog>
  );
};
