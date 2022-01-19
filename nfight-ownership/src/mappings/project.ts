import {
  Transfer
} from "../../generated/Templates/Project/ERC721Transfer"
import { Fighter } from "../../generated/schema"
import { dataSource } from '@graphprotocol/graph-ts'

export function handleTransfer(event: Transfer): void {
  let context = dataSource.context()
  let contractAddress = context.getBytes('contractAddress')

  let fighter = Fighter.load(contractAddress.toHexString() + event.params.tokenId.toString())
  
  if (fighter != null) {
    fighter.owner = event.params.to;
    fighter.save();
  }
  
}
