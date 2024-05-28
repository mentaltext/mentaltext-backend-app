/* eslint-disable @typescript-eslint/no-explicit-any */
import { Filter, operatorEnum } from "../Types/IFilter";

export const criteriaConverter = <T extends Record<string, any>>(criteria: Filter<T>[]) => {
  return criteria.reduce((acc, filter) => {
    switch (filter.operator) {
      case operatorEnum.EQUAL:
        acc[filter.field as string] = { equals: filter.value };
        break;
      case operatorEnum.NOT_EQUAL:
        acc[filter.field as string] = { not: filter.value };
        break;
      case operatorEnum.LESS_THAN:
        acc[filter.field as string] = { lt: filter.value };
        break;
      case operatorEnum.GREATER_THAN:
        acc[filter.field as string] = { gt: filter.value };
        break;
      case operatorEnum.LESS_THAN_OR_EQUAL:
        acc[filter.field as string] = { lte: filter.value };
        break;
      case operatorEnum.GREATER_THAN_OR_EQUAL:
        acc[filter.field as string] = { gte: filter.value };
        break;
      default:
        throw new Error(`Unsupported operator: ${filter.operator}`);
    }
    return acc;
  }, {});
};
