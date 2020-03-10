import { testing } from "./src/client/js/testing"

test(".add(What time ist it?)", () => {
    expect(testing("What time ist it?")).toBe(true);
  });

test.each([
    ["23 is my favorite number"],
    ["!What's wrong?"],
    ["D"],
    ["These happen to be a tiny amount more than onehundred characters it should therefore return wrong when given as an argument for testing()"]
    ])(".add(%s)", (string) => {
        expect(testing(string)).toBe(false);
    }   
)