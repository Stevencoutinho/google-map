const Reducer = (state, action) => {
  switch(action.type) {
    case 'mapTypeId':
      return {...state, [action.type]: action.value};
    default:
      return {...state, [action.type] : action.value === 'true'};
  }
}

export default Reducer;