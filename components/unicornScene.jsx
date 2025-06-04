'use client';

import { useEffect, useRef, useState } from 'react';

export default function UnicornScene({
  projectId,
  jsonFilePath,
  width = '100%',
  height = '100%',
  scale = 1,
  dpi = 1.5,
  fps = 60,
  altText = 'Unicorn Scene',
  ariaLabel,
  className = '',
  lazyLoad = false,
}) {
  const elementRef = useRef(null);
  const sceneRef = useRef(null);
  const [error, setError] = useState(null);
  const scriptId = useRef(`us-data-${Math.random().toString(36).slice(2)}`);
  const label = ariaLabel || altText;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initializeScript = (callback) => {
      const version = '1.4.25';

      const existingScript = document.querySelector(
        'script[src^="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js"]'
      );

      if (existingScript) {
        if (window.UnicornStudio) {
          callback();
        } else {
          existingScript.addEventListener('load', callback);
        }
        return;
      }

      const script = document.createElement('script');
      script.src = `https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v${version}/dist/unicornStudio.umd.js`;
      script.async = true;

      script.onload = () => {
        callback();
      };

      script.onerror = () => setError('Failed to load UnicornStudio script');

      document.body.appendChild(script);
    };

    const initializeScene = async () => {
      if (!elementRef.current) return;

      if (jsonFilePath) {
        elementRef.current.setAttribute('data-us-project-src', jsonFilePath);
      } else if (projectId) {
        const [cleanProjectId, query] = projectId.split('?');
        const production = query?.includes('production');

        elementRef.current.setAttribute('data-us-project', cleanProjectId);
        if (production) {
          elementRef.current.setAttribute('data-us-production', '1');
        }
      } else {
        setError('No project ID or JSON file path provided');
        return;
      }

      const UnicornStudio = window.UnicornStudio;

      if (!UnicornStudio) {
        setError('UnicornStudio not found');
        return;
      }

      if (sceneRef.current?.destroy) {
        sceneRef.current.destroy();
      }

      try {
        const scenes = await UnicornStudio.init({ scale, dpi });
        const scene = scenes.find(
          (s) =>
            s.element === elementRef.current ||
            s.element.contains(elementRef.current)
        );
        if (scene) {
          sceneRef.current = scene;
        }
      } catch (err) {
        setError('Failed to initialize scene');
      }
    };

    initializeScript(() => {
      initializeScene();
    });

    return () => {
      if (sceneRef.current?.destroy) {
        sceneRef.current.destroy();
        sceneRef.current = null;
      }

      if (jsonFilePath) {
        const script = document.getElementById(scriptId.current);
        if (script) script.remove();
      }
    };
  }, [projectId, jsonFilePath, scale, dpi]);

  return (
    <div
      ref={elementRef}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      className={`relative ${className}`}
      role="img"
      aria-label={label}
      data-us-dpi={dpi}
      data-us-scale={scale}
      data-us-fps={fps}
      data-us-alttext={altText}
      data-us-arialabel={label}
      data-us-lazyload={lazyLoad ? 'true' : ''}
    >
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
