import React from "react";
import { HttpMethod } from "./HttpMethodBadge";
import { useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";

interface ApiDocsSidebarProps {
  tags: { [tag: string]: { path: string; method: HttpMethod; summary: string }[] };
  components?: { [name: string]: any };
  onNavigate?: (id: string) => void;
  /**
   * Custom class names for styling different parts of the sidebar.
   */
  className?: string;
  classes?: {
    root?: string;
    sectionTitle?: string;
    tag?: string;
    endpointList?: string;
    endpointItem?: string;
    endpointLink?: string;
    method?: string;
    path?: string;
    summary?: string;
    // Components section
    componentsSectionTitle?: string;
    componentsList?: string;
    componentItem?: string;
    componentLink?: string;
    componentName?: string;
    componentDescription?: string;
  };
}

export const ApiDocsSidebar: React.FC<ApiDocsSidebarProps> = ({ tags, components = {}, onNavigate, className, classes = {} }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selected = searchParams.get('endpoint') || '';
  const selectedComponent = searchParams.get('component') || '';

  const handleClick = (anchor: string, type: 'endpoint' | 'component') => {
    // Only allow one selection at a time
    const params = new URLSearchParams(window.location.search);
    if (type === 'component') {
      params.delete('endpoint');
      params.set('component', anchor);
      router.replace(`${window.location.pathname}?${params.toString()}`);
      // Wait for the next paint to ensure the DOM is updated before scrolling
      requestAnimationFrame(() => {
        const el = document.getElementById(`component-${anchor}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    } else {
      params.delete('component');
      params.set('endpoint', anchor);
      if (onNavigate) onNavigate(anchor);
      router.replace(`${window.location.pathname}?${params.toString()}`);
    }
  };

  return (
    <nav className={clsx("w-64 min-w-[220px] max-w-xs h-full overflow-y-auto bg-card sticky top-0 p-6", className, classes.root)}>
      <div className={clsx("text-xs font-bold text-muted-foreground mb-4 uppercase tracking-widest", classes.sectionTitle)}>Endpoints</div>
      <ul className={clsx("space-y-6", classes.endpointList)}>
        {Object.entries(tags).map(([tag, endpoints]) => (
          <li key={tag} className={classes.tag}>
            <div className={clsx("text-sm font-semibold text-card-foreground mb-2", classes.tag)}>{tag}</div>
            <ul className={clsx("space-y-1", classes.endpointList)}>
              {endpoints.map(({ path, method, summary }) => {
                const anchor = `${method}-${path.replace(/[^a-zA-Z0-9]/g, "-")}`;
                const isActive = selected === anchor;
                return (
                  <li key={anchor} className={classes.endpointItem}>
                    <a
                      href={`#${anchor}`}
                      className={clsx(
                        "block text-xs px-2 py-1 rounded transition-colors font-mono",
                        isActive ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground hover:text-primary",
                        classes.endpointLink,
                        isActive && classes.endpointLink && `${classes.endpointLink}-active`
                      )}
                      onClick={e => {
                        e.preventDefault();
                        handleClick(anchor, 'endpoint');
                      }}
                    >
                      <span className={clsx("mr-2 uppercase", classes.method)}>{method}</span>
                      <span className={classes.path}>{path}</span>
                      {summary && <span className={clsx("ml-1 text-muted-foreground", classes.summary)}>- {summary}</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
      {components && Object.keys(components).length > 0 && (
        <>
          <div className={clsx("text-xs font-bold text-muted-foreground mt-8 mb-4 uppercase tracking-widest", classes.componentsSectionTitle)}>Components</div>
          <ul className={clsx("space-y-2", classes.componentsList)}>
            {Object.entries(components).map(([name, schema]) => {
              const anchor = name;
              const isActive = selectedComponent === name;
              return (
                <li key={name} className={classes.componentItem}>
                  <a
                    href={`#component-${anchor}`}
                    className={clsx(
                      "block text-xs px-2 py-1 rounded transition-colors font-mono",
                      isActive ? "bg-primary/10 text-primary font-bold" : "text-muted-foreground hover:text-primary",
                      classes.componentLink,
                      isActive && classes.componentLink && `${classes.componentLink}-active`
                    )}
                    onClick={e => {
                      e.preventDefault();
                      handleClick(anchor, 'component');
                    }}
                  >
                    <span className={clsx(classes.componentName)}>{name}</span>
                    {schema.description && <span className={clsx("ml-1 text-muted-foreground", classes.componentDescription)}>- {schema.description}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </nav>
  );
};
