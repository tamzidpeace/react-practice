import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import { addAddress } from "./counterSlice";
import { changeCanFly, changeColor, changeName } from "./birdSlice";

function App() {
  const { addresses } = useSelector((state) => state.addressReducer);
  const birdState = useSelector((state) => state.bird);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        {addresses.map((address) => (
          <div key={address.id}>
            <p>{address.street}</p>
            <p>{address.city}</p>
            <p>{address.state}</p>
            <p>{address.zip}</p>
          </div>
        ))}

        <button
          onClick={() =>
            dispatch(
              addAddress({
                id: 2,
                street: "456 Elm St",
                city: "Othertown",
                state: "CA",
                zip: "67890",
              })
            )
          }
        >
          Add Address
        </button>

        <h2>Bird</h2>
        <p>Name: {birdState.name}</p>
        <p>Color: {birdState.color}</p>
        <p>Can Fly: {birdState.canFly ? 'Yes' : 'No'}</p>

        <button onClick={() => dispatch(changeName('sparrow'))}>Change Name</button>
        <button onClick={() => dispatch(changeColor('red'))}>Change Color</button>
        <button onClick={() => dispatch(changeCanFly(false))}>Change Can Fly</button>
      </div>
    </>
  );
}

export default App;
