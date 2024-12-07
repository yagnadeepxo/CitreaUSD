'use client'

import { useState } from 'react'
import { ethers } from 'ethers'

export function StakingInterface() {
  const [cUSDBalance, setCUSDBalance] = useState('1000.00')
  const [scUSDBalance, setSCUSDBalance] = useState('0.00')
  const [amount, setAmount] = useState('')

  const handleStake = async () => {
    if (!amount || isNaN(parseFloat(amount))) return
    console.log(`Staking ${amount} cUSD`)
    setCUSDBalance(prevBalance => (parseFloat(prevBalance) - parseFloat(amount)).toFixed(2))
    setSCUSDBalance(prevBalance => (parseFloat(prevBalance) + parseFloat(amount)).toFixed(2))
    setAmount('')
  }

  const handleUnstake = async () => {
    if (!amount || isNaN(parseFloat(amount))) return
    console.log(`Unstaking ${amount} ScUSD`)
    setSCUSDBalance(prevBalance => (parseFloat(prevBalance) - parseFloat(amount)).toFixed(2))
    setCUSDBalance(prevBalance => (parseFloat(prevBalance) + parseFloat(amount)).toFixed(2))
    setAmount('')
  }

  return (
    <div className="bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-orange-500 rounded-lg p-6 w-full max-w-md font-mono shadow-lg">
      <h2 className="text-3xl font-bold text-orange-700 mb-6 text-center">Citrea Staking</h2>
      <div className="mb-6">
        <label htmlFor="amount" className="block text-sm font-bold text-orange-700 mb-2">
          Amount to Stake/Unstake
        </label>
        <input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-2 bg-white border-2 border-orange-400 rounded focus:outline-none focus:border-orange-600 transition-colors duration-200"
        />
      </div>
      
      <div className="flex justify-between gap-4">
        <button 
          onClick={handleStake}
          className="flex-1 bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 focus:outline-none font-bold transition-colors duration-200 shadow-md"
        >
          Stake cUSD
        </button>
        <button 
          onClick={handleUnstake}
          className="flex-1 bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 focus:outline-none font-bold transition-colors duration-200 shadow-md"
        >
          Unstake ScUSD
        </button>
      </div>
    </div>
  )
}

