import { MotionConfig, motion, HTMLMotionProps, Variants } from "framer-motion";
import ImageCard from "./ImageCard";

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
};
type ContentWrapperProps = HTMLMotionProps<"div"> & {
  children?: React.ReactNode;
  images: { src: string; alt: string }[];
  cardsContent: {
    passwordKey: 0 | 1 | 2 | 3;
  }[];
};

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
  images,
  cardsContent,
  ...props
}) => {
  return (
    <MotionConfig reducedMotion={"user"}>
      <motion.div
        {...props}
        className="grid h-fit max-h-screen min-w-full grid-cols-1 place-items-center justify-center gap-8 overflow-y-auto overflow-x-hidden lg:absolute lg:grid-cols-[repeat(2,min-content)] lg:grid-rows-2 lg:gap-[6rem_6rem] lg:overflow-hidden lg:px-48 xl:gap-[6rem_10rem] "
        variants={wrapper}
        initial="hidden"
        animate="visible"
      >
        {images.map(({ src, alt }, index) => (
          <ImageCard
            key={index}
            passwordKey={cardsContent[index].passwordKey}
            cardTitle={`${index + 1}º`}
            custom={index}
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
    </MotionConfig>
  );
};
export default ContentWrapper;
