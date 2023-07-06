import React, { useState } from "react";
import { ErrorMessage, useField } from "formik";
import TextError from "./TextError";
import { Props } from "../../interface/interface";
import { Box, FormLabel, Image } from "@chakra-ui/react";

const FileInput = ({ label, name }: Props) => {
  const [field, meta, helpers] = useField(name);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.currentTarget.files && event.currentTarget.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async () => {
        if (reader.readyState === 2) {
          const base64 = reader.result as string;
          setSelectedImg(base64);
          helpers.setValue(base64);

          // Upload image to Cloudinary
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "snkihizd");
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dcstijhci/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error("Error uploading image");
          }

          const data = await response.json();
          helpers.setValue(data.secure_url);
        }
      };

      reader.readAsDataURL(file);
    } else {
      helpers.setValue("");
    }
  };

  return (
    <>
      <FormLabel htmlFor={name} color="teal.600" fontSize={"md"}>
        {label}
      </FormLabel>
      <Box textAlign={"left"}>
        <input id={name} type="file" onChange={handleFileChange} />
      </Box>
      {selectedImg && (
        <Box boxSize="15rem" height="full">
          <Image src={selectedImg} alt="Preview" borderRadius={10} mb={2} />
        </Box>
      )}
      <ErrorMessage name={name} component={TextError} />
    </>
  );
};

export default FileInput;
