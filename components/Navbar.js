'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Menu, Send, Folder, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = ['Services', 'Projects', 'Off the Grid']

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="w-full bg-transparent sticky lg:top-8 top-4 flex justify-center z-50">
      <div
        className={`transition-all duration-500 ease-in-out md:bg-[#2e2e2e] bg-[#303030] text-white flex flex-col items-start md:items-center justify-start sm:justify-center md:rounded-3xl rounded-[1.25rem] shadow-sm max-w-7xl w-full py-4 px-6 relative overflow-hidden ${
          isScrolled ? 'lg:w-max' : 'lg:w-full'
        }`}
      >
        {/* Top Row */}
        <div className="w-full flex items-center justify-between md:justify-center">
          {/* Logo */}
          <Link
            href="#hero"
            className="font-signature font-serif italic text-2xl lg:border-r-4 border-dashed border-[#474747] pr-6"
          >
            FA
          </Link>

          {/* Desktop Nav */}
          <nav className={`transition-all duration-500 ease-in-out hidden md:flex items-center gap-6 px-6 ` + (isScrolled ? 'w-80 px-4' : 'w-4xl px-8')}>
            {navLinks.map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-md font-semibold hover:text-primary transition"
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Right: Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 border-l-4 border-dashed border-[#474747]">
            <Button
              variant="outline"
              className="border-white rounded-full py-5 bg-transparent text-white hover:bg-white hover:text-black"
            >
              Message Me <Send className="ml-2 h-4 w-4" />
            </Button>
            <Button className="bg-white rounded-full py-5 text-black hover:bg-gray-200">
              Resume <Folder className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="text-white" /> : <Menu className="text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown (inside navbar box) */}
        <div
          className={`w-full transition-all duration-800 ease-in-out overflow-hidden md:hidden ${
            mobileOpen ? 'max-h-[500px] mt-4' : 'max-h-0'
          }`}
        >
          <div className="border-t-4 border-dashed border-[#474747] pt-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="block text-lg font-semibold"
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="space-y-4 pt-4">
            <Button
              variant="outline"
              className="w-full border-white rounded-full py-5 bg-transparent text-white hover:bg-white hover:text-black flex justify-center"
            >
              Message Me <Send className="ml-2 h-4 w-4" />
            </Button>
            <Button className="w-full bg-white rounded-full py-5 text-black hover:bg-gray-200 flex justify-center">
              Resume <Folder className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
