const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'studio',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createRaffleRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateRaffle');
}
createRaffleRef.operationName = 'CreateRaffle';
exports.createRaffleRef = createRaffleRef;

exports.createRaffle = function createRaffle(dc) {
  return executeMutation(createRaffleRef(dc));
};

const listActiveRafflesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActiveRaffles');
}
listActiveRafflesRef.operationName = 'ListActiveRaffles';
exports.listActiveRafflesRef = listActiveRafflesRef;

exports.listActiveRaffles = function listActiveRaffles(dc) {
  return executeQuery(listActiveRafflesRef(dc));
};

const purchaseRaffleTicketRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'PurchaseRaffleTicket', inputVars);
}
purchaseRaffleTicketRef.operationName = 'PurchaseRaffleTicket';
exports.purchaseRaffleTicketRef = purchaseRaffleTicketRef;

exports.purchaseRaffleTicket = function purchaseRaffleTicket(dcOrVars, vars) {
  return executeMutation(purchaseRaffleTicketRef(dcOrVars, vars));
};

const updateTaskRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateTask', inputVars);
}
updateTaskRef.operationName = 'UpdateTask';
exports.updateTaskRef = updateTaskRef;

exports.updateTask = function updateTask(dcOrVars, vars) {
  return executeMutation(updateTaskRef(dcOrVars, vars));
};
