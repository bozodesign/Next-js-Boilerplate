// components/Menu.tsx
'use client';
import Image from 'next/image';
import { useState, useRef } from 'react';
import useSWR from 'swr';
import { fetcher } from 'src/utils/GenericFn'
export const Rooms = () => {

  const { data, isLoading } = useSWR('/api/proxy', fetcher, {
    revalidateOnFocus: true,
  });

  const roomLists:any = data?.nextData?.props?.initialState?.header?.roomLists || []

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const handleMouseOver = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(null);
  };

  // Handle the mouse movement to slide the menu
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current && menuRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const menuWidth = menuRef.current.scrollWidth;
      const mouseX = e.clientX - containerRef.current.getBoundingClientRect().left;
      const centerX = containerWidth / 2;

      // Calculate translate amount, moving in the opposite direction of mouse movement
      const maxTranslate = menuWidth - containerWidth;
      let moveAmount = -((mouseX - centerX) / centerX) * maxTranslate;

      // Boundary checks
      moveAmount = Math.min(0, moveAmount); // Prevent sliding too far left
      moveAmount = Math.max(-maxTranslate, moveAmount); // Prevent sliding too far right

      setTranslateX(moveAmount);
    }
  };

  return (
    <div className="fixed z-50 top-0 bg-white mt-16 w-full text-center overflow-visible transition-all duration-500" ref={containerRef}>
      <div
        className="relative inline-block transition-transform duration-300"
        style={{ transform: `translateX(${translateX}px)` }}
        onMouseMove={handleMouseMove}
      >
        <ul className="flex items-start mt-10 mb-3 bg-black/0" ref={menuRef}>
        {isLoading && <Image
                className="transition-all"
                src="/img/loading.svg"
                alt="L o a d i n g . . . "
                width="100"
                height="100"
            />}
          {roomLists?.map((item:any, index:number) => (
            <li
              key={item.name}
              className={`flex justify-center w-20 p-0 hover:mx-5 transition-all duration-500 ${
                hoveredIndex === index
                  ? 'scale-150 z-10'
                  : hoveredIndex === index - 1 || hoveredIndex === index + 1
                  ? 'scale-110'
                  : ''
              }`}
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={handleMouseOut}
            >
              <a href={item.link_url} target="_blank" rel="noopener noreferrer" className='opacity-30 hover:opacity-70 transition-all duration-500'>
                <Image
                  src={item.room_icon_url}
                  alt={item.name}
                  className="border rounded-full p-3 "
                  width={64}
                  height={64}
                  style={{ filter: 'invert(1)' }}
                />
                <span className="text-xs text-black">
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};