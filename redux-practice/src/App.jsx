import "./App.css";

import { useSelector, useDispatch } from "react-redux";
import { addAddress } from "./counterSlice";

function App() {
  const { addresses } = useSelector((state) => state.addressReducer);
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
      </div>
    </>
  );
}

export default App;
