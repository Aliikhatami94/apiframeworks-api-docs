import React from "react";
import clsx from "clsx";
import { HttpMethod, HttpMethodBadge } from "./HttpMethodBadge";

interface EndpointSectionProps {
  path: string;
  method: HttpMethod;
  operation: any;
  isExpanded?: boolean;
  className?: string;
  classes?: {
    root?: string;
    header?: string;
    method?: string;
    path?: string;
    summary?: string;
    description?: string;
    parameters?: string;
    requestBody?: string;
    responses?: string;
    table?: string;
    th?: string;
    td?: string;
  };
}

export const EndpointSection: React.FC<EndpointSectionProps> = ({ path, method, operation, className, classes = {} }) => (
  <div className={clsx("bg-card rounded-lg px-3 py-2 border border-border", className, classes.root)}>
    <div className={clsx("flex items-center gap-2 mb-1", classes.header)}>
      <HttpMethodBadge method={method} className={classes.method} />
      <span className={clsx("font-mono text-xs text-card-foreground", classes.path)}>{path}</span>
      <span className={clsx("ml-2 font-medium text-card-foreground", classes.summary)}>{operation.summary || operation.operationId || ""}</span>
    </div>
    {operation.description && <div className={clsx("text-xs text-muted-foreground mb-2", classes.description)}>{operation.description}</div>}
    {operation.parameters && operation.parameters.length > 0 && (
      <div className={clsx("mt-2", classes.parameters)}>
        <div className={clsx("font-semibold text-[10px] mb-1 text-muted-foreground uppercase tracking-wide")}>Parameters</div>
        <table className={clsx("w-full text-xs mb-2", classes.table)}>
          <thead>
            <tr className={clsx("text-left text-muted-foreground")}>
              <th className={clsx("pr-4", classes.th)}>Name</th>
              <th className={clsx("pr-4", classes.th)}>In</th>
              <th className={clsx("pr-4", classes.th)}>Type</th>
              <th className={clsx("pr-4", classes.th)}>Required</th>
              <th className={classes.th}>Description</th>
            </tr>
          </thead>
          <tbody>
            {operation.parameters.map((param: any) => (
              <tr key={param.name} className="align-top">
                <td className={clsx("font-mono pr-4 text-card-foreground", classes.td)}>{param.name}</td>
                <td className={clsx("pr-4", classes.td)}>{param.in}</td>
                <td className={clsx("pr-4", classes.td)}>{param.schema?.type || '-'}</td>
                <td className={clsx("pr-4", classes.td)}>{param.required ? <span className="text-red-500 font-bold">Yes</span> : 'No'}</td>
                <td className={clsx(classes.td)}>{param.description && <span className="text-muted-foreground">{param.description}</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
    {operation.requestBody && (
      <div className={clsx("mt-2", classes.requestBody)}>
        <div className={clsx("font-semibold text-[10px] mb-1 text-muted-foreground uppercase tracking-wide")}>Request Body</div>
        <pre className={clsx("bg-muted p-2 rounded text-xs overflow-x-auto border border-border text-card-foreground")}>{JSON.stringify(operation.requestBody, null, 2)}</pre>
      </div>
    )}
    {operation.responses && (
      <div className={clsx("mt-2", classes.responses)}>
        <div className={clsx("font-semibold text-[10px] mb-1 text-muted-foreground uppercase tracking-wide")}>Responses</div>
        <table className={clsx("w-full text-xs", classes.table)}>
          <thead>
            <tr className={clsx("text-left text-muted-foreground")}>
              <th className={clsx("pr-4", classes.th)}>Code</th>
              <th className={classes.th}>Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(operation.responses).map(([code, resp]: any) => (
              <tr key={code}>
                <td className={clsx("font-mono pr-4 text-card-foreground", classes.td)}>{code}</td>
                <td className={clsx(classes.td)}>{resp.description || "No description"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
