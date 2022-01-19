import {
  ProjectRegistered,
  TokenRegistered
} from "../generated/NFightParent/NFightParent"
import { Project } from "../generated/templates"
import { Project as ProjectEntity, Token } from "../generated/schema"
import { DataSourceContext } from "@graphprotocol/graph-ts";

export function handleProjectRegistered(event: ProjectRegistered): void {
  let project = new ProjectEntity(event.params.contractAddress.toHexString())
  project.contractAddress = event.params.contractAddress;
  project.save();

  let context = new DataSourceContext()
  context.setBytes('contractAddress', event.params.contractAddress)
  Project.createWithContext(event.params.contractAddress, context);
}


export function handleTokenRegistered(event: TokenRegistered): void {
  let token = new Token(event.params.contractAddress.toHexString() + event.params.tokenId.toString())
  token.project = event.params.contractAddress.toHexString();
  token.tokenId = event.params.tokenId
  token.owner = event.params.owner;
  token.save();
}

