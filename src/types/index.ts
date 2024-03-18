import { getTags } from '@/actions/tag/actions'
import { ReturnTypeWithoutPromise } from '@/utils/return-type-without-promise'

export type Tag = ReturnTypeWithoutPromise<typeof getTags>[0]
