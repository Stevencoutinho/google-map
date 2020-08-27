export const Reducer = (state, action) => {
  switch(action.type) {
    case 'mapTypeId':
      return {...state, [action.type]: action.value};
    case 'Region':
      return {...state, hotel: {...state.hotel, reg: action.value}};
    case 'Prefecture':
      return {...state, hotel: {...state.hotel, pref: action.value, l_area: null, s_area: null}};
    case 'LargeArea':
      return {...state, hotel: {...state.hotel, l_area: action.value, s_area: null}};
    case 'SmallArea':
      return {...state, hotel: {...state.hotel, s_area: action.value}};
    case 'Hotel':
      return {...state, result: action.value};
    default:
      return {...state, [action.type] : action.value === 'true'};
  }
};