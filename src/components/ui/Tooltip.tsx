import { ReactNode, useState } from "react";

export function Tooltip({ children, text }: { children: ReactNode; text: string }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-10 right-full mr-2 px-3 py-2 text-sm bg-black text-white rounded-md shadow-lg dark:bg-white dark:text-black">
          <div className="whitespace-nowrap">{text}</div>
        </div>
      )}
    </div>
  );
}