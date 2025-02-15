// controllers/aadhaar.controller.js
export const verifyAadhaar = (req, res) => {
  const { aadhaarNumber } = req.body;

  // Basic Validation: Check if it is a 12-digit number
  const aadhaarRegex = /^[2-9]{1}[0-9]{11}$/;
  if (!aadhaarRegex.test(aadhaarNumber)) {
    return res.status(400).json({ message: "Invalid Aadhaar number format." });
  }

  // Checksum Validation using Verhoeff Algorithm
  const verhoeffTableD = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  ];
  const verhoeffTableP = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [2, 8, 0, 7, 6, 3, 9, 1, 4, 5],
    [3, 9, 1, 0, 5, 2, 8, 6, 4, 7],
    [4, 0, 5, 9, 7, 1, 3, 6, 8, 2],
    [5, 4, 8, 3, 9, 7, 2, 1, 6, 0],
    [6, 3, 9, 4, 0, 8, 7, 2, 5, 1],
    [7, 2, 6, 5, 1, 9, 0, 4, 3, 8],
    [8, 6, 4, 2, 3, 0, 9, 5, 7, 1],
    [9, 7, 3, 8, 4, 5, 6, 2, 0, 1],
  ];
  const verhoeffTableInv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

  const validateVerhoeff = (aadhaar) => {
    let checksum = 0;
    aadhaar
      .split("")
      .reverse()
      .forEach((digit, i) => {
        checksum = verhoeffTableD[checksum][verhoeffTableP[i % 8][digit]];
      });
    return checksum === 0;
  };

  if (!validateVerhoeff(aadhaarNumber)) {
    return res.status(400).json({ message: "Invalid Aadhaar number." });
  }

  return res.status(200).json({ message: "Aadhaar number is valid." });
};
