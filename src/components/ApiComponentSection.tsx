import React from "react";
import clsx from "clsx";

interface ApiComponentSectionProps {
  name: string;
  schema: any;
  className?: string;
  classes?: {
    root?: string;
    header?: string;
    name?: string;
    table?: string;
    th?: string;
    td?: string;
    description?: string;
  };
}

export const ApiComponentSection: React.FC<ApiComponentSectionProps> = ({ name, schema, className, classes = {} }) => (
  <div className={clsx("bg-card rounded-lg px-3 py-2 border border-border", className, classes.root)}>
    <div className={clsx("flex items-center gap-2 mb-1", classes.header)}>
      <span className={clsx("font-mono text-xs text-card-foreground font-bold", classes.name)}>{name}</span>
      {schema.description && (
        <span className={clsx("ml-2 text-muted-foreground text-xs", classes.description)}>{schema.description}</span>
      )}
    </div>
    {schema.properties && (
      <table className={clsx("w-full text-xs mb-2", classes.table)}>
        <thead>
          <tr className={clsx("text-left text-muted-foreground")}>
            <th className={clsx("pr-4", classes.th)}>Property</th>
            <th className={clsx("pr-4", classes.th)}>Type</th>
            <th className={clsx("pr-4", classes.th)}>Required</th>
            <th className={classes.th}>Description</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(schema.properties).map(([prop, propSchema]: any) => (
            <tr key={prop} className="align-top">
              <td className={clsx("font-mono pr-4 text-card-foreground", classes.td)}>{prop}</td>
              <td className={clsx("pr-4", classes.td)}>{propSchema.type || '-'}</td>
              <td className={clsx("pr-4", classes.td)}>{schema.required?.includes(prop) ? <span className="text-red-500 font-bold">Yes</span> : 'No'}</td>
              <td className={clsx(classes.td)}>{propSchema.description && <span className="text-muted-foreground">{propSchema.description}</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    {!schema.properties && (
      <pre className="bg-muted p-2 rounded text-xs overflow-x-auto border border-border text-card-foreground">{JSON.stringify(schema, null, 2)}</pre>
    )}
  </div>
);
