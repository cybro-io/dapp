export const increaseGasLimit = (estimatedGasLimit: bigint, increasePercentage: number): bigint => {
  try {
    return (estimatedGasLimit * BigInt(Math.ceil(increasePercentage * 100))) / BigInt(100);
  } catch (error) {
    console.error('Error estimating gas limit:', error);
    throw error;
  }
};
