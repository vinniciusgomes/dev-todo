import { getTags } from '@/actions/tag/actions'
import { getTasks } from '@/actions/task/actions'
import { ReturnTypeWithoutPromise } from '@/utils/return-type-without-promise'

export type Tag = ReturnTypeWithoutPromise<typeof getTags>[0]

export type Task = ReturnTypeWithoutPromise<typeof getTasks>[0]

export type TaskPriority = 'none' | 'low' | 'medium' | 'high' | 'urgent'
