'use client'
import useSWR from 'swr';
import { fetcher } from 'src/utils/GenericFn'
import Realtime from '@/components/Realtime';
import Pick from '@/components/Pick';
import Hitz from '@/components/Hitz';
export default function Index() {

  const { data } = useSWR('/api/proxy', fetcher, {
    revalidateOnFocus: true,
  });

  //console.log('data:',data?.nextData?.props?.initialProps?.pageProps?.realtime?.data)
  const realtimeData = data?.nextData?.props?.initialProps?.pageProps?.realtime?.data || []
  const pickData = data?.nextData?.props?.initialProps?.pageProps?.pick?.data || []
  const hitzData = data?.nextData?.props?.initialProps?.pageProps?.hitz?.data || []

  return (
    <div className='w-full flex justify-center mt-32'>
      <div className='w-11/12 md:w-11/12 lg:w-[1280px]'>

      <div className='w-full my-2 rounded-xl p-3 bg-gradient-to-r from-zinc-200/50 to-gray-100/50'>
        <h2 className="text-2xl font-bold text-zinc-700">
          Pantip Realtime
        </h2>
        <p className='text-gray-500 text-base -mt-1'>กระทู้ที่มีคนเปิดอ่านมากในขณะนี้ อัปเดตทุกนาที</p>
      </div>
      <Realtime realtimeData={realtimeData} />
      
      <div className='w-full mt-10 flex flex-col md:flex-row'>

        <div className='w-full md:w-1/2 my-2 gap-5 rounded-xl md:mr-4 p-3 bg-gradient-to-r from-zinc-200/50 to-gray-100/50'>
          <h2 className="text-2xl font-bold text-zinc-700">
          Pantip Pick
          </h2>
          <p className='text-gray-500 text-base -mt-1 mb-3'>กระทู้คุณภาพคัดเลือกโดยทีมงาน Pantip</p>
          <Pick pickData={pickData} />
        </div>

        <div className='w-full md:w-1/2 my-2 rounded-xl p-3 bg-gradient-to-r from-zinc-200/50 to-gray-100/50'>
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
