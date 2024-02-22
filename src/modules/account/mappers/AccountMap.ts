import { Account, AccountDTO, AccountModel } from "@/modules/account";

import { Mapper } from "@/common";

export class AccountMap implements Mapper<Account, AccountDTO> {
  toDTO(domain: Account): AccountDTO {
    if (domain instanceof AccountModel) domain = domain.toObject();

    const { security, ...DTO } = domain;

    return DTO;
  }
}
