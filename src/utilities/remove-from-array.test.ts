import { describe, it, expect } from "vitest";
import removeFromArray from "./remove-from-array";

describe("removeFromArray", () => {
  it("Removes a value from the array if it exists", () => {
    const array = [1, 2, 3];
    const value = 2;

    removeFromArray(array, value);

    expect(array).not.toContain(value);
    expect(array).toEqual([1, 3]);
  });

  it("Does not modify the array if the value does not exist", () => {
    const array = [1, 2, 3];
    const value = 4;

    removeFromArray(array, value);

    expect(array).toHaveLength(3);
    expect(array).toEqual([1, 2, 3]);
  });

  it("Handles removing the only value from an array", () => {
    const array = [1];
    const value = 1;

    removeFromArray(array, value);

    expect(array).toHaveLength(0);
    expect(array).toEqual([]);
  });

  it("Does not modify the array if value is undefined", () => {
    const array = [1, 2, 3];
    const value = undefined;

    removeFromArray(array, value);

    expect(array).toEqual([1, 2, 3]);
  });

  it("Removes a value from an array with mixed types", () => {
    const array = [1, "two", 3];
    const value = "two";

    removeFromArray(array, value);

    expect(array).not.toContain(value);
    expect(array).toEqual([1, 3]);
  });
});
