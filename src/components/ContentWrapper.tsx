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
  images: string[];
  cardsContent: {
    password: string;
    keyword: string;
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
        className=" grid h-fit grid-cols-1 place-items-center content-center gap-8  lg:grid-cols-2 lg:grid-rows-2 lg:gap-24"
        variants={wrapper}
        initial="hidden"
        animate="visible"
      >
        {images.map((image, index) => (
          <ImageCard
            key={index}
            password={cardsContent[index].password}
            keyword={cardsContent[index].keyword}
            cardTitle={String(index + 1)}
            custom={index}
            variants={initialCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <img
              src={image}
              className="h-full w-full object-contain"
              alt=""
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
