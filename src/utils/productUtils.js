export const setFormValuesFromProduct = (setFormValues, productDetails) => {
    setFormValues({
      coutuCode: productDetails.coutuCode,
      frenchDescription: productDetails.frenchDescription,
      englishDescription: productDetails.englishDescription,
      size: productDetails.size,
      uom: productDetails.uom,
      unitsPerCase: productDetails.unitsPerCase,
      caseSize: productDetails.caseSize,
      caseUpc: productDetails.caseUpc,
      unitUpc: productDetails.unitUpc,
      unfiCode: productDetails.unfiCode,
      satauCode: productDetails.satauCode,
      puresourceCode: productDetails.puresourceCode,
    });
  };