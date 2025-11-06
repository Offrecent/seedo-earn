import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateRaffleData {
  raffle_insert: Raffle_Key;
}

export interface ListActiveRafflesData {
  raffles: ({
    id: UUIDString;
    drawTime: TimestampString;
    prizeAmount: number;
  } & Raffle_Key)[];
}

export interface PurchaseRaffleTicketData {
  raffleTicket_insert: RaffleTicket_Key;
}

export interface PurchaseRaffleTicketVariables {
  raffleId: UUIDString;
  selectedNumber: number;
}

export interface RaffleTicket_Key {
  id: UUIDString;
  __typename?: 'RaffleTicket_Key';
}

export interface Raffle_Key {
  id: UUIDString;
  __typename?: 'Raffle_Key';
}

export interface SubscriptionType_Key {
  id: UUIDString;
  __typename?: 'SubscriptionType_Key';
}

export interface Task_Key {
  id: UUIDString;
  __typename?: 'Task_Key';
}

export interface UpdateTaskData {
  task_update?: Task_Key | null;
}

export interface UpdateTaskVariables {
  id: UUIDString;
  adminNotes?: string | null;
}

export interface UserTask_Key {
  id: UUIDString;
  __typename?: 'UserTask_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface WithdrawalRequest_Key {
  id: UUIDString;
  __typename?: 'WithdrawalRequest_Key';
}

interface CreateRaffleRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateRaffleData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateRaffleData, undefined>;
  operationName: string;
}
export const createRaffleRef: CreateRaffleRef;

export function createRaffle(): MutationPromise<CreateRaffleData, undefined>;
export function createRaffle(dc: DataConnect): MutationPromise<CreateRaffleData, undefined>;

interface ListActiveRafflesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListActiveRafflesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListActiveRafflesData, undefined>;
  operationName: string;
}
export const listActiveRafflesRef: ListActiveRafflesRef;

export function listActiveRaffles(): QueryPromise<ListActiveRafflesData, undefined>;
export function listActiveRaffles(dc: DataConnect): QueryPromise<ListActiveRafflesData, undefined>;

interface PurchaseRaffleTicketRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: PurchaseRaffleTicketVariables): MutationRef<PurchaseRaffleTicketData, PurchaseRaffleTicketVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: PurchaseRaffleTicketVariables): MutationRef<PurchaseRaffleTicketData, PurchaseRaffleTicketVariables>;
  operationName: string;
}
export const purchaseRaffleTicketRef: PurchaseRaffleTicketRef;

export function purchaseRaffleTicket(vars: PurchaseRaffleTicketVariables): MutationPromise<PurchaseRaffleTicketData, PurchaseRaffleTicketVariables>;
export function purchaseRaffleTicket(dc: DataConnect, vars: PurchaseRaffleTicketVariables): MutationPromise<PurchaseRaffleTicketData, PurchaseRaffleTicketVariables>;

interface UpdateTaskRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTaskVariables): MutationRef<UpdateTaskData, UpdateTaskVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTaskVariables): MutationRef<UpdateTaskData, UpdateTaskVariables>;
  operationName: string;
}
export const updateTaskRef: UpdateTaskRef;

export function updateTask(vars: UpdateTaskVariables): MutationPromise<UpdateTaskData, UpdateTaskVariables>;
export function updateTask(dc: DataConnect, vars: UpdateTaskVariables): MutationPromise<UpdateTaskData, UpdateTaskVariables>;

