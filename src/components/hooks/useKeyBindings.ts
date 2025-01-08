import { useEffect } from "react";

interface KeyBinding {
  keys: string[]; // A combination of keys to trigger the callback (e.g., ["Control", "k"])
  callback: () => void; // The function to execute when the keys are pressed
}

export function useKeyBindings(bindings: KeyBinding[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      bindings.forEach(({ keys, callback }) => {
        const normalizedKeys = keys.map((key) => key.toLowerCase());
        const pressedKeys = new Set<string>();

        // Track modifier keys explicitly
        if (event.ctrlKey) pressedKeys.add("control");
        if (event.shiftKey) pressedKeys.add("shift");
        if (event.altKey) pressedKeys.add("alt");
        if (event.metaKey) pressedKeys.add("meta");

        // Add the actual key pressed
        if (event.key) pressedKeys.add(event.key.toLowerCase());

        // Match exactly: pressed keys must match the defined keys
        const isExactMatch =
          pressedKeys.size === normalizedKeys.length &&
          normalizedKeys.every((key) => pressedKeys.has(key));

        if (isExactMatch) {
          event.preventDefault(); // Prevent default behavior
          callback(); // Execute the callback
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [bindings]);
}