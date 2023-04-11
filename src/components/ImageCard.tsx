import { useId, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  Variants,
  HTMLMotionProps,
} from "framer-motion";
type ImageCardProps = HTMLMotionProps<"div"> & {
  children?: React.ReactNode;
  passwordKey: 0 | 1 | 2 | 3;

  cardTitle: string;
};

const cardVariants: Variants = {
  imageShown: {
    scale: 1,
    rotateY: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
  },
  contentShown: {
    rotateY: 180,
    scale: 1,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
  },
};
const initialFilter = "blur(0) brightness(1) saturate(1)";
const finalFilter = "blur(15px) brightness(0.4) saturate(0.6)";
const imageVariants: Variants = {
  imageShown: {
    filter: [finalFilter, initialFilter, initialFilter, initialFilter],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      times: [0, 0.5, 0.5, 1],
    },
  },
  contentShown: {
    filter: [initialFilter, finalFilter, finalFilter, finalFilter],
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      when: "false",
      times: [0, 0.5, 0.5, 1],
    },
  },
};
const passwordValues = [
  import.meta.env.PUBLIC_DESAFIO_1,
  import.meta.env.PUBLIC_DESAFIO_2,
  import.meta.env.PUBLIC_DESAFIO_3,
  import.meta.env.PUBLIC_DESAFIO_4,
];
const keywordValues = [
  import.meta.env.PUBLIC_RESPOSTA_1,
  import.meta.env.PUBLIC_RESPOSTA_2,
  import.meta.env.PUBLIC_RESPOSTA_3,
  import.meta.env.PUBLIC_RESPOSTA_4,
];
const ImageCard: React.FC<ImageCardProps> = ({
  passwordKey,
  cardTitle,

  children,
  ...props
}) => {
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isPasswordCracked, setIsPasswordCracked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const passwordInput = useRef<HTMLInputElement>(null);
  const id = useId();
  const keyword = keywordValues[passwordKey];

  const handleImageClick = () => {
    setIsImageSelected((prev) => !prev);
  };

  const handleGuessPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const password = (passwordValues[passwordKey] as string)
      .toLocaleLowerCase("pt-BR")
      .split(",");
    if (
      password.some(
        (pass) =>
          pass.toLocaleLowerCase("pt-BR") ===
          passwordInput.current?.value.toLocaleLowerCase("pt-BR")
      )
    ) {
      setIsPasswordCracked(true);
    } else {
      setErrorMessage("Senha Incorreta");
      passwordInput.current?.focus();
      if (passwordInput.current?.value) passwordInput.current.value = "";
    }
  };
  return (
    <motion.div {...props}>
      <motion.div
        animate={isImageSelected ? "contentShown" : "imageShown"}
        variants={cardVariants}
        className={
          "relative isolate m-4 flex aspect-[14/10] max-h-[320px] w-[80vw]  max-w-[520px]  overflow-hidden rounded-xl border-none border-gray-800 bg-gray-400 bg-opacity-10 p-4 text-white shadow-2xl lg:w-[40vw]"
        }
      >
        <AnimatePresence mode="sync">
          {!!isImageSelected && !!isPasswordCracked ? (
            <motion.div
              key="Password-Cracked"
              initial={{
                translateX: "100%",
                opacity: 1,
                rotateY: 180,
              }}
              animate={{
                translateX: 0,
                opacity: [0, 1, 1, 1],
              }}
              exit={{
                translateX: "-100%",
                opacity: [1, 0, 0, 0],
              }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                times: [0, 0.5, 0.5, 1],
              }}
              className="pointer-events-none absolute inset-0 z-10 m-auto flex h-full w-full flex-col items-center justify-center text-5xl"
            >
              <span className="absolute top-4 left-0 right-0 row-span-1 m-auto flex justify-center justify-self-start text-3xl font-normal ">
                {cardTitle}
              </span>
              <span className="text-9xl font-bold">{keyword}</span>
            </motion.div>
          ) : !!isImageSelected ? (
            <motion.div
              key="Enter-Password"
              initial={{
                translateX: "100%",
                rotateY: 180,
                opacity: 0,
              }}
              animate={{
                translateX: 0,
                opacity: [0, 1, 1, 1],
              }}
              exit={{
                translateX: "-100%",
                opacity: [1, 0, 0, 0],
              }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                times: [0, 0.5, 0.5, 1],
              }}
              className="pointer-events-none absolute inset-0 m-auto grid h-full w-full grid-rows-4 items-center justify-center gap-16 py-4 
              text-xl font-semibold lg:text-2xl"
            >
              <span className="row-span-1 m-auto flex justify-center justify-self-start text-3xl font-normal">
                {cardTitle}
              </span>
              <form
                onSubmit={(e) => handleGuessPassword(e)}
                className="pointer-events-none absolute inset-0 top-8 row-span-3 m-auto flex flex-col items-center justify-center gap-4 self-start px-4 lg:px-16 "
              >
                <label htmlFor={`${id}-input`} className="pointer-events-auto">
                  Digite a Palavra Chave
                </label>
                <div className="pointer-events-auto flex w-full justify-center gap-4 rounded px-2 py-1 align-middle">
                  <input
                    id={`${id}-input`}
                    type="text"
                    ref={passwordInput}
                    className={`pointer-events-auto w-full rounded px-2 py-1 text-black outline-none outline-2 outline-offset-2 focus-visible:outline-gray-200  ${
                      errorMessage
                        ? "border-2 border-solid border-red-500 focus-visible:outline-none focus-visible:outline-red-500"
                        : ""
                    }}`}
                  />
                  <button
                    type="submit"
                    className="pointer-events-all flex aspect-square h-full items-center text-2xl text-white"
                  >
                    &#10148;
                  </button>
                </div>
                <span className="-mt-2 min-h-[24px] self-start text-base text-red-500">
                  {errorMessage}
                </span>
              </form>
            </motion.div>
          ) : (
            <></>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => handleImageClick()}
          type="button"
          variants={imageVariants}
          initial={{
            filter: initialFilter,
          }}
          className="text absolute inset-0 -z-10 m-auto flex  items-center justify-center object-contain"
        >
          {children}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ImageCard;
