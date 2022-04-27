const Symptom = require("../models/symptom.model");
const User = require("../models/user.model");

const getMatches = async (req, res) => {
  const currentUserSymptoms = await Symptom.find({ user: req.user.id });
  const otherUserSymptoms = await Symptom.find({ user: { $ne: req.user.id } });
  const matchingSymptoms = doMatch(currentUserSymptoms, otherUserSymptoms);
  const matchingUsersAndSymptoms = await findMatchingUsers(matchingSymptoms);
  res.status(200).json(matchingUsersAndSymptoms);
};

// Performs a matching algorithm which returns top 10 matching symptoms
const doMatch = (currentUserSymptoms, otherUserSymptoms) => {
  return exactStringMatch(currentUserSymptoms, otherUserSymptoms);
};

const exactStringMatch = (currentUserSymptoms, otherUserSymptoms) => {
  var matchingSymptoms = [];
  currentUserSymptoms.forEach((currentUserSymptom) => {
    otherUserSymptoms.forEach((otherUserSymptom) => {
      if (currentUserSymptom.text === otherUserSymptom.text) {
        matchingSymptoms.push(otherUserSymptom);
      }
    });
  });
  return matchingSymptoms;
};

// obtains only the emails and symptoms of the users for which you
// have matching symptoms
const findMatchingUsers = async (matchingSymptoms) => {
  const userEmailsAndSymptoms = matchingSymptoms.map(async (symptom) => {
    const matchingUser = await User.findById(symptom.user);
    return { email: matchingUser.email, symptom: symptom };
  });
  return Promise.all(userEmailsAndSymptoms);
};

module.exports = {
  getMatches,
};
