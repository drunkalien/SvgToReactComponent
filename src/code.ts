import { SvgReactConverter } from "./svg-to-react-converter";

figma.showUI(__html__, { width: 500, height: 500 });

const generate = () => {
  const currentSelection = figma.currentPage.selection;

  if (currentSelection.length === 0) {
    figma.ui.postMessage(
      "Please select a frame or group to export as React SVG"
    );
  } else if (currentSelection.length > 1) {
    figma.ui.postMessage(
      "Please select only one frame or group to export as React SVG"
    );
  } else {
    const node = currentSelection[0];

    node.exportAsync({ format: "SVG" }).then((svg) => {
      const svgString = String.fromCharCode(...new Uint8Array(svg));
      const parser = new SvgReactConverter(svgString);
      const component = `
import React from "react";

const Component = () => (
  ${parser.parse()}
);

export default Component;
        `;
      figma.ui.postMessage(component);
    });
  }
};

// Listen for messages from the UI
figma.ui.onmessage = (msg) => {
  if (msg === "generate-component") {
    generate();
  }
};
