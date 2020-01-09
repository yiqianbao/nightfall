export default function({
  value,
  shieldContractAddress,

  receiver,
  sender,

  isMinted,
  isTransferred,
  isReceived,
  isBurned,
}) {
  return {
    value,
    shield_contract_address: shieldContractAddress,
    [receiver ? 'receiver' : undefined]: receiver,
    [sender ? 'sender' : undefined]: sender,

    [isMinted ? 'is_minted' : undefined]: isMinted,
    [isTransferred ? 'is_transferred' : undefined]: isTransferred,
    [isReceived ? 'is_received' : undefined]: isReceived,
    [isBurned ? 'is_burned' : undefined]: isBurned,
  };
}
