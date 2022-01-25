import {
  Transfer
} from "../../generated/Templates/Project/ERC721Transfer"
import { Fighter, SyncStatus } from "../../generated/schema"
import { dataSource } from '@graphprotocol/graph-ts'

export function handleTransfer(event: Transfer): void {
  let context = dataSource.context()
  let contractAddress = context.getBytes('contractAddress')
  let id = contractAddress.toHexString() + event.params.tokenId.toString();
  let fighter = Fighter.load(id)
  
  if (fighter != null) {
    fighter.owner = event.params.to;
    fighter.save();

    let syncStatus = new SyncStatus(event.transaction.hash.toHex() + "-" + event.logIndex.toString())
    syncStatus.fighter = id;
    syncStatus.timestamp = event.block.timestamp;
    syncStatus.status = "Unsynced";
    syncStatus.save()
  }
  
}
