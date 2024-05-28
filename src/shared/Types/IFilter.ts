export const enum operatorEnum {
  /**
   * "IGUAL"
   */
  EQUAL = "EQUAL",

  /**
   * "NO IGUAL"
   */
  NOT_EQUAL = "NOT_EQUAL",

  /**
   * "MENOS DE"
   */
  LESS_THAN = "LESS_THAN",

  /**
   * "MAYOR QUE"
   */
  GREATER_THAN = "GREATER_THAN",

  /**
   * "MENOR O IGUAL QUE"
   */
  LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL",

  /**
   * "MAYOR O IGUAL QUE"
   */
  GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
}

export interface Filter<T> {
  field: keyof T;
  value: string | number | boolean;
  operator: operatorEnum;
}

export interface CriteriaRequest<T> {
  criteria: Filter<T>[];
}
