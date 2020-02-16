const updateCheckbox = favouriteCheckBoxes => {
  favouriteCheckBoxes.forEach(box => {
    document.getElementById(`fav-${box}`).checked = true;
  });
};

const colorDaily = (key, val) => {
  const el = document.getElementById(`daily-${key}`)
  if (val[1] < 0) {
    (el.style.color = '#E95157');
  } else {
    (el.style.color = '#1A9451');
  };
}

function favouriteReducer (state, action) {
  switch (action.type) {
  case 'ADD_FAVOURITE':
    return [ ...state, ...action.item ];
  case 'REMOVE_FAVOURITE':
    return state.filter(obj => !action.item.includes(obj));
  case 'CHECK_BOX':
    updateCheckbox(state);
    break;
  default:
    return state;
  }
}

function activeReducer (state, action) {
  switch (action.type) {
  case 'ACTIVATE':
    return action.active;
  default:
    return state;
  }
}

function coinsReducer (state, action) {
  switch (action.type) {
  case 'INIT':
    return { ...action.response };
  case 'DAILY':
    Object.entries(state).forEach(([key, val]) => {
      colorDaily(key, val);
    })
    break;
  case 'UPDATE':
    // eslint-disable-next-line no-case-declarations
    const { symbol, data }  = action.response;
    colorDaily(symbol, data);
    return { ...state, [symbol]: data };
  default:
    return state;
  }
}

export default function appReducer (state, action) {
  return {
    favourite: favouriteReducer(state.favourite, action),
    active: activeReducer(state.active, action),
    coins: coinsReducer(state.coins, action),
  };
};
