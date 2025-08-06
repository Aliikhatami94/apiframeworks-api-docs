import React from "react";
import clsx from "clsx";
import { ApiComponentSection } from "./ApiComponentSection";

interface ComponentsSectionProps {
  components: { [name: string]: any };
  className?: string;
  classes?: {
    componentsSection?: string;
    componentsTitle?: string;
    componentsList?: string;
    component?: string;
    componentClasses?: {
      root?: string;
      header?: string;
      name?: string;
      table?: string;
      th?: string;
      td?: string;
      description?: string;
    };
  };
}

export const ComponentsSection: React.FC<ComponentsSectionProps> = ({ components, className, classes = {} }) => {
  if (!components || Object.keys(components).length === 0) return null;
  return (
    <div className={clsx("mt-12", className, classes.componentsSection)}>
      <h2 className={clsx("text-lg font-bold mb-4 text-card-foreground", classes.componentsTitle)}>Components</h2>
      <div className={clsx("space-y-4", classes.componentsList)}>
        {Object.entries(components).map(([name, schema]) => (
          <div id={`component-${name}`} key={name}>
            <ApiComponentSection name={name} schema={schema} className={classes.component} classes={classes.componentClasses} />
          </div>
        ))}
      </div>
    </div>
  );
};

