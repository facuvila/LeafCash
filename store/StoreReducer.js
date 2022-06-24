const types = {
    build: 'BUILD',
    updateBalance: 'UPDATEBALANCE',
}

const initialStore = {
    balance: 0,
    contacts: [],
    email: '',
    isVendor: false,
    plantedTrees: 0
}

const storeReducer = (state, action) => {
    switch (action.type) {
        case types.build:
            return {
                balance: action.user.balance,
                contacts: action.user.contacts,
                email: action.user.email,
                isVendor: action.user.isVendor,
                plantedTrees: action.user.plantedTrees
            }
        case types.updateBalance: //Reassigns userData.balance with received value.
            return {
                ...state,
                balance: action.newBalance,
                plantedTrees: action.newPlantedTrees
            }
        default:
            return state;
    }
}

export { initialStore, types }
export default storeReducer