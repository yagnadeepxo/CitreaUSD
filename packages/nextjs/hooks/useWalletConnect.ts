import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const CUSD_TOKEN_ADDRESS = '0x684135d5C252868A14Fe2Bf032D2101a30a7022D'
const CUSD_TOKEN_ABI = ['function balanceOf(address account) external view returns (uint256)']

export function useWalletConnect() {
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [status, setStatus] = useState<string>('Connect your wallet to Citrea Testnet')

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        if (chainId !== '0x13fb') {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x13fb' }],
          })
        }

        const accounts = (await window.ethereum.request({
          method: 'eth_requestAccounts',
        })) as string[]

        if (accounts && accounts.length > 0) {
          setAddress(accounts[0])
          setStatus('Wallet connected successfully')
          await updateBalance(accounts[0])
        } else {
          throw new Error('No accounts found')
        }
      } else {
        setStatus('Please install MetaMask to use this dApp')
      }
    } catch (error) {
      setStatus('Error connecting wallet')
      console.error('Error in connectWallet:', error)
    }
  }

  const updateBalance = async (walletAddress: string) => {
    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error('MetaMask is not installed')
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      
      // Get cBTC balance
      const balance = await provider.getBalance(walletAddress)
      const balanceInEth = ethers.utils.formatEther(balance)
      
      // Get cUSD balance
      const cUSDContract = new ethers.Contract(CUSD_TOKEN_ADDRESS, CUSD_TOKEN_ABI, provider)
      const cUSDBalance = await cUSDContract.balanceOf(walletAddress)
      const cUSDBalanceInEth = ethers.utils.formatUnits(cUSDBalance, 18) // Assuming cUSD has 18 decimals
      
      setBalance(`${parseFloat(balanceInEth).toFixed(2)} cBTC / ${parseFloat(cUSDBalanceInEth).toFixed(2)} cUSD`)
    } catch (error) {
      console.error('Error in updateBalance:', error)
      setStatus('Error fetching balance. Please check console for details.')
      setBalance('Error fetching balance')
    }
  }

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length > 0) {
            setAddress(accounts[0])
            updateBalance(accounts[0])
          } else {
            setAddress(null)
            setBalance(null)
            setStatus('Connect your wallet to Citrea Testnet')
          }
        })

        window.ethereum.on('chainChanged', () => {
          window.location.reload()
        })

        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' })
          if (accounts.length > 0) {
            setAddress(accounts[0])
            await updateBalance(accounts[0])
          }
        } catch (error) {
          console.error('Error checking initial accounts:', error)
        }
      }
    }

    init()

    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {})
        window.ethereum.removeListener('chainChanged', () => {})
      }
    }
  }, [])

  return { address, balance, status, connectWallet }
}

