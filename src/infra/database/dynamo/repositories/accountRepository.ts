import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { Account } from "../../../../application/entities/account";
import { Injectable } from "../../../../kernel/decorators/injectable";
import { AppConfig } from "../../../../shared/config/appConfig";
import { dynamoClient } from "../../../clients/dynamoClient";
import { AccountItem } from "../items/accountItem";

@Injectable()
export class AccountRepository {
  constructor(private readonly config: AppConfig) {}

  async create(account: Account): Promise<void> {
    const accountItem = AccountItem.fromEntity(account);

    const command = new PutCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Item: accountItem.toItem(),
    });

    await dynamoClient.send(command);
  }
}
