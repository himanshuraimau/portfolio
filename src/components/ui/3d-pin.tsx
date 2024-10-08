import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  return (
    <Link
      className={cn(
        "relative group/pin cursor-pointer",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={href ?? "/"}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl  bg-white dark:bg-black border border-gray-400 dark:border-gray-700 group-hover/pin:border-gray-500 dark:group-hover/pin:border-gray-500 transition duration-700 overflow-hidden shadow-[0_8px_16px_rgba(0,0,0,0.1),_0_-1px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.2),_0_-1px_16px_rgba(0,0,0,0.2)]"
        >
          <div className={cn("relative", className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} href={href} />
    </Link>
  );
};

export const PinPerspective = ({
  title,
  href,
}: {
  title?: string;
  href?: string;
}) => {
  return (
    <motion.div className="pointer-events-none w-96 h-80 flex items-center justify-center opacity-0 group-hover/pin:opacity-100 transition duration-500">
      <div className="w-full h-full -mt-7 flex-none inset-0">
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <a
            href={href}
            target={"_blank"}
            className="relative flex space-x-2 items-center rounded-full bg-white dark:bg-black py-1 px-4 ring-1 ring-gray-300 dark:ring-gray-700 hover:ring-gray-500 dark:hover:ring-gray-500 transition-all duration-300"
          >
            <span className="relative text-black dark:text-gray-100 text-sm font-bold inline-block py-0.5">
              {title}
            </span>

            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-gray-300/0 via-gray-300/90 to-gray-300/0 dark:from-gray-900/0 dark:via-gray-900/90 dark:to-gray-900/0 transition-opacity duration-500 group-hover/btn:opacity-60"></span>
          </a>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          {[0, 2, 4].map((delay) => (
            <motion.div
              key={delay}
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: delay,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-white/[0.08] dark:bg-gray-900/[0.08] shadow-[0_8px_16px_rgba(0,0,0,0.4)] dark:shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
            />
          ))}
        </div>

        <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-gray-300 dark:to-gray-900 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
        <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-gray-300 dark:to-gray-900 translate-y-[14px] w-px h-20 group-hover/pin:h-40" />
        <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-gray-300 dark:bg-gray-900 translate-y-[14px] w-[4px] h-[4px] rounded-full blur-[3px]" />
        <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-gray-300 dark:bg-gray-900 translate-y-[14px] w-[2px] h-[2px] rounded-full" />
      </div>
    </motion.div>
  );
};
