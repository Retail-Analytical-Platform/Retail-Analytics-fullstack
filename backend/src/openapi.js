// Proposed success contracts; the website routes currently return 501.
const number = { type: "number" };
const nullableNumber = { type: "number", nullable: true };
const integer = { type: "integer" };
const string = { type: "string" };
const date = { type: "string", format: "date" };
const ref = (name) => ({ $ref: `#/components/schemas/${name}` });
const array = (items) => ({ type: "array", items });
const object = (properties) => ({ type: "object", required: Object.keys(properties), properties });
const schemas = {
  AnalyticsPeriod: object({ year: integer, comparison_year: integer }),
  PeriodComparison: object({ revenue_delta_pct: nullableNumber, transactions_delta_pct: nullableNumber, customers_delta_pct: nullableNumber, average_transaction_value_delta_pct: nullableNumber }),
  OverviewKPIResponse: object({ period: ref("AnalyticsPeriod"), total_revenue: number, total_transactions: integer, total_customers: integer, average_transaction_value: nullableNumber, period_comparison: ref("PeriodComparison") }),
  SalesTrendPoint: object({ month: date, total_revenue: nullableNumber }),
  SalesTrendResponse: object({ period: ref("AnalyticsPeriod"), points: array(ref("SalesTrendPoint")) }),
  InsightsResponse: object({ period: ref("AnalyticsPeriod"), page: { type: "string", enum: ["overview", "analytics"] }, dimension: { type: "string", enum: ["store", "product", "segment", "revenue"], nullable: true }, insights: array(string) }),
  ForecastResponse: object({ dates: array(date), actual: array(nullableNumber), predicted: array(nullableNumber), lower_bound: array(nullableNumber), upper_bound: array(nullableNumber) }),
  ForecastAccuracyResponse: object({ mae: nullableNumber, rmse: nullableNumber, mape: nullableNumber }),
  PredictionRow: object({ month: date, predicted_value: number, range_lower: nullableNumber, range_upper: nullableNumber }),
  ForecastResultResponse: object({ target: { type: "string", enum: ["revenue", "customer", "product"] }, horizon: integer, chart: ref("ForecastResponse"), accuracy: ref("ForecastAccuracyResponse"), table: array(ref("PredictionRow")), insights: array(string) }),
  WhatIfOptionsResponse: object({ subcategories: array(string), segments: array(string) }),
  WhatIfScenario: object({ tier: { type: "string", enum: ["conservative", "moderate", "aggressive"] }, assumed_increase_pct: number, adjusted_price: number, estimated_units: number, estimated_revenue: number, revenue_change: number, revenue_change_pct: number }),
  WhatIfResponse: object({ current_revenue: number, current_units: number, current_price: number, scenarios: array(ref("WhatIfScenario")), insight_text: string }),
  APIFieldError: object({ field: string, code: string, message: string }),
  APIErrorDetail: object({ code: string, message: string, details: array(ref("APIFieldError")) }),
  APIErrorResponse: object({ error: ref("APIErrorDetail") }),
};
const param = (name, schema, required = false) => ({ name, in: "query", required, schema });
const year = param("year", { type: "integer", minimum: 1, maximum: 9999 });
const routes = {
  "/api/v1/analytics/kpi": ["OverviewKPIResponse", [year]],
  "/api/v1/analytics/sales-trend": ["SalesTrendResponse", [year]],
  "/api/v1/insights": ["InsightsResponse", [param("page", { type: "string", enum: ["overview", "analytics"], default: "overview" }), param("dimension", { type: "string", enum: ["store", "product", "segment", "revenue"] }), year]],
  "/api/v1/forecast": ["ForecastResultResponse", [param("target", { type: "string", enum: ["revenue", "customer", "product"], default: "revenue" }), param("horizon", { type: "integer", minimum: 1, default: 1 })]],
  "/api/v1/whatif/options": ["WhatIfOptionsResponse", []],
  "/api/v1/whatif/simulate": ["WhatIfResponse", [param("subcategory", { type: "string", minLength: 1 }, true), param("segment", { type: "string", minLength: 1 }, true), param("discount_pct", { type: "integer", minimum: 5, maximum: 50, multipleOf: 5 }, true)]],
};
const response = (description, schema) => ({ description, content: { "application/json": { schema: ref(schema) } } });
export default {
  openapi: "3.0.3", info: { title: "Retail Analytics website contracts", version: "1.0.0" },
  paths: Object.fromEntries(Object.entries(routes).map(([path, [schema, parameters]]) => [path, { get: { parameters, responses: { 200: response("Proposed success response; not implemented", schema), 422: response("Invalid request", "APIErrorResponse"), 500: response("Server error", "APIErrorResponse"), 501: response("Feature not ready", "APIErrorResponse") } } }])),
  components: { schemas },
};
