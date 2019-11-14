/*
 *  this mapper on transfer case.
 *  for rest of the operation erc20Commitment mapper is used.
 *  as usecase is identical
 */

export default function({
  amount,
  salt,
  commitment,
  commitmentIndex,

  changeAmount,
  changeSalt,
  changeCommitment,
  changeCommitmentIndex,

  receiver,
  usedCoins,
}) {
  let parsedUsedCoin;

  if (Array.isArray(usedCoins))
    parsedUsedCoin = usedCoins.map(coin => ({
      ft_commitment_value: coin.amount,
      ft_commitment: coin.commitment,
    }));

  return {
    ft_commitment_value: amount,
    salt,
    ft_commitment: commitment,
    ft_commitment_index: commitmentIndex,

    [changeAmount ? 'change_coin_value' : undefined]: changeAmount,
    [changeSalt ? 'change_salt' : undefined]: changeSalt,
    [changeCommitment ? 'change_coin_commitment' : undefined]: changeCommitment,
    [changeCommitmentIndex ? 'change_coin_commitment_index' : undefined]: changeCommitmentIndex,

    [receiver ? 'receiver' : undefined]: receiver,
    [usedCoins ? 'used_coin_commitments' : undefined]: parsedUsedCoin,
  };
}
