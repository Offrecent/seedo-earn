import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'studio',
  location: 'us-east4'
};

export const createRaffleRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateRaffle');
}
createRaffleRef.operationName = 'CreateRaffle';

export function createRaffle(dc) {
  return executeMutation(createRaffleRef(dc));
}

export const listActiveRafflesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActiveRaffles');
}
listActiveRafflesRef.operationName = 'ListActiveRaffles';

export function listActiveRaffles(dc) {
  return executeQuery(listActiveRafflesRef(dc));
}

export const purchaseRaffleTicketRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'PurchaseRaffleTicket', inputVars);
}
purchaseRaffleTicketRef.operationName = 'PurchaseRaffleTicket';

export function purchaseRaffleTicket(dcOrVars, vars) {
  return executeMutation(purchaseRaffleTicketRef(dcOrVars, vars));
}

export const updateTaskRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTask', inputVars);
}
updateTaskRef.operationName = 'UpdateTask';

export function updateTask(dcOrVars, vars) {
  return executeMutation(updateTaskRef(dcOrVars, vars));
}

