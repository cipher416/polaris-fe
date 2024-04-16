import { createSignal } from "solid-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TextField, TextFieldInput, TextFieldLabel } from "../ui/textfield";

export default function AccountPage() {
  const [count, setCount] = createSignal(0);
  return (
    <Card class="w-full flex">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Account Information</CardDescription>
        <CardContent class="flex space-x-2 items-center">
          <TextField disabled class="w-full">
            <TextFieldLabel class="font-bold">Username</TextFieldLabel>
            <TextFieldInput type="text" placeholder="test" class="w-full" />
          </TextField>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
