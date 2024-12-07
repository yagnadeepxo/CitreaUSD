'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { StakingInterface } from '~~/components/stake'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-yellow-200 to-orange-200 p-4 font-mono">
      <StakingInterface />
    </div>
  )
}

