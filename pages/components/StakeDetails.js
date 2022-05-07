// how many tokens are in our wallet 
// how many tokens are staked 
//how many tokens we have earned

import { useMoralis, useWeb3Contract } from "react-moralis";
import { 
    stakingAddress, 
    stakingAbi,
    rewardTokenABI,
    rewardTokenAddress
 } from "../constants";
import { useState, useEffect } from "react";
import { ethers } from "ethers"

export default function StakeDetails() {
    const { account, isWeb3Enabled } = useMoralis();
    const [rtBalance, setRtBalance] = useState("0");
    const [stakedBalance, setStakedBalance] = useState("0");
    const [earnedBalance, setEarnedBalance] = useState("0");

    const { runContractFunction: getRtBalance } = useWeb3Contract({
        abi: rewardTokenABI,
        contractAddress: rewardTokenAddress,
        functionName: "balanceOf",
        params: {
            account: account,
        },

    });
    
    const { runContractFunction: getStakedBalance} = useWeb3Contract({
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "getStaked",
        params: {
            account: account,
        },

    });

    const { runContractFunction: getEarned} = useWeb3Contract({
        abi: stakingAbi,
        contractAddress: stakingAddress,
        functionName: "earned",
        params: {
            account: account,
        },

    });

    
    console.log(account)
    // reward token address
    // reward token ABI
    useEffect(() => {
      // update ui & get balances
      if (isWeb3Enabled && account) {

          updateUiValues()
      }
    //   return () => {
    //     second
    //   }
    }, [account,isWeb3Enabled])

    async function updateUiValues() {
        
        const rtBalanceFromContract = (
            await getRtBalance({onError: (error) => console.log(error) })
        ).toString();
        const formatedRtBalanceFromContract = ethers.utils.formatUnits(
            rtBalanceFromContract,
            "ether"
        )
        setRtBalance(formatedRtBalanceFromContract)
        
        const stakedFromContract = (
            await getStakedBalance({onError: (error) => console.log(error) })
        ).toString();
        const formatedStakedFromContract = ethers.utils.formatUnits(
            stakedFromContract,
            "ether"
        )
        setStakedBalance(formatedStakedFromContract);
        
        const earnedFromContract = (
            await getEarned({onError: (error) => console.log(error) })
        ).toString();
        const formatedEarnedFromContract = ethers.utils.formatUnits(
            earnedFromContract,
            "ether"
        )
        setEarnedBalance(formatedEarnedFromContract);
    }
    return (
        <div className="container">
        <div>
        <h1>Stake details</h1>
        </div>
        <div>
        <p>{`RT Balance is: ${rtBalance}`}</p>
        <p>{`Earned Balance is: ${earnedBalance}`}</p>
        <p>{`Staked Balance is: ${stakedBalance}`}</p>
        </div>
        </div>
    )
}