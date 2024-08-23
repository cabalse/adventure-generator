import { describe, it, expect } from "vitest";
import addToArray from "./add-to-array";

describe("addToArray", () => {
  it("Adds a value to the array if it is not already present", () => {
    const array = [1, 2, 3];
    const value = 4;

    addToArray(array, value);

    expect(array).toContain(value);
    expect(array).toEqual([1, 2, 3, 4]);
  });

  it("Does not add a value if it is already present in the array", () => {
    const array = [1, 2, 3];
    const value = 2;

    addToArray(array, value);

    expect(array).toHaveLength(3);
    expect(array).toEqual([1, 2, 3]);
  });

  it("Adds a value to an empty array", () => {
    const array: number[] = [];
    const value = 1;

    addToArray(array, value);

    expect(array).toContain(value);
    expect(array).toEqual([1]);
  });

  it("Does not modify the array if value is undefined", () => {
    const array = [1, 2, 3];
    const value = undefined;

    addToArray(array, value);

    expect(array).toEqual([1, 2, 3]);
  });

  it("Handles adding a value to an array with mixed types", () => {
    const array = [1, "two", 3];
    const value = "four";

    addToArray(array, value);

    expect(array).toContain(value);
    expect(array).toEqual([1, "two", 3, "four"]);
  });
});
