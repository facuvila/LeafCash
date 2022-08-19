const types = {
    build: 'BUILD',
    updateBalance: 'UPDATEBALANCE',
    addContact: 'ADDCONTACT',
    addContact: 'ADDTRANSACTION'
}

const initialStore = {
    balance: 0,
    contacts: [],
    email: '',
    isVendor: false,
    contributedTrees: 0,
    lastTransactions: []
}

const storeReducer = (state, action) => {
    switch (action.type) {
        case types.build:
            return {
                balance: action.user.balance,
                contacts: action.user.contacts,
                email: action.user.email,
                isVendor: action.user.isVendor,
                contributedTrees: action.user.contributedTrees,
                lastTransactions: action.user.lastTransactions
            }
        case types.updateBalance: //Reasigna balance y contributedTrees, a los valores recibidos.
            action.contributedTreesVariation = action.contributedTreesVariation ?? 0;
            return {
                ...state,
                balance: state.balance + action.balanceVariation,
                contributedTrees: state.contributedTrees + action.contributedTreesVariation
            }
        case types.addContact: // Agrega el nuevo contacto al array de contactos.
            return {
                ...state,
                contacts: [...state.contacts, ...action.newContact] //
            }
        case types.addTransactions:
            let lastTransactions = [action.transaction, state.lastTransactions[0], state.lastTransactions[1]];
            return {
                ...state,
                lastTransactions: lastTransactions
            }
        default:
            return state;
    }
}

export { initialStore, types }
export default storeReducer