import Image from 'next/image'
import { FaFacebook, FaYoutube, FaInstagramSquare } from 'react-icons/fa'
import { AiFillTikTok } from "react-icons/ai";
import { FaXTwitter } from 'react-icons/fa6'
export const Footer = () => (
  
  <footer className="w-full kanit font-normal overflow-hidden relative border-0 pt-0 bg-gradient-to-tr from-[#f7f7f7] to-zinc-50 text-[#222] pb-6">
  <Image
      src="/img/valley-white.svg"
      alt="valley white"
      className="w-full drop-shadow-lg border-0 p-0"
      width="100"
      height="100"
  />
  <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
     
      <div>
        
      </div>

      
      <div>
          
          <ul className="space-y-2 text-sm">
              <li>
                  <a
                      href="#about-section"
                      className="hover:text-gold-gal transition duration-300"
                  >
                      ติดต่อทีมงาน Pantip
                  </a>
              </li>
              <li>
                  <a
                      href="#about-section"
                      className="hover:text-gold-gal transition duration-300"
                  >
                      ติดต่อลงโฆษณา
                  </a>
              </li>
              <li>
                  <a
                      href="#about-section"
                      className="hover:text-gold-gal transition duration-300"
                  >
                      ร่วมงานกับ Pantip
                  </a>
              </li>
              
              
          </ul>
      </div>

      
      <div>
          
          <ul className="space-y-2 text-sm">
              <li>
                  <a
                      href="#about-section"
                      className="hover:text-gold-gal transition duration-300"
                  >
                      กฎ กติกาและมารยาท
                  </a>
              </li>
              <li>
                  <a
                      href="#about-section"
                      className="hover:text-gold-gal transition duration-300"
                  >
                      คำแนะนำการโพสต์
                  </a>
              </li>
              <li>
                  <a
                      href="#about-section"
                      className="hover:text-gold-gal transition duration-300"
                  >
                      นโยบายเกี่ยวกับข้อมูลส่วนบุคคล
                  </a>
              </li>
              <li>
                  <a
                      href="#about-section"
                      className="hover:text-gold-gal transition duration-300"
                  >
                      สิทธิ์การใช้งานของสมาชิก
                  </a>
              </li>
              <li>
                  <a
                      href="#about-section"
                      className="hover:text-gold-gal transition duration-300"
                  >
                      Download App Pantip
                  </a>
              </li>
              <li>
                  <a
                      href="#about-section"
                      className="hover:text-gold-gal transition duration-300"
                  >
                      Pantip Certified Developer
                  </a>
              </li>
              
          </ul>
      </div>

      
      <div>
          <h2 className="text-xl font-semibold mb-2">
              ติดตาม
          </h2>
          
          <div className="flex space-x-4 mt-3">
              <a
                  href="https://www.facebook.com/pantipdotcom/"
                  className="bg-gold-gal hover:bg-black/20 p-2 rounded-full transition duration-300"
              >
                  <FaFacebook className="h-6 w-6" />
              </a>
              <a
                  href="https://x.com/Pantip1996"
                  className="bg-gold-gal hover:bg-black/20 p-2 rounded-full transition duration-300"
              >
                  <FaXTwitter className="h-6 w-6" />
              </a>
              <a
                  href="https://www.youtube.com/@pantipchannel"
                  className="bg-gold-gal hover:bg-black/20 p-2 rounded-full transition duration-300"
              >
                  <FaYoutube className="h-6 w-6" />
              </a>
              <a
                  href="https://www.instagram.com/pantipdotcom"
                  className="bg-gold-gal hover:bg-black/20 p-2 rounded-full transition duration-300"
              >
                  <FaInstagramSquare className="h-6 w-6" />
              </a>

              
              <a
                  href="https://www.tiktok.com/@pantip1996"
                  className="bg-gold-gal hover:bg-black/20 p-2 rounded-full transition duration-300"
              >
                  <AiFillTikTok className="h-6 w-6" />
              </a>
          </div>
      </div>
  </div>
  <div className="container pt-10 mx-auto px-4 lg:px-8 mt-8 text-center text-sm">
  © 2024 Internet Marketing co., ltd
  </div>
</footer>
)