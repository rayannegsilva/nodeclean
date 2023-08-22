import { AddAccountModel } from '@/domain/usecases/add-account'
import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '@/domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)

    const accountInsert = result.insertedId

    const accountReturn = await accountCollection.findOne({ _id: accountInsert })

    let account

    if (accountReturn?._id) {
      const { _id, ...accountWithoutId } = accountReturn
      account = Object.assign({}, accountWithoutId, { id: _id })
    }

    return account as unknown as AccountModel
  }
}
