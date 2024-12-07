/*'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const NATIVE_BTC_LOCKER_ADDRESS = '0xE81Db56a68022951CE11e98f614Dd2E97C31C2D1';
//CUSD_TOKEN_ADDRESS = '0x684135d5C252868A14Fe2Bf032D2101a30a7022D';

const NATIVE_BTC_LOCKER_ABI = [
  'function lockAndMint() external payable',
  'function unlockAndBurn(uint256 cUSDAmount) external',
  'function getBTCUSDPrice() public view returns (uint256)',
];

export function SwapInterface() {
  const [fromToken, setFromToken] = useState<'cBTC' | 'cUSD'>('cBTC');
  const [toToken, setToToken] = useState<'cBTC' | 'cUSD'>('cUSD');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [btcPrice, setBtcPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const contract = new ethers.Contract(NATIVE_BTC_LOCKER_ADDRESS, NATIVE_BTC_LOCKER_ABI, provider);
          const price = await contract.getBTCUSDPrice();
          // Convert price from 8 decimals to a human-readable number
          const formattedPrice = ethers.utils.formatUnits(price, 18);
          setBtcPrice(parseFloat(formattedPrice));
        }
      } catch (error) {
        console.error('Error fetching BTC price:', error);
      }
    };
    fetchBTCPrice();
  }, []);

  const handleSwitch = () => {
    setFromToken((prev) => (prev === 'cBTC' ? 'cUSD' : 'cBTC'));
    setToToken((prev) => (prev === 'cBTC' ? 'cUSD' : 'cBTC'));
    setFromAmount('');
    setToAmount('');
  };

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromAmount(value);

    if (btcPrice > 0 && value) {
      const amount = parseFloat(value);
      const calculatedAmount =
        fromToken === 'cBTC'
          ? (amount * btcPrice).toFixed(2) // Convert cBTC to cUSD
          : (amount / btcPrice).toFixed(18); // Convert cUSD to cBTC
      setToAmount(calculatedAmount);
    } else {
      setToAmount('');
    }
  };

  const handleSwap = async () => {
    if (typeof window.ethereum !== 'undefined') {
      setLoading(true);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(NATIVE_BTC_LOCKER_ADDRESS, NATIVE_BTC_LOCKER_ABI, signer);

        let tx;
        if (fromToken === 'cBTC') {
          // Lock and Mint
          const value = ethers.utils.parseEther(fromAmount); // Convert cBTC amount to wei
          tx = await contract.lockAndMint({ value });
        } else {
          // Unlock and Burn
          
          const cUSDAmount = ethers.utils.parseEther(fromAmount).div(ethers.BigNumber.from(10).pow(18));
          tx = await contract.unlockAndBurn(cUSDAmount);
        }

        await tx.wait();
        console.log('Swap successful!');
        setFromAmount('');
        setToAmount('');
      } catch (error) {
        console.error('Error during swap:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Ethereum wallet is not connected.');
    }
  };

  return (
    <div className="bg-yellow-100 border-4 border-orange-500 rounded-lg p-6 w-96 font-mono">
      <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">Citrea Swap</h2>
      <div className="mb-4">
        <label htmlFor="fromAmount" className="block text-sm font-bold text-orange-700 mb-1">
          From ({fromToken})
        </label>
        <input
          id="fromAmount"
          type="number"
          placeholder={`Enter ${fromToken} amount`}
          value={fromAmount}
          onChange={handleFromAmountChange}
          className="w-full px-3 py-2 bg-white border-2 border-orange-400 rounded focus:outline-none focus:border-orange-600"
        />
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={handleSwitch}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none"
        >
          ↑↓
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="toAmount" className="block text-sm font-bold text-orange-700 mb-1">
          To ({toToken})
        </label>
        <input
          id="toAmount"
          type="number"
          placeholder={`Receive ${toToken}`}
          value={toAmount}
          readOnly
          className="w-full px-3 py-2 bg-gray-100 border-2 border-orange-400 rounded"
        />
      </div>
      <button
        onClick={handleSwap}
        className={`w-full bg-orange-500 text-white py-2 rounded font-bold ${
          loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
        }`}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'SWAP'}
      </button>
    </div>
  );
}
*/

'use client'

import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useWalletConnect } from '../hooks/useWalletConnect'

