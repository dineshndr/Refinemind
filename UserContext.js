// UserContext.js

import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({});
  const [familyDetails, setFamilyDetails] = useState({});
  const [medicineDetails, setMedicineDetails] = useState({
    morningMedications: [],
    noonMedications: [],
    nightMedications: [],
  });

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        familyDetails,
        setFamilyDetails,
        medicineDetails,
        setMedicineDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
