///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
//                                      PLUGINS                                              //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * All custom plugins and api call are defined in this file, do not declare anything
 * that is not either a plugin or a api call based on theming inside this file. 👻
 */

/**
 * @description list of plugins available in the builder using APIs from mysoltivo dashboard
 */
declare interface Plugins {
  /**
   * @description booking plugin.
   */
  booking: {
    /**
     * @description list of categories available from mysoltivo
     */
    category: { data: ServiceCategoryItem[]; loading: boolean };
    /**
     * @description list of services available from mysoltivo
     */
    service: { data: ServiceItem[]; loading: boolean };
  };

  /**
   * @description crm plugin for contact form
   */
  contact: {
    fields: CRMCustomField[];
  };
}

/**
 * @description category item of booking listing.
 */
declare interface ServiceCategoryItem {
  description: string;
  id: string;
  name: string;
  color: string;
  lowestPrice?: number | null;
}

/**
 * @description a service item in service api plugin.
 */
declare type ServiceItem = {
  bufferTime: number;
  category: string;
  currency: string;
  description: string;
  serviceId: string;
  title: string;
  price: number;
  duration: number;
  image: string;
  employees: any[];
};

/**
 * @description CRM entity types
 */
declare type CRMEntityType = "lead" | "supplier" | "client";

/**
 * @description CRM custom fields type
 */
declare type CRMCustomField = {
  title: string;
  type: "text";
};

/**
 * @description CRM entity type (lead client or supplier)
 */
declare type CRMEntity = {
  phoneNumber: string | { number: string; extension?: string };
  lastName: string;
  entityId: string;
  businessAddress?: CRMBillingAddress;
  createdAt: number;
  email: string;
  createdBy: string;
  firstName: string;
  businessInformation?: CRMBusinessInformation;
  type: any;
  origin: string;
  manager: string;
  [index: string]: any;
};

/**
 * @description crm billing information of an entity
 */
declare type CRMBillingAddress = {
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
};

/**
 * @description crm businness information of an entity
 */
declare type CRMBusinessInformation = {
  businessName: string;
  phoneNumber: string;
  secondaryContactEmail: string;
  secondaryFirstName: string;
  secondaryLastName: string;
  supportEmail: string;
};
