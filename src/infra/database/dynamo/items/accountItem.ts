import { Account } from "../../../../application/entities/account";

export class AccountItem {
  private readonly type = "Account";
  private readonly keys: AccountItem.Keys;

  constructor(private attrs: AccountItem.Attributes) {
    this.keys = {
      PK: AccountItem.getPk(this.attrs.id),
      SK: AccountItem.getSk(this.attrs.id),
      GSI1PK: AccountItem.getGSI1PK(this.attrs.email),
      GSI1SK: AccountItem.getGSI1SK(this.attrs.email),
    };
  }

  toItem(): AccountItem.ItemType {
    return {
      ...this.keys,
      ...this.attrs,
      type: this.type,
    };
  }

  static fromEntity(account: Account) {
    return new AccountItem({
      ...account,
      createdAt: account.createdAt.toISOString(),
    });
  }

  static getPk(accountId: string): AccountItem["keys"]["PK"] {
    return `ACCOUNT#${accountId}`;
  }

  static getSk(accountId: string): AccountItem["keys"]["SK"] {
    return `ACCOUNT#${accountId}`;
  }

  static getGSI1PK(email: string): AccountItem["keys"]["GSI1PK"] {
    return `ACCOUNT#${email}`;
  }

  static getGSI1SK(email: string): AccountItem["keys"]["GSI1SK"] {
    return `ACCOUNT#${email}`;
  }
}

export namespace AccountItem {
  export type Attributes = {
    id: string;
    email: string;
    externalId: string;
    createdAt: string;
  };

  export type Keys = {
    PK: `ACCOUNT#${string}`;
    SK: `ACCOUNT#${string}`;
    GSI1PK: `ACCOUNT#${string}`;
    GSI1SK: `ACCOUNT#${string}`;
  };

  export type ItemType = Keys &
    Attributes & {
      type: "Account";
    };
}
