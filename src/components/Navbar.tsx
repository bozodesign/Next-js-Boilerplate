import Link from 'next/link';

export const Navbar = () => (
  <div className="sticky top-0 z-50 bg-white p-4 text-center text-lg font-semibold text-gray-500 [&_a:hover]:text-indigo-500 [&_a]:text-fuchsia-500">
    Live Demo of Next.js Boilerplate -
    {' '}
    <Link href="/sign-up">Explore the Authentication</Link>
  </div>
);
