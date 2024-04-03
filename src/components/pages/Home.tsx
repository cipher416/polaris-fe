import { createSignal } from "solid-js";
import { Button } from "../ui/button";

export default function Home() {
  const [count, setCount] = createSignal(0);
  return (
    <div>
      <p>{count()}</p>
      <Button onClick={() => setCount(count() + 1)}>Hello</Button>
    </div>
  );
}
