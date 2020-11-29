import fresh from "@unction/fresh";
import mergeRight from "@unction/mergeright";
import objectFrom from "@unction/objectfrom";
import reduceWithValueKey from "@unction/reducewithvaluekey";
import isType from "@unction/istype";

export default function withoutKeyRecursive<A, B> (target: A) {
  return function withoutKeyRecursiveKey (original: Record<string | number | symbol, B> | Map<A, B>): Record<string | number | symbol, B> | Map<A, B> {
    return reduceWithValueKey(
      (accumulated: Record<string | number | symbol, B> | Map<A, B>) =>
        (current: B) =>
          (key: A): Record<string | number | symbol, B> | Map<A, B> => {
            if (target === key) {
              return accumulated;
            }

            if (isType("Object")(current) || isType("Array")(current) || isType("Map")(current)) {
              return mergeRight(accumulated)(objectFrom([key])(withoutKeyRecursive(target)(current)));
            }

            return mergeRight(accumulated)(objectFrom([key])(current));
          }
    )(
      fresh(original)
    )(
      original
    );
  };
}
