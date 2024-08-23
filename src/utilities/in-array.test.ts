import { describe, it, expect } from "vitest";
import inArray from "./in-array";

describe("inArray", () => {
  it("Returns true if the value exists in the array", () => {
    const array = [1, 2, 3];
    const value = 2;

    const result = inArray(array, value);

    expect(result).toBe(true);
  });

  it("Returns false if the value does not exist in the array", () => {
    const array = [1, 2, 3];
    const value = 4;

    const result = inArray(array, value);

    expect(result).toBe(false);
  });

  it("Returns false for an empty array", () => {
    const array: number[] = [];
    const value = 1;

    const result = inArray(array, value);

    expect(result).toBe(false);
  });

  it("Handles arrays with mixed types correctly", () => {
    const array = [1, "two", 3];
    const value = "two";

    const result = inArray(array, value);

    expect(result).toBe(true);
  });

  it("Returns false if value is undefined and not in the array", () => {
    const array = [1, 2, 3];
    const value = undefined;

    const result = inArray(array, value);

    expect(result).toBe(false);
  });

  it("Returns true if value is undefined and is in the array", () => {
    const array = [1, undefined, 3];
    const value = undefined;

    const result = inArray(array, value);

    expect(result).toBe(true);
  });
});
