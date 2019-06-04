import fresh from "@unction/fresh";
import mergeRight from "@unction/mergeright";
import objectFrom from "@unction/objectfrom";
import reduceWithValueKey from "@unction/reducewithvaluekey";
import isObject from "@unction/isobject";
import isArray from "@unction/isarray";

const isEitherObjectOrArray = (value) => isObject(value) || isArray(value);

export default function withoutKeyRecursive (key) {
  return function withoutKeyRecursiveKey (original) {
    return reduceWithValueKey((accumulated) => {
      const accumulatedMerge = mergeRight(accumulated);

      return function withoutKeyRecursiveKeyIterableValue (current) {
        const isIterable = isEitherObjectOrArray(current);

        return function withoutKeyRecursiveKeyIterableValueKey (index) {
          if (key === index) {
            return accumulated;
          }

          if (isIterable) {
            return accumulatedMerge(objectFrom([index])(withoutKeyRecursive(key)(current)));
          }

          return accumulatedMerge(objectFrom([index])(current));
        };
      };
    })(fresh(original))(original);
  };
}
