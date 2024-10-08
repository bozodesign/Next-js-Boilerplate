'use client'
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from 'src/utils/GenericFn'
import Realtime from '@/components/Realtime';
import Pick from '@/components/Pick';
import Hitz from '@/components/Hitz';
import RoomData from '@/components/RoomData';
import { FaAngleDoubleUp,FaAngleDoubleDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

export default function Index() {
  const [showRoom, setShowRoom] = useState(true);
  const selectedRoom = useSelector((state: RootState) => state.room.selectedRoom);
  const { data } = useSWR('/api/proxy', fetcher, {
    revalidateOnFocus: true,
  });

  const pageProps = data?.nextData?.props?.initialProps?.pageProps || {}
  const realtimeData = pageProps?.realtime?.data || []
  const pickData = pageProps?.pick?.data || []
  const hitzData = pageProps?.hitz?.data || []

  return (
    <div className='w-full flex justify-center mt-32'>
      <div className='w-11/12 md:w-11/12 xl:w-[1280px]'>
      {selectedRoom && <div className='border rounded-xl p-2 mt-5'>
        <div className='flex flex-row items-center gap-2 cursor-pointer text-zinc-500 hover:text-zinc-400' onClick={() => setShowRoom(!showRoom)}>{showRoom?<FaAngleDoubleUp />:<FaAngleDoubleDown />} {showRoom ? 'ซ่อน' : 'แสดง'}ห้อง : {selectedRoom.name}</div>
        {showRoom && <RoomData room={selectedRoom.name_en} /> }
      </div>}
      <div className='w-full my-2 rounded-xl p-3 bg-gradient-to-r from-zinc-200/50 to-gray-100/50'>
      
        <h2 className="text-base font-bold text-zinc-700">
          Pantip Realtime
        </h2>
        <p className='text-gray-500 text-xs -mt-1'>กระทู้ที่มีคนเปิดอ่านมากในขณะนี้ อัปเดตทุกนาที</p>
      </div>
      <Realtime realtimeData={realtimeData} />
      
      <div className='w-full mt-10 flex flex-col md:flex-row'>

        <div className='w-full md:w-3/5 my-2 gap-5 rounded-xl md:mr-4 p-3 bg-gradient-to-r from-zinc-200/50 to-gray-100/50'>
          <h2 className="text-2xl font-bold text-zinc-700">
          Pantip Pick
          </h2>
          <p className='text-gray-500 text-base -mt-1 mb-3'>กระทู้คุณภาพคัดเลือกโดยทีมงาน Pantip</p>
          <Pick pickData={pickData} />
        </div>

        <div className='w-full md:w-2/5 my-2 rounded-xl p-3 bg-gradient-to-r from-zinc-200/50 to-gray-100/50'>
        <h2 className="text-2xl font-bold text-zinc-700">
        Pantip Hitz
        </h2>
        <p className='text-gray-500 text-base -mt-1 mb-3'>กระทู้ฮิตติดเทรนด์ทุก 10 นาที</p>
        <Hitz hitzData={hitzData} />
      </div>

      </div>
     
      </div>
    </div>
  );
}
