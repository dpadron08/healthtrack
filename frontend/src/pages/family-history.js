import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { PageFitMode, Enabled, GroupByType } from "basicprimitives";
import { FamDiagram } from "basicprimitivesreact";
import { BiTrash, BiEditAlt } from "react-icons/bi";
import treeService from "../services/treeService";

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
  female: "pedigree/female.jpg",
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
  const [items, setItems] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const blankMemberForm = {
    type: "pedigree/sex_unspecified.png",
    name: "",
    description: "",
    parent1: 0,
    parent2: 0,
  };
  const [formCreateData, setFormCreateData] = useState(blankMemberForm);
  var {
    memberType,
    memberName,
    memberDescription,
    memberParent1,
    memberParent2,
  } = formCreateData;
  const [currentEditingID, setCurrentEditingID] = useState(0);

  const handleCreateModalClose = (isCreating) => {
    setShowCreateModal(false);
    if (isCreating) {
      addFamilyMember(formCreateData);
    } else {
      setFormCreateData(blankMemberForm);
    }
  };
  const handleCreateModalShow = (itemConfig) => {
    setShowCreateModal(true);
  };
  const handleEditModalClose = (isEditing) => {
    setShowEditModal(false);
    if (isEditing) {
      editFamilyMember(formCreateData);
    } else {
      setFormCreateData(blankMemberForm);
    }
  };
  const handleEditModalShow = (itemConfig) => {
    setShowEditModal(true);
    setCurrentEditingID(itemConfig.id);
    setFormCreateData({
      type: itemConfig.image,
      name: itemConfig.title,
      description: itemConfig.description,
    });
    if (itemConfig.parents) {
      setFormCreateData({ ...formCreateData, parent1: itemConfig.parents[0] });
      if (itemConfig.parents.length > 1) {
        setFormCreateData({
          ...formCreateData,
          parent2: itemConfig.parents[1],
        });
      }
    }
  };

  const removeFamilyMember = (familyMember) => {
    const id = familyMember.id;
    // remove the family member with the given id and
    // remove the family member as anyone's parent
    const newItems = items
      .filter((itemConfig) => {
        return !(itemConfig.id === id);
      })
      .map((itemConfig) => {
        var theConfig = { ...itemConfig };
        if (theConfig.parents) {
          const idx = theConfig.parents.indexOf(id);
          if (idx > -1) {
            theConfig.parents.splice(idx, 1);
          }
        }
        return theConfig;
      });
    setItems(newItems);
  };

  const editFamilyMember = (editedFamilyMember) => {
    const newItems = items.map((oldItemConfig) => {
      if (!(oldItemConfig.id === currentEditingID)) {
        return oldItemConfig;
      } else {
        if (editedFamilyMember.parent1 && editedFamilyMember.parent2) {
          return {
            id: currentEditingID,
            parents: [
              parseInt(editedFamilyMember.parent1),
              parseInt(editedFamilyMember.parent2),
            ],
            title: editedFamilyMember.name,
            label: editedFamilyMember.name,
            description: editedFamilyMember.description,
            image: editedFamilyMember.type,
          };
        } else {
          return {
            id: currentEditingID,
            title: editedFamilyMember.name,
            label: editedFamilyMember.name,
            description: editedFamilyMember.description,
            image: editedFamilyMember.type,
          };
        }
      }
    });
    setItems(newItems);
  };

  const onTreeButtonsRender = ({ context: itemConfig }) => {
    return (
      <>
        <button
          key="1"
          onClick={(e) => {
            e.stopPropagation();
            handleEditModalShow(itemConfig);
          }}
        >
          <BiEditAlt />
        </button>
        <button
          key="2"
          onClick={(e) => {
            e.stopPropagation();
            removeFamilyMember(itemConfig);
          }}
        >
          <BiTrash />
        </button>
      </>
    );
  };

  const retreiveTree = () => {
    // local storage only stores strings
    const userCookie = JSON.parse(localStorage.getItem("user"));
    if (!userCookie) {
      setItems([]);
      return;
    }
    const token = userCookie["token"];

    if (!token) {
      setItems([]);
      console.log("Error, user cookie found with no token");
      return;
    }
    treeService.getTree(token).then((data) => {
      setItems(data);
    });
  };

  useEffect(retreiveTree, []);

  const updateTree = () => {
    // local storage only stores strings
    const userCookie = JSON.parse(localStorage.getItem("user"));
    if (!userCookie) {
      setItems([]);
      return;
    }
    const token = userCookie["token"];

    if (!token) {
      setItems([]);
      console.log("Error, user cookie found with no token");
      return;
    }
    treeService.updateTree(token, items).then((data) => {
      console.log(data);
    });
  };

  const getHighestID = () => {
    var highestID = 1;
    items.forEach((familyItem) => {
      if (familyItem.id > highestID) {
        highestID = familyItem.id;
      }
    });
    return highestID;
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
        parents: [
          parseInt(familyMember.parent1),
          parseInt(familyMember.parent2),
        ],
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
    items.push(new_item);
    setItems(items);
  };

  const initialConfig = {
    pageFitMode: PageFitMode.None,
    cursorItem: 2,
    linesWidth: 1,
    linesColor: "black",
    hasSelectorCheckbox: Enabled.False,
    hasButtons: Enabled.True,
    onButtonsRender: onTreeButtonsRender,
    buttonsPanelSize: 40,
    normalLevelShift: 20,
    dotLevelShift: 20,
    lineLevelShift: 20,
    normalItemsInterval: 10,
    dotItemsInterval: 10,
    lineItemsInterval: 10,
    arrowsDirection: GroupByType.Parents,
    showExtraArrows: false,
    items: items,
  };

  return (
    <>
      <div style={the_style}>
        <FamDiagram centerOnCursor={true} config={initialConfig} />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleCreateModalShow}
        >
          Create
        </button>{" "}
        <button type="submit" className="btn btn-primary" onClick={updateTree}>
          Save Tree
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
              {items
                ? items.map((familyMember) => {
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
              {items
                ? items.map((familyMember) => {
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
      {/* EDIT MODAL HERE*/}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a family member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Edit the family member fields</p>
          <Form.Select
            name="type"
            value={formCreateData.type}
            onChange={onChangeForm}
          >
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
              value={formCreateData.name}
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
              value={formCreateData.description}
              onChange={onChangeForm}
              aria-describedby="descriptionHelpBlock"
            />
          </>
          <>
            <p>Parent 1</p>
            <Form.Select
              name="parent1"
              value={formCreateData.parent1}
              onChange={onChangeForm}
            >
              <option>Parent 1:</option>
              {items
                ? items.map((familyMember) => {
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
              value={formCreateData.parent2}
              onChange={onChangeForm}
            >
              <option>Parent 2:</option>
              {items
                ? items.map((familyMember) => {
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
              handleEditModalClose(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleEditModalClose(true);
            }}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FamilyHistory;
