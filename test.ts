
import withoutKeyRecursive from "./index.ts";

test(() => {
  expect(withoutKeyRecursive(
    "__abstraction__"
  )(
    {
      id: "1",
      name: "Kurtis Rainbolt-Greene",
      attributes: {
        version: "v1",
        namespace: "accounts",
        __abstraction__: {errors: []},
      },
      __abstraction__: {errors: []},
    }
  )).toEqual({
    id: "1",
    name: "Kurtis Rainbolt-Greene",
    attributes: {
      version: "v1",
      namespace: "accounts",
    },
  });
});
