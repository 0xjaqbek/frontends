import { useEffect, useState } from "react"

import { useApp } from "@/contexts/AppContextProvider"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import { useIsSmartContractWallet } from "@/hooks"
import useBridgeStore from "@/stores/bridgeStore"
import { toTokenDisplay } from "@/utils"

import useTransactionBuffer from "./useTransactionBuffer"

function useSufficientBalance(selectedToken: any, amount?: bigint, fee?: bigint | null, tokenBalance: bigint = BigInt(0)) {
  const { walletCurrentAddress, chainId } = useRainbowContext()
  const { networksAndSigners } = useApp()
  const networksAndSigner = networksAndSigners[chainId as number]
  const transactionBuffer = useTransactionBuffer(selectedToken)

  const { isNetworkCorrect } = useBridgeStore()
  const [, setSufficientBalance] = useState(false)
  const [warning, setWarning] = useState("")
  const { isSmartContractWallet } = useIsSmartContractWallet()

  useEffect(() => {
    async function checkEnoughBalance() {
      if (!isNetworkCorrect || amount === undefined) {
        setWarning("")
        return
      }
      const isZero = Number(amount) === 0
      if (isZero) {
        setWarning("The amount should be greater than 0!")
        return
      }
      if (!tokenBalance) {
        setWarning(`Insufficient balance. Your account has 0 ${selectedToken.symbol}.`)
        return
      }

      let enoughFeeBalance: boolean
      let enoughTokenBalance: boolean
      let message: string = ""
      let nativeTokenBalance

      const totalFee = fee ? fee + transactionBuffer : BigInt(0)

      if (selectedToken.native) {
        const totalCost = amount + totalFee
        enoughFeeBalance = tokenBalance >= totalCost
        enoughTokenBalance = enoughFeeBalance
      } else {
        const nativeTokenBalance = await networksAndSigner.provider.getBalance(walletCurrentAddress)
        enoughFeeBalance = nativeTokenBalance ? nativeTokenBalance >= totalFee : false
        enoughTokenBalance = tokenBalance >= amount
      }

      if (enoughFeeBalance && enoughTokenBalance) {
        setWarning("")
        return setSufficientBalance(true)
      }

      if (!enoughTokenBalance && !selectedToken.native) {
        message = `Insufficient balance. The amount should be less than ${toTokenDisplay(tokenBalance, selectedToken.decimals, selectedToken.symbol)}`
      } else if (!enoughFeeBalance) {
        if (!selectedToken.native) {
          message = `${nativeTokenBalance ? "Insufficient" : "No"} balance. Please add ETH to pay for tx fees.`
        } else if (tokenBalance > totalFee) {
          const diff = tokenBalance - totalFee
          message = `Insufficient balance. The amount should be less than ${toTokenDisplay(diff, selectedToken.decimals, selectedToken.symbol)}`
        } else {
          message = `Insufficient balance. Please add ETH to pay for tx fees.`
        }
      }

      // if (!tokenBalance) {
      //   message = `Insufficient balance. Your account has 0 ${selectedToken.symbol}.`
      // } else if (!enoughFeeBalance) {
      //   if (tokenBalance > totalFee) {
      //     const diff = tokenBalance - totalFee
      //     message = `Insufficient balance. The amount should be less than ${toTokenDisplay(diff, selectedToken.decimals, selectedToken.symbol)}`
      //   } else {
      //     message = `Insufficient balance. Please add ETH to pay for tx fees.`
      //   }

      //   if (!selectedToken.native) {
      //     message = `${nativeTokenBalance ? "Insufficient" : "No"} balance. Please add ETH to pay for tx fees.`
      //   }
      // } else if (!enoughTokenBalance) {
      //   message = `Insufficient balance. The amount should be less than ${toTokenDisplay(tokenBalance, selectedToken.decimals, selectedToken.symbol)}`
      // }

      setWarning(message)
      setSufficientBalance(false)
    }

    // NOTE: For now, no accommodations are made for the tx sender
    // if they do not have enough funds to pay for the relay tx.
    // It's kind of complicated to handle, because for the case when the SC wallet has more than owner
    // is not possible to know who of them will be the one who executes the TX.
    // We will trust on the wallet UI to handle this issue for now.
    if (isSmartContractWallet) {
      setSufficientBalance(true)
    } else {
      checkEnoughBalance()
    }
  }, [networksAndSigner, amount, fee, tokenBalance])

  return {
    insufficientWarning: warning,
  }
}
export default useSufficientBalance
