import { expect } from "chai";
import { describe, it } from "mocha";

describe("Math operations", () => {
  // include the test case
  it("should add two interger", () => {
    const result = 1 + 2;
    expect(result).to.equal(3);
  });

  it("Testing with array", () => {
    const arr = [1, 2, 3];
    expect(arr).to.include(2);
  });
});
