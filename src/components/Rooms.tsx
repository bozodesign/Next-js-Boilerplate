'use client';
import Image from 'next/image';
import {Skeleton} from "@nextui-org/react";
import { useState, useRef, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from 'src/utils/GenericFn';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoom } from '@/features/roomSlice';
import { RootState } from '@/store/store';

export const Rooms = () => {
  const dispatch = useDispatch();
  const selectedRoom = useSelector((state: RootState) => state.room.selectedRoom);

  const handleSelectRoom = (room: { name: string; name_en: string }) => {
    dispatch(selectRoom(room));
  };

  const { data, isLoading } = useSWR('/api/proxy', fetcher, {
    revalidateOnFocus: true,
  });

  const roomLists: any = data?.nextData?.props?.initialState?.header?.roomLists || [];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const handleMouseOver = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current && menuRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const menuWidth = menuRef.current.scrollWidth;
      const mouseX = e.clientX - containerRef.current.getBoundingClientRect().left;
      const centerX = containerWidth / 2;

      const maxTranslate = menuWidth - containerWidth;
      let moveAmount = -((mouseX - centerX) / centerX) * maxTranslate;

      moveAmount = Math.min(0, moveAmount);
      moveAmount = Math.max(-maxTranslate, moveAmount);

      setTranslateX(moveAmount);
    }
  };

  // Effect to handle the scroll event
  useEffect(() => {
    const handleScroll = () => {
      // Check if the page is at the top
      if (window.scrollY === 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed z-50 top-0 bg-white mt-16 w-full text-center overflow-visible transition-transform duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      ref={containerRef}
    >
      <div
        className="relative inline-block transition-transform duration-300"
        style={{ transform: `translateX(${translateX}px)` }}
        onMouseMove={handleMouseMove}
      >
        <ul className="flex items-start mt-10 mb-3 bg-black/0" ref={menuRef}>
          {isLoading && (
                Array.from({ length: 13 }).map((_, index) => (
                <li key={index*100} className="flex justify-center mx-4 flex-col items-center gap-2">     
                  <Skeleton className="rounded-full w-16 h-16"/>
                  <Skeleton className="mt-2 h-3 w-16 rounded-lg"/>
                </li>
          )))}
          {roomLists?.map((item: any, index: number) => (
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
              <div
                onClick={() => handleSelectRoom({ name: item.name, name_en: item.name_en })}
                className={`${
                  item.name_en === selectedRoom?.name_en ? 'scale-125' : 'opacity-30'
                } hover:opacity-70 transition-all duration-500 cursor-pointer`}
              >
                <Image
                  src={item.room_icon_url}
                  alt={item.name}
                  className={`${
                    item.name_en === selectedRoom?.name_en ? 'border-2 bg-indigo-900 border-indigo-700' : 'border'
                  }  rounded-full p-3`}
                  width={64}
                  height={64}
                  style={{ filter: 'invert(1)' }}
                />
                <span className="text-xs text-black">{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
