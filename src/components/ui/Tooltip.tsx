import { ReactNode, useState } from "react";

export function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute right-full ml-2 w-32 p-2 text-lg bg-black text-white rounded shadow-lg text-center dark:bg-white dark:text-black">
          {text}
        </div>
      )}
    </div>
  );
}
