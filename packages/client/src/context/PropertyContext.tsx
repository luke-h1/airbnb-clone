import type { Properties, Property } from '@src/types/Property';
import { API_URL } from '@src/utils/url';
import axios from 'axios';
import React, { createContext, useState } from 'react';
import { createPropertyOpts, deletePropertyOpts, getPropertyOpts, updatePropertyOpts } from './types/property';

export const PropertyContext = createContext<{
  getProperties:() => void;
  createProperty: ({ options }: { options: createPropertyOpts }) => void;
  updateProperty: ({ options }: { options: updatePropertyOpts }) => void;
  getProperty: ({ options }: { options: getPropertyOpts }) => void;
  deleteProperty: ({ options }: { options: deletePropertyOpts }) => void;
  properties: Properties[];
  property: Property;
    }>({
      properties: [],
      property: null,
      getProperties: () => {},
      createProperty: () => {},
      updateProperty: () => {},
      getProperty: () => {},
      deleteProperty: () => {},
    });

interface PropertyProviderProps {
  children: React.ReactNode;
}

const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const [property, setProperty] = useState<Property>(null);
  const [properties, setProperties] = useState<Properties[]>([]);
  return (
    <PropertyContext.Provider
      value={{
        property,
        properties,
        getProperties: async () => {
          const res = await axios({
            method: 'GET',
            url: `${API_URL}/api/properties`,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        },
        createProperty: async ({ options }) => {
          const res = await axios({
            method: 'POST',
            url: `${API_URL}/api/properties`,
            headers: {
              'Content-Type': 'application/json',
              // get auth
            },
          });
        },
        updateProperty: async ({ options, id }) => {
          const res = await axios({
            method: 'PUT',
            url: `${API_URL}/api/properties/${id}`,
            headers: {
              'Content-Type': 'application/json',
              // get auth
            },
          });
        },
        getProperty: async ({ id }) => {
          const res = await axios({
            method: 'GET',
            url: `${API_URL}/api/properties/${id}`,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        },
        deleteProperty: ({ id }) => {
          const res = await axios({
            method: 'DELETE',
            url: `${API_URL}/api/properties/${id}`,
            headers: {
              'Content-Type': 'application/json',
              // auth
            },
          });
        },

      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
export default PropertyProvider;
