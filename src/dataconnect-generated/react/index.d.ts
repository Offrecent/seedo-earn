import { CreateRaffleData, ListActiveRafflesData, PurchaseRaffleTicketData, PurchaseRaffleTicketVariables, UpdateTaskData, UpdateTaskVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateRaffle(options?: useDataConnectMutationOptions<CreateRaffleData, FirebaseError, void>): UseDataConnectMutationResult<CreateRaffleData, undefined>;
export function useCreateRaffle(dc: DataConnect, options?: useDataConnectMutationOptions<CreateRaffleData, FirebaseError, void>): UseDataConnectMutationResult<CreateRaffleData, undefined>;

export function useListActiveRaffles(options?: useDataConnectQueryOptions<ListActiveRafflesData>): UseDataConnectQueryResult<ListActiveRafflesData, undefined>;
export function useListActiveRaffles(dc: DataConnect, options?: useDataConnectQueryOptions<ListActiveRafflesData>): UseDataConnectQueryResult<ListActiveRafflesData, undefined>;

export function usePurchaseRaffleTicket(options?: useDataConnectMutationOptions<PurchaseRaffleTicketData, FirebaseError, PurchaseRaffleTicketVariables>): UseDataConnectMutationResult<PurchaseRaffleTicketData, PurchaseRaffleTicketVariables>;
export function usePurchaseRaffleTicket(dc: DataConnect, options?: useDataConnectMutationOptions<PurchaseRaffleTicketData, FirebaseError, PurchaseRaffleTicketVariables>): UseDataConnectMutationResult<PurchaseRaffleTicketData, PurchaseRaffleTicketVariables>;

export function useUpdateTask(options?: useDataConnectMutationOptions<UpdateTaskData, FirebaseError, UpdateTaskVariables>): UseDataConnectMutationResult<UpdateTaskData, UpdateTaskVariables>;
export function useUpdateTask(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTaskData, FirebaseError, UpdateTaskVariables>): UseDataConnectMutationResult<UpdateTaskData, UpdateTaskVariables>;
