import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { Account } from "../../../../application/entities/account";
import { Injectable } from "../../../../kernel/decorators/injectable";
import { AppConfig } from "../../../../shared/config/appConfig";
import { dynamoClient } from "../../../clients/dynamoClient";
import { AccountItem } from "../items/accountItem";

@Injectable()
export class AccountRepository {
  constructor(private readonly config: AppConfig) {}

  async findEmail(email: string): Promise<Account | null> {
    const command = new QueryCommand({
      IndexName: "GSI1",
      TableName: this.config.db.dynamodb.mainTable,
      Limit: 1,
      KeyConditionExpression: "#GSI1PK = :GSI1PK AND #GSI1SK = :GSI1SK",
      ExpressionAttributeValues: {
        ":GSI1PK": AccountItem.getGSI1PK(email),
        ":GSI1SK": AccountItem.getGSI1SK(email),
      },
      ExpressionAttributeNames: {
        "#GSI1PK": "GSI1PK",
        "#GSI1SK": "GSI1SK",
      },
    });

    const { Items = [] } = await dynamoClient.send(command);
    const account = Items[0] as AccountItem.ItemType | undefined;

    if (!account) return null;

    return AccountItem.toEntity(account);
  }

  async create(account: Account): Promise<void> {
    const accountItem = AccountItem.fromEntity(account);

    const command = new PutCommand({
      TableName: this.config.db.dynamodb.mainTable,
      Item: accountItem.toItem(),
    });

    await dynamoClient.send(command);
  }
}
