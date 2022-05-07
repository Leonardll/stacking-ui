 const stakingAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
 const rewardTokenAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707";

const stakingAbi= require("./stakingABI.json")
const rewardTokenABI = require("./rewardTokenABI.json")

module.exports = {
    stakingAbi,
    rewardTokenABI,
    stakingAddress,
    rewardTokenAddress
}