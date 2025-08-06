import React from "react";
import clsx from "clsx";
import { HttpMethod, isHttpMethod } from "./HttpMethodBadge";
import { EndpointSection } from "./EndpointSection";
import { ApiDocsSidebar } from "./ApiDocsSidebar";
import { ComponentsSection } from "./ComponentsSection";

interface ApiFrameworksDocProps {
  spec: any | null;
  isExpanded?: boolean;
  /**
   * Custom class names for styling different parts of the doc UI.
   */
  classNames?: {
    root?: string;
    sidebar?: string;
    main?: string;
    header?: string;
    title?: string;
    description?: string;
    section?: string;
    path?: string;
    endpointSection?: string;
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
    sidebarClasses?: {
      root?: string;
      sectionTitle?: string;
      tag?: string;
      endpointList?: string;
      endpointItem?: string;
      endpointLink?: string;
      method?: string;
      path?: string;
      summary?: string;
      componentsSectionTitle?: string;
      componentsList?: string;
      componentItem?: string;
      componentLink?: string;
      componentName?: string;
      componentDescription?: string;
    };
  };
}

function groupEndpointsByTag(paths: any): { [tag: string]: { path: string; method: HttpMethod; summary: string }[] } {
  const grouped: { [tag: string]: { path: string; method: HttpMethod; summary: string }[] } = {};
  Object.entries(paths).forEach(([path, methods]) => {
    Object.entries(methods as Record<string, any>)
      .filter(([method]) => isHttpMethod(method))
      .forEach(([method, op]: [string, any]) => {
        const tags = op.tags && op.tags.length ? op.tags : ["General"];
        tags.forEach((tag: string) => {
          if (!grouped[tag]) grouped[tag] = [];
          grouped[tag].push({ path, method: method as HttpMethod, summary: op.summary || op.operationId || "" });
        });
      });
  });
  return grouped;
}

export const ApiFrameworksDoc: React.FC<ApiFrameworksDocProps> = ({ spec, isExpanded, classNames = {} }) => {
  if (!spec) {
    return <div className="text-muted-foreground text-sm">No API spec loaded.</div>;
  }

  const paths = spec.paths || {};
  const info = spec.info || {};
  const tags = groupEndpointsByTag(paths);
  const components = spec.components?.schemas || {};

  // Smooth scroll to anchor
  const handleNavigate = (id: string) => {
    // Try both endpoint and component anchors
    let el = document.getElementById(id);
    if (!el && id.startsWith('component-')) {
      // fallback: try just the name
      el = document.getElementById(id.replace('component-', ''));
    }
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className={clsx(
        "w-full p-0 animate-fade-in bg-card",
        isExpanded && "flex flex-row h-full",
        classNames.root
      )}
    >
      {isExpanded && (
        <div className={clsx("hidden md:block border-r border-border", classNames.sidebar)}>
          <ApiDocsSidebar tags={tags} components={components} onNavigate={handleNavigate} className={classNames.sidebar} classes={classNames.sidebarClasses} />
        </div>
      )}
      <div
        className={clsx(
          isExpanded ? "flex-1 overflow-y-auto" : "text-xs leading-relaxed px-4 py-4 max-w-full min-h-full",
          classNames.main
        )}
      >
        <div
          className={clsx(
            "border-b border-border",
            isExpanded ? "px-8 pt-10 pb-6 " : "pb-4",
            classNames.header
          )}
        >
          <h1
            className={clsx(
              isExpanded ? "text-3xl font-bold mb-2 text-card-foreground" : "text-lg font-semibold mb-1 text-card-foreground",
              classNames.title
            )}
          >
            {info.title || "API Documentation"}
          </h1>
          {info.description && (
            <p
              className={clsx(
                isExpanded
                  ? "mb-4 text-muted-foreground text-lg max-w-3xl"
                  : "mb-2 text-muted-foreground text-xs max-w-2xl",
                classNames.description
              )}
            >
              {info.description}
            </p>
          )}
        </div>
        <div className={clsx(isExpanded ? "space-y-12 px-8 py-8" : "space-y-6 py-4", classNames.section)}>
          {/* Endpoints */}
          {Object.entries(paths).map(([path, methods]) => (
            <div key={path} className={classNames.path}>
              <h2
                className={clsx(
                  "font-mono rounded w-fit bg-primary/10 text-primary px-2 py-1",
                  isExpanded ? "text-sm mb-4" : "text-xs mb-2",
                  classNames.path
                )}
              >
                {path}
              </h2>
              <div className={clsx(isExpanded ? "space-y-4" : "space-y-2")}>
                {Object.entries(methods as Record<string, any>)
                  .filter(([method]) => isHttpMethod(method))
                  .map(([method, op]) => {
                    const anchor = `${method}-${path.replace(/[^a-zA-Z0-9]/g, "-")}`;
                    return (
                      <div id={anchor} key={method} className={classNames.endpointSection}>
                        <EndpointSection path={path} method={method as HttpMethod} operation={op} isExpanded={isExpanded} className={classNames.endpointSection} />
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
          {/* Components */}
          <ComponentsSection
            components={components}
            className={classNames.componentsSection}
            classes={{
              componentsSection: classNames.componentsSection,
              componentsTitle: classNames.componentsTitle,
              componentsList: classNames.componentsList,
              component: classNames.component,
              componentClasses: classNames.componentClasses,
            }}
          />
        </div>
      </div>
    </div>
  );
};
