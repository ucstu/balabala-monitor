import { ReportDataTypes } from "../common/types";
export declare const reportAll: () => void;
export declare const realTimeReport: <K extends keyof ReportDataTypes>(
  apiId: K,
  data: ReportDataTypes[K][]
) => void;
export declare const stagingReport: <K extends keyof ReportDataTypes>(
  apiId: K,
  data: ReportDataTypes[K]
) => void;
