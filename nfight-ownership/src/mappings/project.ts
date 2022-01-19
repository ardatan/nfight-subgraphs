import {
  Transfer
} from "../../generated/Templates/Project/ERC721Transfer"
import { Token } from "../../generated/schema"
import { dataSource } from '@graphprotocol/graph-ts'

export function handleTransfer(event: Transfer): void {
  let context = dataSource.context()
  let contractAddress = context.getBytes('contractAddress')
  let token = new Token(contractAddress.toString() + event.params.tokenId.toString())
  token.project = contractAddress.toHexString();
  token.owner = event.params.to;
  token.save();
}
