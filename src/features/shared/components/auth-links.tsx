import { Button } from '@/components/ui/button'
import Link from 'next/link';
import React from 'react'

export default function AuthLinks() {
  return (
    <div className='flex items-center gap-4 max-lg:flex-col'>
      <Button
        asChild
        className="custom-btn text-dark-blue py-6 px-8 text-base font-bold rounded-full border-none "
      >
        <Link href={"/register"}>Sign Up</Link>
      </Button>
      <Button
        asChild
        className="text-custom-primary hover:text-dark-blue border-2 border-custom-primary bg-transparent hover:bg-custom-primary!   py-5.5 px-8 text-base font-bold rounded-full  "
      >
        <Link href={"/login"}>Login</Link>
      </Button>
    </div>
  );
}
