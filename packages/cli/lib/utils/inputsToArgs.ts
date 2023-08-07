import { Input } from "../commands/command.input";

export function inputsToOptions(inputs: Input[]): string[] {
  return inputs.map(input => !!input.value ? `--${input.name}=${input.value}`: '');
}

export function inputsToArgs(inputs: Input[]): string[] {
  return inputs.map(input => `${input.value}`);
}