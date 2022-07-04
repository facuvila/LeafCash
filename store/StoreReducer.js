const types = {
    build: 'BUILD',
    updateBalance: 'UPDATEBALANCE',
    addContact: 'ADDCONTACT'
}

const initialStore = {
    balance: 0,
    contacts: [],
    email: '',
    isVendor: false,
    contributedTrees: 0
}

const storeReducer = (state, action) => {
    switch (action.type) {
        case types.build:
            return {
                balance: action.user.balance,
                contacts: action.user.contacts,
                email: action.user.email,
                isVendor: action.user.isVendor,
                contributedTrees: action.user.contributedTrees
            }
        case types.updateBalance: //Reasigna balance y contributedTrees, a los valores recibidos.
            return {
                ...state,
                balance: action.newBalance,
                contributedTrees: action.newContributedTrees
            }
        case types.addContact: // Agrega el nuevo contacto al array de contactos.
            return {
                ...state,
                contacts: [...state.contacts, ...action.newContact] //
            }
        default:
            return state;
    }
}

export { initialStore, types }
export default storeReducer