'use client'

import React, { useCallback, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useWalletConnect } from "../hooks/useWalletConnect"

type HeaderMenuLink = {
  label: string
  href: string
}

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Stake",
    href: "/stake"
  },
]

const HeaderMenuLinks = () => {
  const pathname = usePathname()

  return (
    <>
      {menuLinks.map(({ label, href }) => {
        const isActive = pathname === href
        return (
          <li key={href}>
            <Link
              href={href}
              className={`${
                isActive ? "bg-orange-200 font-bold" : ""
              } hover:bg-orange-100 py-1 px-3 text-sm rounded-full transition-colors duration-200`}
            >
              {label}
            </Link>
          </li>
        )
      })}
    </>
  )
}

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const burgerMenuRef = useRef<HTMLDivElement>(null)
  const { address, balance, connectWallet } = useWalletConnect()

  const handleOutsideClick = useCallback(() => setIsDrawerOpen(false), [])

  return (
    <header className="sticky top-0 bg-yellow-100 border-b-4 border-orange-500 px-4 py-3 font-mono z-20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <div className="relative w-10 h-10">
              <span className="text-2xl font-bold text-orange-500">🍊</span>
            </div>
            <div>
              <span className="font-bold text-orange-700">CitreaUSD</span>
              <span className="text-xs block text-orange-600">Bitcoin backed stablecoin</span>
            </div>
          </Link>
          <ul className="hidden md:flex space-x-4">
            <HeaderMenuLinks />
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          {address ? (
            <div className="text-sm text-orange-700">
              <span className="font-bold">{address.slice(0, 6)}...{address.slice(-4)}</span>
              <span className="ml-2">{balance}</span>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-200"
            >
              Connect Wallet
            </button>
          )}
          <div className="md:hidden" ref={burgerMenuRef}>
            <button
              className="text-orange-700 hover:text-orange-900"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              ☰
            </button>
            {isDrawerOpen && (
              <ul className="absolute right-0 mt-2 py-2 w-48 bg-yellow-100 rounded-lg shadow-xl border-2 border-orange-500">
                <HeaderMenuLinks />
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

