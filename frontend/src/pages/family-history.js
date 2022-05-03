import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { PageFitMode, Enabled, GroupByType } from "basicprimitives";
import { FamDiagram } from "basicprimitivesreact";

const the_style = {
  width: "100%",
  height: "600px",
};

var photos = {
  adopted_female: "pedigree/adopted_female.png",
  adopted_male: "pedigree/adopted_male.png",
  asymptomatic_carrier_female: "pedigree/asymptomatic_carrier_female.png",
  asymptomatic_carrier_male: "pedigree/asymptomatic_carrier_male.png",
  female_carrier: "pedigree/female_carrier.png",
  female_deceased: "pedigree/female_deceased.png",
  female_trait: "pedigree/female_trait.png",
  female: "pedigree/female.png",
  male_carrier: "pedigree/male_carrier.png",
  male_deceased: "pedigree/male_deceased.png",
  male_trait: "pedigree/male_trait.png",
  male: "pedigree/male.png",
  miscarriage: "pedigree/miscarriage.png",
  sex_unspecified: "pedigree/sex_unspecified.png",
  stillbirth_female: "pedigree/stillbirth_female.png",
  stillbirth_male: "pedigree/stillbirth_male.png",
  termination: "pedigree/termination.png",
};

const FamilyHistory = () => {
  const [config, setConfig] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const blankMemberForm = {
    type: "",
    name: "",
    description: "",
    parent1: null,
    parent2: null,
  };
  const [formCreateData, setFormCreateData] = useState(blankMemberForm);
  const {
    memberType,
    memberName,
    memberDescription,
    memberParent1,
    memberParent2,
  } = formCreateData;

  const handleCreateModalClose = (isCreating) => {
    setShowCreateModal(false);
    if (isCreating) {
      addFamilyMember(formCreateData);
    } else {
      setFormCreateData(blankMemberForm);
    }
    // console.log(JSON.stringify(formCreateData));
  };
  const handleCreateModalShow = () => {
    setShowCreateModal(true);
  };
  const handleEditModalClose = () => {
    setShowEditModal(false);
  };
  const handleEditModalShow = () => {
    setShowEditModal(true);
  };

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
          image: photos.male,
        },
        {
          id: 2,
          title: "Mary Spencer",
          label: "Mary Spencer",
          description: "The Mary",
          image: photos.male,
        },
        {
          id: 3,
          title: "David Kirby",
          label: "David Kirby",
          description: "2nd Husband",
          image: photos.male,
        },
        {
          id: 4,
          parents: [1, 2],
          title: "Brad Williams",
          label: "Brad Williams",
          description: "1st son",
          image: photos.male,
        },
        {
          id: 5,
          parents: [2, 3],
          title: "Mike Kirby",
          label: "Mike Kirby",
          description: "2nd son, having 2 spouses",
          image: photos.male,
        },
        {
          id: 6,
          title: "Lynette Maloney",
          label: "Lynette Maloney",
          description: "Spouse I",
          image: photos.male,
        },
        {
          id: 11,
          parents: [5, 6],
          title: "Steven Powell",
          label: "Steven Powell",
          description: "1st son",
          image: photos.male,
        },
        {
          id: 7,
          title: "Sara Kemp",
          label: "Sara Kemp",
          description: "Spouse II",
          image: photos.male,
        },
        {
          id: 12,
          parents: [5, 7],
          title: "John Smith",
          label: "John Smith",
          description: "2ns son",
          image: photos.male,
        },
        {
          id: 8,
          parents: [7],
          title: "Leon Kemp",
          label: "Leon Kemp",
          description: "",
          image: photos.male,
        },
      ],
    };
    setConfig(initialConfig);
  }, []);

  const getHighestID = () => {
    const { items } = config;
    var highestID = 1;
    items.forEach((familyItem) => {
      if (familyItem.id > highestID) {
        highestID = familyItem.id;
      }
    });
    return highestID;
  };

  const update = (e) => {
    e.preventDefault();
    const oldConfig = config;
    const { items } = config;

    setConfig({ ...oldConfig, items: items });
  };

  const onChangeForm = (e) => {
    const { name, value } = e.target;
    setFormCreateData({ ...formCreateData, [name]: value });
  };

  const addFamilyMember = (familyMember) => {
    const newID = getHighestID() + 1;
    var new_item;
    if (familyMember.parent1 && familyMember.parent2) {
      new_item = {
        id: newID,
        parents: [familyMember.parent1, familyMember.parent2],
        title: familyMember.name,
        label: familyMember.name,
        description: familyMember.description,
        image: familyMember.type,
      };
    } else {
      new_item = {
        id: newID,
        title: familyMember.name,
        label: familyMember.name,
        description: familyMember.description,
        image: familyMember.type,
      };
    }
    const { items } = config;
    items.push(new_item);
    setConfig({ ...config, items: items });
  };

  return (
    <>
      <div style={the_style}>
        <FamDiagram centerOnCursor={true} config={config} />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleCreateModalShow}
        >
          Create
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleEditModalShow}
        >
          Edit
        </button>
      </div>
      <Modal show={showCreateModal} onHide={handleCreateModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a family member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Enter the family member fields</p>
          <Form.Select name="type" value={memberType} onChange={onChangeForm}>
            <option>Type:</option>
            {Object.keys(photos).map((key) => {
              return (
                <option value={photos[key]} key={key}>
                  {key}
                </option>
              );
            })}
          </Form.Select>
          <>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              name="name"
              value={memberName}
              onChange={onChangeForm}
              aria-describedby="nameHelpBlock"
            />
          </>
          <>
            <Form.Label htmlFor="description">Description/Symptoms</Form.Label>
            <Form.Control
              type="text"
              id="description"
              name="description"
              value={memberDescription}
              onChange={onChangeForm}
              aria-describedby="descriptionHelpBlock"
            />
          </>
          <>
            <p>Parent 1</p>
            <Form.Select
              name="parent1"
              value={memberParent1}
              onChange={onChangeForm}
            >
              <option>Parent 1:</option>
              {config.items
                ? config.items.map((familyMember) => {
                    return (
                      <option value={familyMember.id} key={familyMember.id}>
                        {familyMember.title}
                      </option>
                    );
                  })
                : "Loading"}
            </Form.Select>
          </>
          <>
            <p>Parent 2</p>
            <Form.Select
              name="parent2"
              value={memberParent2}
              onChange={onChangeForm}
            >
              <option>Parent 2:</option>
              {config.items
                ? config.items.map((familyMember) => {
                    return (
                      <option value={familyMember.id} key={familyMember.id}>
                        {familyMember.title}
                      </option>
                    );
                  })
                : "Loading"}
            </Form.Select>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCreateModalClose(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleCreateModalClose(true);
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a family member</Modal.Title>
        </Modal.Header>
        <Modal.Body>Edit the family member fields</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditModalClose}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FamilyHistory;
