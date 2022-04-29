import React, { useEffect, useState } from "react";

import { OrgDiagram } from "basicprimitivesreact";
import { PageFitMode, Enabled, GroupByType } from "basicprimitives";
import { FamDiagram } from "basicprimitivesreact";

const the_style = {
  width: "100%",
  height: "600px",
};

var photos = {
  square: "square.png",
};

const FamilyHistory = () => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    const initialConfig = {
      pageFitMode: PageFitMode.None,
      cursorItem: 2,
      linesWidth: 1,
      linesColor: "black",
      hasSelectorCheckbox: Enabled.True,
      normalLevelShift: 20,
      dotLevelShift: 20,
      lineLevelShift: 20,
      normalItemsInterval: 10,
      dotItemsInterval: 10,
      lineItemsInterval: 10,
      arrowsDirection: GroupByType.Parents,
      showExtraArrows: false,
      items: [
        {
          id: 1,
          title: "Thomas Williams",
          label: "Thomas Williams",
          description: "1st husband",
          image: photos.square,
        },
        {
          id: 2,
          title: "Mary Spencer",
          label: "Mary Spencer",
          description: "The Mary",
          image: photos.square,
        },
        {
          id: 3,
          title: "David Kirby",
          label: "David Kirby",
          description: "2nd Husband",
          image: photos.square,
        },
        {
          id: 4,
          parents: [1, 2],
          title: "Brad Williams",
          label: "Brad Williams",
          description: "1st son",
          image: photos.square,
        },
        {
          id: 5,
          parents: [2, 3],
          title: "Mike Kirby",
          label: "Mike Kirby",
          description: "2nd son, having 2 spouses",
          image: photos.square,
        },
        {
          id: 6,
          title: "Lynette Maloney",
          label: "Lynette Maloney",
          description: "Spouse I",
          image: photos.square,
        },
        {
          id: 11,
          parents: [5, 6],
          title: "Steven Powell",
          label: "Steven Powell",
          description: "1st son",
          image: photos.square,
        },
        {
          id: 7,
          title: "Sara Kemp",
          label: "Sara Kemp",
          description: "Spouse II",
          image: photos.square,
        },
        {
          id: 12,
          parents: [5, 7],
          title: "John Smith",
          label: "John Smith",
          description: "2ns son",
          image: photos.square,
        },
        {
          id: 8,
          parents: [7],
          title: "Leon Kemp",
          label: "Leon Kemp",
          description: "",
          image: photos.square,
        },
      ],
    };
    setConfig(initialConfig);
  }, []);

  const update = (e) => {
    e.preventDefault();
    const oldConfig = config;
    const { items } = config;

    setConfig({ ...oldConfig, items: items });
  };

  return (
    <div style={the_style}>
      <FamDiagram centerOnCursor={true} config={config} />
      <button type="submit" className="btn btn-primary" onClick={update}>
        Update
      </button>
    </div>
  );
};

export default FamilyHistory;
