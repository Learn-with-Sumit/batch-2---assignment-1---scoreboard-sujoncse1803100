const incrementForm = document.querySelector(".incrementForm");
const decrementForm = document.querySelector(".decrementForm");
const addMatchButton = document.querySelector(".lws-addMatch");

const initialState = {
  arr: [{ id: "0", value: 120 }],
};
const reducer = (state = initialState, action) => {
  if (action.type === "increment") {
    const newArray = state.arr;
    const ob = newArray.find((object) => {
      if (object.id === action.id) {
        return object;
      }
    });
    newArray[action.id] = {
      ...ob,
      value: ob.value + action.value,
    };
    return { arr: newArray };
  } else if (action.type === "decrement") {
    const newArray = state.arr;
    const ob = newArray.find((object) => {
      if (object.id === action.id) {
        return object;
      }
    });
    newArray[action.id] = {
      ...ob,
      value: ob.value > action.value ? ob.value - action.value : 0,
    };
    return { arr: newArray };
  } else if (action.type === "addmatch") {
    const newArray = state.arr;
    const ob = {
      id: action.id,
      value: action.value,
    };
    newArray.push(ob);
    return { arr: newArray };
  } else if (action.type === "reset") {
    const newArray = state.arr.map((ob) => {
      return {
        ...ob,
        value: 0,
      };
    });
    return { arr: newArray };
  } else {
    return state;
  }
};

const store = Redux.createStore(reducer);

// this is for ui update...
const render = () => {
  store.getState().arr.map((ob, i) => {
    const incrementInput = document.querySelector(
      `.match:nth-child(${i + 1}) .lws-singleResult`
    );
    incrementInput.innerText = ob.value;

    const increment = document.querySelector(
      `.match:nth-child(${i + 1})  .lws-increment`
    );
    increment.value = "";
    const decrement = document.querySelector(
      `.match:nth-child(${i + 1})  .lws-decrement`
    );
    decrement.value = "";
  });
};

// this is for set ui initiallly...
render();
store.subscribe(render);

addMatchButton.addEventListener("click", (e) => {
  const arr = store.getState().arr;

  const newMatch = `
        <div class="match">
          <div class="wrapper">
              <button class="lws-delete">
                  <img src="./image/delete.svg" alt="" />
              </button>
              <h3 class="lws-matchName">Match ${(
                arr.length + 1
              ).toString()}</h3>
          </div>
          <div class="inc-dec">
              <form class="incrementForm">
                  <input
                      id=${arr.length.toString()}
                      type="number"
                      name="increment"
                      class="lws-increment"
                  />
              </form>
              <form class="decrementForm">
                  <input
                      id=${arr.length.toString()}
                      type="number"
                      name="decrement"
                      class="lws-decrement"
                  />
              </form>
          </div>
          <div class="numbers">
              <h2 class="lws-singleResult">120</h2>
          </div>
        </div>
  `;

  const matches = document.querySelector(".all-matches");
  matches.innerHTML += newMatch;

  const ob = {
    type: "addmatch",
    id: arr.length.toString(),
    value: 120,
  };

  store.dispatch(ob);
});

const matches = document.querySelector(".all-matches");
matches.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    // Check if input event was triggered on an increment or decrement form
    const isIncrement = event.target.classList.contains("lws-increment");
    const isDecrement = event.target.classList.contains("lws-decrement");

    // If input event was triggered on an increment or decrement form, update the result
    if (isIncrement || isDecrement) {
      const incrementForm1 = event.target.closest(".incrementForm");
      const decrementForm1 = event.target.closest(".decrementForm");
      if (incrementForm1) {
        const element = event.target.closest(".lws-increment");
        store.dispatch({
          type: "increment",
          id: element.id,
          value: parseInt(element.value) ? parseInt(element.value) : 0,
        });
      } else if (decrementForm1) {
        const element = event.target.closest(".lws-decrement");
        store.dispatch({
          type: "decrement",
          id: element.id,
          value: parseInt(element.value) ? parseInt(element.value) : 0,
        });
      }
    }
  }
});

const resetButton = document.querySelector(".lws-reset");
resetButton.addEventListener("click", (e) => {
  e.preventDefault();
  store.dispatch({
    type: "reset",
  });
});
