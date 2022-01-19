import {
  ProjectRegistered,
  TokenRegistered
} from "../generated/NFightParent/NFightParent"
import { Project } from "../generated/templates"
import { Project as ProjectEntity, Fighter } from "../generated/schema"
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
  let project = ProjectEntity.load(event.params.contractAddress.toHexString());
  
  if (project != null) {
    let fighter = new Fighter(event.params.contractAddress.toHexString() + event.params.tokenId.toString())
    fighter.contractAddress = event.params.contractAddress;
    fighter.project = project.id
    fighter.tokenId = event.params.tokenId
    fighter.owner = event.params.owner;
    fighter.save();
  }
  
}

