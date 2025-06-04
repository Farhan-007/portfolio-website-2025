'use client';
import { useEffect, useRef } from "react";

export default function UnicornStudioEmbed({
  projectId,
  projectJSON,
  scale = 1,
  dpi = 1.5,
  fps = 60,
  altText = "Unicorn Studio Scene",
  ariaLabel = "Unicorn Studio",
  lazyLoad = false,
  header = "",
  style = {}
}) {
  const elementRef = useRef(null);
  const sceneRef = useRef(null);
  const scriptId = useRef(`unicorn-project-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const initializeScript = (callback) => {
      const existingScript = document.querySelector(
        'script[src^="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js"]'
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.25/dist/unicornStudio.umd.js";
        script.onload = callback;
        script.onerror = () => console.error("Failed to load UnicornStudio script");
        document.head.appendChild(script);
      } else {
        if (window.UnicornStudio) {
          callback();
        } else {
          const waitForLoad = setInterval(() => {
            if (window.UnicornStudio) {
              clearInterval(waitForLoad);
              callback();
            }
          }, 100);
        }
      }
    };

    const initializeUnicornStudio = () => {
      const el = elementRef.current;
      if (!el) return;

      if (projectJSON) {
        try {
          const dataScript = document.createElement("script");
          dataScript.id = scriptId.current;
          dataScript.type = "application/json";
          dataScript.textContent = projectJSON;
          document.head.appendChild(dataScript);
          el.setAttribute("data-us-project-src", scriptId.current);
        } catch (e) {
          console.error("Failed to parse project JSON:", e);
        }
      } else if (projectId) {
        const [id, query] = projectId.split("?");
        const production = query?.includes("production");
        el.setAttribute("data-us-project", id + (query ? `?${query}` : ""));
        if (production) el.setAttribute("data-us-production", "1");
      }

      if (window.UnicornStudio) {
        window.UnicornStudio.init().then((scenes) => {
          const ourScene = scenes.find(
            (scene) => scene.element === el || scene.element.contains(el)
          );
          if (ourScene) sceneRef.current = ourScene;
        });
      }
    };

    if (projectId || projectJSON) {
      if (window.UnicornStudio) {
        initializeUnicornStudio();
      } else {
        initializeScript(initializeUnicornStudio);
      }
    }

    return () => {
      sceneRef.current?.destroy?.();
      document.getElementById(scriptId.current)?.remove();
    };
  }, [projectId, projectJSON]);

  return (
    <div
      ref={elementRef}
      data-us-dpi={dpi}
      data-us-scale={scale}
      data-us-fps={fps}
      data-us-altText={altText}
      data-us-ariaLabel={ariaLabel}
      data-us-lazyload={lazyLoad ? "true" : ""}
      role="img"
      aria-label={ariaLabel}
      style={{ width: "100%", height: "100%", ...style }}
    >
      {header && (
        <h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
          {header}
        </h1>
      )}
    </div>
  );
}
