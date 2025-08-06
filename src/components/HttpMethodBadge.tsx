import React from "react";
import {clsx} from "clsx";

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch" | "options" | "head";

const methodColors: Record<HttpMethod, string> = {
  get: "text-green-600 border-green-600",
  post: "text-blue-600 border-blue-600",
  put: "text-yellow-600 border-yellow-600",
  delete: "text-red-600 border-red-600",
  patch: "text-purple-600 border-purple-600",
  options: "text-gray-600 border-gray-600",
  head: "text-gray-600 border-gray-600",
};

export function isHttpMethod(method: string): method is HttpMethod {
  return ["get", "post", "put", "delete", "patch", "options", "head"].includes(method);
}

export const HttpMethodBadge: React.FC<{ method: HttpMethod; className?: string }> = ({ method, className }) => (
  <span className={clsx(
      "uppercase font-bold text-xs px-2 py-1 rounded border",
      methodColors[method],
      className)
  }>{method}</span>
);
