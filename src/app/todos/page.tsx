"use client";
import { decrement, increment } from "@/store/features/counterSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="space-x-2">
      <button onClick={() => dispatch(decrement())}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
}
