import React, { useState, useEffect } from "react";

const AttributeInput = ({ attributes, onSubmit }) => {
    console.log(attributes, " attrinput");
    const [values, setValues] = useState(() => {
        return {
          ammount: 1, // ✅ Ensure "ammount" is always present
          ...(attributes?.reduce((acc, attr) => {
            acc[attr.name] = attr.type === "multi-select" ? [] : "";
            return acc;
          }, {}) || {}),
        };
      });
      
   


  const handleChange = (attr, value) => {
    setValues((prev) => ({ ...prev, [attr]: value }));
  };

  //if (!attributes || attributes.length === 0) return null; // Avoid rendering if no attributes

  return (
    <div className="p-4 border">
      {attributes.map((attribute) => (
        <div key={attribute.name} className="mb-4">
          <label className="block font-bold">{attribute.name}:</label>

          {attribute.type === "select" ? (
            <select
              value={values[attribute.name] || ""}
              onChange={(e) => handleChange(attribute.name, e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Select...</option>
              {attribute.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <div className="space-y-2">
              {attribute.options.map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={option}
                    checked={values[attribute.name]?.includes(option) || false} // ✅ FIXED
                    onChange={(e) => {
                      const currentValue = values[attribute.name] || []; // ✅ Ensure it's always an array
                      const newValue = e.target.checked
                        ? [...currentValue, option]
                        : currentValue.filter((v) => v !== option);
                      handleChange(attribute.name, newValue);
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

            <div className="space-y-2">
                <label className="block font-bold">Ammount:</label>
                <input
                    type="number"
                    min={1}
                    value={values.ammount}
                    onChange={(e) => handleChange("ammount", Number(e.target.value))} // ✅ Convert to number
                    className="border p-2 w-full"
                />
            </div>
      <button
        onClick={() => onSubmit(values)}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Submit
      </button>
    </div>
  );
};

export default AttributeInput;
