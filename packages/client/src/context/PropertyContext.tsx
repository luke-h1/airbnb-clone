import propertyService from '@src/services/property';
import type { Properties, Property } from '@src/types/Property';
import { API_URL } from '@src/utils/url';
import axios from 'axios';
import React, { createContext, useState } from 'react';
import {
  createPropertyOpts, deletePropertyOpts, getPropertyOpts, updatePropertyOpts,
} from './types/property';

export const PropertyContext = createContext<{
  getProperties:() => void;
  createProperty: ({ options }: { options: createPropertyOpts }) => void;
  updateProperty: ({ options }: { options: updatePropertyOpts }) => void;
  getProperty: ({ options }: { options: getPropertyOpts, id: number; }) => void;
  deleteProperty: ({ options }: { options: deletePropertyOpts, id: number }) => void;
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

const PropertyProvider: React.FC<PropertyProviderProps> = async ({ children }) => {
  const [property, setProperty] = useState<Property>(null);
  const [properties, setProperties] = useState<Properties[]>([]);

  const getProperties = async () => {
    const res = await propertyService.getProperties();
    console.log(res.data);
  };

  const createProperty = async ({ options }: { options: createPropertyOpts }) => {
    const res = await propertyService.createProperty({ options });
    console.log(res.data);
  };

  const updateProperty = async ({ options, id }: { options: updatePropertyOpts; id: number; }) => {
    const res = await propertyService.updateProperty({ options, id });
    console.log(res.data);
  };

  const getProperty = async ({ id }: { id: number }) => {
    const res = await propertyService.getProperty({ id });
    console.log(res.data);
  };

  const deleteProperty = async ({ id }: { id: number }) => {
    const res = await propertyService.deleteProperty({ id });
    console.log(res.data);
  };

  return (
    <PropertyContext.Provider
      value={{
        property,
        properties,
        getProperties,
        createProperty,
        updateProperty,
        getProperty,
        deleteProperty,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
export default PropertyProvider;
