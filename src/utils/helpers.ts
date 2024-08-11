import { ZodIssue } from "zod";

export function validateWithRegex(value: string, regex: RegExp) {
  return regex.test(value);
}
export function formatZodErrors(issues: ZodIssue[]) {
  let errorDetails = [];
  for (const issue of issues) {
    const errObj = {
      field: issue.path[0],
      error: issue.message,
    };
    errorDetails.push(errObj);
  }
  return errorDetails;
}
