'use client';
import Link from 'next/link';
import Image from 'next/image';
import { RiFileAddLine } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Input } from "@nextui-org/react";
import { SearchIcon } from './SearchIcon';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery) {
      setResults([]);
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: searchQuery,    // The keyword to search
          limit: 10,               // Limit the number of results
          type: 'all',             // Specify the type of search
          show_btn_search: 'true', // Include if the API requires this parameter
          room_search: null,       // Room search parameter
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      handleSearch(value);
    }, 500); // Adjust the delay time (in ms) as needed
    setDebounceTimeout(newTimeout);
  };

  return (
    <div className="sticky drop-shadow-md top-0 z-50 bg-white p-4 text-center text-lg text-gray-500 [&_a:hover]:text-indigo-500 [&_a]:text-fuchsia-500">
      <div className="flex flex-row justify-between items-center">
        <Image
          src="/img/logo-mobile-pantip-navy.png"
          alt="pantip logo"
          className="w-16 p-1 opacity-50"
          width="100"
          height="100"
        />
        <Input
          radius='full'
          type="text"
          className="max-w-[220px] bg-white border-2 rounded-full flex flex-row items-center drop-shadow-lg"
          placeholder="ค้นหาบน Pantip"
          startContent={
            <SearchIcon className="text-black/30 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
          value={query}
          onChange={handleInputChange}
        />
        <div className='flex flex-row gap-4 text-base'>
          <div className=''><RiFileAddLine className='absolute top-2 overflow-hidden text-6xl rotate-12 text-black/10' />ตั้งกระทู้</div>
          <div><HiOutlineUserGroup  className='absolute top-2 overflow-hidden text-6xl rotate-12 text-black/10'/>คอมมูนิตี้</div>
          <div>เข้าสู่ระบบ/สมัครสมาชิก</div>
        </div>
      </div>
      {/* Display search results or loading state */}
      {loading && <div>Loading...</div>}
      {!loading && results.length > 0 && (
        <div className="search-results">
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