const NATIVE_BTC_LOCKER_ADDRESS = '0xE81Db56a68022951CE11e98f614Dd2E97C31C2D1'

const NATIVE_BTC_LOCKER_ABI = [
  'function lockAndMint() external payable',
  'function unlockAndBurn(uint256 cUSDAmount) external',
  'function getBTCUSDPrice() public view returns (uint256)',
]

export function SwapInterface() {
  const { address } = useWalletConnect()
  const [fromToken, setFromToken] = useState<'cBTC' | 'cUSD'>('cBTC')
  const [toToken, setToToken] = useState<'cBTC' | 'cUSD'>('cUSD')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [btcPrice, setBtcPrice] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const contract = new ethers.Contract(NATIVE_BTC_LOCKER_ADDRESS, NATIVE_BTC_LOCKER_ABI, provider)
          const price = await contract.getBTCUSDPrice()
          // Convert price from 8 decimals to a human-readable number
          const formattedPrice = ethers.utils.formatUnits(price, 18)
          setBtcPrice(parseFloat(formattedPrice))
        }
      } catch (error) {
        console.error('Error fetching BTC price:', error)
      }
    }
    fetchBTCPrice()
  }, [])

  const handleSwitch = () => {
    setFromToken((prev) => (prev === 'cBTC' ? 'cUSD' : 'cBTC'))
    setToToken((prev) => (prev === 'cBTC' ? 'cUSD' : 'cBTC'))
    setFromAmount('')
    setToAmount('')
  }

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFromAmount(value)

    if (btcPrice > 0 && value) {
      const amount = parseFloat(value)
      const calculatedAmount =
        fromToken === 'cBTC'
          ? (amount * btcPrice).toFixed(2) // Convert cBTC to cUSD
          : (amount / btcPrice).toFixed(18) // Convert cUSD to cBTC
      setToAmount(calculatedAmount)
    } else {
      setToAmount('')
    }
  }

  const handleSwap = async () => {
    if (typeof window.ethereum !== 'undefined' && address) {
      setLoading(true)
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(NATIVE_BTC_LOCKER_ADDRESS, NATIVE_BTC_LOCKER_ABI, signer)

        let tx
        if (fromToken === 'cBTC') {
          // Lock and Mint
          const value = ethers.utils.parseEther(fromAmount) // Convert cBTC amount to wei
          tx = await contract.lockAndMint({ value })
        } else {
          // Unlock and Burn
          const cUSDAmount = ethers.utils.parseEther(fromAmount).div(ethers.BigNumber.from(10).pow(18))
          tx = await contract.unlockAndBurn(cUSDAmount)
        }

        await tx.wait()
        console.log('Swap successful!')
        setFromAmount('')
        setToAmount('')
      } catch (error) {
        console.error('Error during swap:', error)
      } finally {
        setLoading(false)
      }
    } else {
      console.error('Ethereum wallet is not connected.')
    }
  }

  return (
    <div className="bg-yellow-100 border-4 border-orange-500 rounded-lg p-6 w-96 font-mono">
      <h2 className="text-2xl font-bold text-orange-600 mb-4 text-center">Citrea Swap</h2>
      <div className="mb-4">
        <label htmlFor="fromAmount" className="block text-sm font-bold text-orange-700 mb-1">
          From ({fromToken})
        </label>
        <input
          id="fromAmount"
          type="number"
          placeholder={`Enter ${fromToken} amount`}
          value={fromAmount}
          onChange={handleFromAmountChange}
          className="w-full px-3 py-2 bg-white border-2 border-orange-400 rounded focus:outline-none focus:border-orange-600"
        />
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={handleSwitch}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none"
        >
          ↑↓
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="toAmount" className="block text-sm font-bold text-orange-700 mb-1">
          To ({toToken})
        </label>
        <input
          id="toAmount"
          type="number"
          placeholder={`Receive ${toToken}`}
          value={toAmount}
          readOnly
          className="w-full px-3 py-2 bg-gray-100 border-2 border-orange-400 rounded"
        />
      </div>
      <button
        onClick={handleSwap}
        className={`w-full bg-orange-500 text-white py-2 rounded font-bold ${
          loading || !address ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
        }`}
        disabled={loading || !address}
      >
        {loading ? 'Processing...' : address ? 'SWAP' : 'Connect Wallet to Swap'}
      </button>
    </div>
  )
}


