import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { increment, decrement, incrementByCount } from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  //   console.log("counter", count);

  const [incrementCount, setIncrementCount] = useState(0);

  const numberToIncrement = Number(incrementCount) || 0;

  return (
    <section>
      <p>{count}</p>
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <br />
      <input type="text" onChange={(e) => setIncrementCount(e.target.value)} />

      <button onClick={() => dispatch(incrementByCount(numberToIncrement))}>
        Increment by Count : {numberToIncrement}
      </button>
    </section>
  );
};

export default Counter;
