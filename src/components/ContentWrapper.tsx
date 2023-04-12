import {
  MotionConfig,
  motion,
  HTMLMotionProps,
  Variants,
  AnimatePresence,
} from "framer-motion";
import ImageCard from "./ImageCard";
import { useState } from "react";
const EXIT_DELAY = 0.75;

const initialCard: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    translateX: index % 2 === 0 ? "-200%" : "200%",
  }),
  visible: {
    opacity: [0, 0, 1, 1],
    translateX: 0,
    transition: {
      type: "spring",
      duration: 2.75,
      stiffness: 100,
      bounce: 0.25,
      damping: 14,
    },
  },
};

const wrapper: Variants = {
  hidden: {},
  visible: {
    transition: {
      duration: 5,

      staggerChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      delay: EXIT_DELAY,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};
type ContentWrapperProps = HTMLMotionProps<"div"> & {
  children?: React.ReactNode;
  images: { src: string; alt: string }[];
  cardsContent: {
    passwordKey: 0 | 1 | 2 | 3;
  }[];
};

const keyword = import.meta.env.PUBLIC_CODIGO;

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  images,
  cardsContent,
  ...props
}) => {
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(
    Array.from({ length: images.length }, () => false)
  );

  const handleSuccessfullGuess = (passwordKey: number) => {
    setIsPasswordCorrect((prev) => {
      const newArr = [...prev];
      newArr[passwordKey] = true;
      return newArr;
    });
  };
  return (
    <MotionConfig reducedMotion={"user"}>
      <AnimatePresence>
        {isPasswordCorrect.every((value) => value) ? (
          <motion.div
            key="keyword-text"
            className="absolute inset-0 z-50 flex items-center justify-center text-[12rem] font-bold text-white"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.8,
              delay: EXIT_DELAY * 1.5,
            }}
          >
            {keyword}
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            {...props}
            className="grid h-fit max-h-screen min-w-full grid-cols-1 place-items-center justify-center gap-8 overflow-y-auto overflow-x-hidden lg:absolute lg:grid-cols-[repeat(2,min-content)] lg:grid-rows-2 lg:gap-[6rem_6rem] lg:overflow-hidden lg:px-48 xl:gap-[6rem_10rem] "
            variants={wrapper}
            initial="hidden"
            animate="visible"
            exit={"exit"}
          >
            {images.map(({ src, alt }, index) => (
              <ImageCard
                key={index}
                passwordKey={cardsContent[index].passwordKey}
                cardTitle={`${index + 1}º`}
                custom={index}
                onSuccessfullGuess={() => handleSuccessfullGuess(index)}
                variants={initialCard}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <img
                  src={src}
                  className="h-full w-full object-cover"
                  alt={alt}
                  width={380}
                  height={240}
                />
              </ImageCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
};
export default ContentWrapper;
