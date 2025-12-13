import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "RDUX/store";

import Dimentions from "./template/dimensions";
import lodash from "lodash";
import lz from "lz-string";

type Axistype = "mngt" | "gVar" | "mVar" | "body" | "mthd";

const DEFAULT_SCHM = {
  meta: {
    id: "",
    title: "",
    version: "",
    lastUpdate: "",
    owner: "",
    type: "",
    description: "",
    absManVersion: "0.1",
  },
};

const PACK_META = {
  meta: {
    axis: "",
    title: "",
    description: "",
  },
};

const FIELD_META = {
  meta: {
    title: "",
    description: "",
  },
};

class AbsMan {
  // Class property NTT is an empty object.
  private _NTT: any = {};

  //@ts-ignore Checking the status of ntt storage in the database
  private _saved: boolean = true;

  //@ts-ignore To identify different ntts
  private _serial: number;

  group: any;
  type: any;

  // Use throughout your app instead of plain `useDispatch` and `useSelector`
  static useAppDispatch = useDispatch.withTypes<AppDispatch>();
  static useAppSelector = useSelector.withTypes<RootState>();

  // /**
  //  *
  //  * @returns
  //  */
  // static store() {
  //     return store;
  // }

  constructor(nttStructure: any = null) {
    this._NTT = nttStructure ?? structuredClone(DEFAULT_SCHM);
    this._serial = nttStructure?.serial ?? this.generateVersion();
  }

  /**
   *
   * @returns
   */
  public serialize() {
    return lz.compressToBase64(this.stringify());
  }

  /**
   *
   * @returns
   */
  public stringify() {
    return JSON.stringify(this, (_, value) => {
      if (value && value instanceof AbsMan) {
        //@ts-ignore
        value.__type = value.constructor.name;
      }
      return value;
    });
  }

  /**
   *
   * @param str
   * @returns
   */
  public unserialize(str: string) {
    const data = lz.decompressFromBase64(str);
    this.parse(data);
    return data;
  }

  /**
   *
   * @param str
   */
  public parse(str: string) {
    const serializedObject = JSON.parse(str, (_, value) => {
      if (value && typeof value === "object" && (value.__type || value._type)) {
        value = Object.assign(new AbsMan(), value);
        delete value?.__type;
        delete value?._type;
      }
      return value;
    });
    Object.assign(this, serializedObject);
    return serializedObject;
  }

  /**
   * The set NTT method sets the instance's _NTT property to a new value,
   *
   * @param {Object} newNtt
   */
  public set NTT(newNtt: object) {
    this._NTT = newNtt;
  }

  /**
   * Returns the entire NTT object.
   *
   * @returns {Object}
   */
  public get NTT(): any {
    return this._NTT;
  }

  /**
   * when this code is executed, it will return a random integer between 1 and 9999999999 (inclusive), which can be used as a serial number.
   *
   * @returns {Number}
   */
  private generateVersion(): number {
    return Math.floor(Math.random() * (9999999999 - 1 + 1)) + 1;
  }

  /**
   * get schm metadata
   * @returns {object}
   */
  public getMeta(): object {
    return this._NTT?.meta;
  }

  /**
   * set schm metadata
   * @param {object} data
   * @returns {boolean}
   */
  public setMeta(data: object): boolean {
    const meta = this._NTT?.meta;
    this._NTT = {
      ...this._NTT,
      meta: {
        ...meta,
        ...data,
      },
    };
    return true;
  }

  /**
   * get axis name by axis type
   * @param {Axistype} axisType
   * @returns {String}
   */
  private getAxisName(axisType: Axistype): string {
    let axisName;
    switch (axisType) {
      case "mngt": {
        axisName = "mngt";
        break;
      }
      case "gVar": {
        axisName = "gVar";
        break;
      }
      case "mVar": {
        axisName = "mVar";
        break;
      }
      case "body": {
        axisName = "body";
        break;
      }
      case "mthd": {
        axisName = "mthd";
        break;
      }
    }
    return axisName;
  }

  /**
   * 1. Accesses the axis object with the given axis name in NTT.
   * 2. Increment and store the packSerial value, which is used to uniquely identify each pack within an axis.
   * 3. Add the new packSerial to the array of existing packs within the axis.
   * 4. Adds a new pack object to the given axis in NTT, with a unique key of `Pack_${serial}` and a deep clone of basePack as its value.
   *
   * @param {string} packId
   * @param {Axistype} axisType
   *
   * @returns {Boolean} Returns the newly added packSerial.
   */
  public addPack(packId: string, axisType: Axistype): boolean {
    try {
      packId = packId.replaceAll(" ", "_");
      const axisName = this.getAxisName(axisType);
      const packet = structuredClone(PACK_META);
      packet.meta.axis = axisName;
      this._NTT = {
        ...this._NTT,
        [packId]: packet,
      };
      return true;
    } catch {
      return false;
    }
  }

  /**
   *
   * @param packId
   * @returns
   */
  public getPack(packId: string): any {
    try {
      packId = packId.replaceAll(" ", "_");
      return this._NTT?.[packId];
    } catch {
      return false;
    }
  }

  /**
   * This is a method that sets the metadata of a pack, which is identified by a given axis type and pack number.
   *
   * 1. The method first retrieves the existing details (axis) of the axis from the _NTT property of the class instance, using optional chaining (?.) operator to access nested properties (if they exist). If the axis doesn't already exist, axis will be assigned undefined.
   * 2. It then attempts to retrieve the existing metadata (packMeta) of the given pack from the axis object retrieved earlier, again using optional chaining (?.) operator to check if the properties exist before accessing them. If the pack doesn't have any metadata yet or the axis doesn't exist, packMeta will be assigned undefined.
   * 3. A new object is constructed using the spread syntax (...) and assigned to _NTT instance property, with all the original attributes and its relevant updates.
   *
   * This method does not return anything explicitly. It updates the metadata of a Pack identified by its axis number and pack number. If the axis or pack do not already exist, this method will create them (with empty details/metadata).
   *
   * @param {string} packId
   * @param {Object} data
   */
  public setPack(packId: string, data: any): boolean {
    try {
      packId = packId.replaceAll(" ", "_");
      const pack = this._NTT?.[packId];
      this._NTT = {
        ...this._NTT,
        [packId]: {
          ...pack,
          meta: {
            ...pack?.meta,
            ...data,
          },
        },
      };
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 1. Accesses the axis object with the given axis type in NTT.
   * 2. Deletes the pack object with the corresponding packNumber within the axis.
   * 3. Removes the corresponding packNumber from the array of pack serial numbers within the axis's Meta property.
   *
   * @param {string} packId
   *
   * @returns {boolean}
   */
  public removePack(packId: string): boolean {
    try {
      packId = packId.replaceAll(" ", "_");
      delete this._NTT?.[packId];
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 1. Accesses the axis object with the given axis type in NTT.
   * 2. Accesses the pack object with the given packNumber within the axis.
   * 3. Increment and store the fieldSerial value, which is used to uniquely identify each field within a pack.
   * 4. Add the new fieldSerial to the array of existing fields within the pack's Meta property.
   * 5. Adds a new field object to the given pack within the axis in NTT, with a unique key of `Field_${serial}` and a deep clone of baseField as its value.
   *
   * @param {string} packId
   * @param {string} fieldId
   *
   * @returns {Boolean} Returns the newly added fieldSerial.
   */
  public addField(packId: string, fieldId: string): boolean {
    try {
      packId = packId.replaceAll(" ", "_");
      fieldId = fieldId.replaceAll(" ", "_");
      const pack = this._NTT?.[packId];
      this._NTT = {
        ...this._NTT,
        [packId]: {
          ...pack,
          [fieldId]: structuredClone(FIELD_META),
        },
      };
      return true;
    } catch {
      return false;
    }
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @returns
   */
  public getField(packId: string, fieldId: string): any {
    try {
      packId = packId.replaceAll(" ", "_");
      fieldId = fieldId.replaceAll(" ", "_");
      return this._NTT?.[packId]?.[fieldId];
    } catch {
      return false;
    }
  }

  /**
   * This method modifies the _NTT instance with the updated metadata of a given field within a specific pack and axis, which are identified by their unique numbers.
   *
   * The purpose of this function is to set a value for a specific field within a nested object. It performs a series of checks to make sure each property exists before accessing it, and then creates a new object with the updated values.
   *
   * 1. It checks if there is a property in the 'this' object called '_NTT'
   * 2. It accesses the 'Pack_(packNumber)' property of the 'axis' object if it exists
   * 3. It gets the 'Meta' property of the field specified by 'fieldNumber' if it exists.
   * 4. The following code creates and returns a new object that will overwrite the previous '_NTT'.
   *
   * @param {Axistype} axisType
   * @param {Number} packNumber
   * @param {Number} fieldNumber
   * @param {Object} data
   */
  public setField(packId: string, fieldId: string, data: any): boolean {
    try {
      packId = packId.replaceAll(" ", "_");
      fieldId = fieldId.replaceAll(" ", "_");
      const pack = this._NTT?.[packId];
      const field = pack?.[fieldId];
      this._NTT = {
        ...this._NTT,
        [packId]: {
          ...pack,
          [fieldId]: {
            ...field,
            meta: {
              ...field?.meta,
              ...data,
            },
          },
        },
      };
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 1. Accesses the pack object with the given packNumber within the axis with the given axisNumber in NTT.
   * 2. Deletes the field object with the corresponding fieldNumber within the pack.
   * 3. Removes the corresponding fieldNumber from the array of field serial numbers within the pack's Meta property.
   *
   * @param {string} packId
   * @param {string} fieldId
   */
  public removeField(packId: string, fieldId: string): boolean {
    try {
      packId = packId.replaceAll(" ", "_");
      fieldId = fieldId.replaceAll(" ", "_");
      const pack = this._NTT?.[packId];
      delete pack?.[fieldId];
      return true;
    } catch {
      return false;
    }
  }

  /**
   * register new dimension for class
   * @param packId
   * @param fieldId
   * @param params
   * @returns
   */
  public registerDimension(packId: string, fieldId: string, params: object) {
    try {
      packId = packId.replaceAll(" ", "_");
      fieldId = fieldId.replaceAll(" ", "_");
      const pack = this._NTT?.[packId];
      const field = pack?.[fieldId];
      this._NTT = {
        ...this._NTT,
        [packId]: {
          ...pack,
          [fieldId]: {
            meta: field?.meta,
            ...params,
          },
        },
      };
      return true;
    } catch {
      return false;
    }
  }

  /**
   * it's returning an array of keys of `dimensions` object.
   *
   * @returns {object} returns the keys of an object in a dimension object.
   */
  public getDimensions(): object {
    const body: any = Dimentions;
    let result = {};
    for (const key of Object.keys(body)) {
      if (key === "meta") continue;
      const pack = body[key],
        data: any = {};
      for (const item of Object.keys(pack)) {
        if (item === "meta") continue;
        const field = pack[item];
        data[item] = field;
      }
      result = {
        ...result,
        [key]: data,
      };
    }
    return result;
  }

  /**
   * get dimension by name and mode
   * @param {String} cls
   * @param {String} dim
   * @returns {Object}
   */
  public getDimension(cls: string, dim: string): object {
    const body: any = Dimentions;
    let isPackExist = false,
      result = {};
    for (const key of Object.keys(body)) {
      if (key === "meta") continue;
      const pack = body[key];
      for (const item of Object.keys(pack)) {
        const field = pack[item];
        if (item === "meta" && key === cls) isPackExist = true;
        if (isPackExist && item === dim) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { meta, ...rest } = field;
          result = { ...rest, class: cls, dimension: dim };
          isPackExist = false;
        }
      }
    }
    return result;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param order
   */
  public sortDimensions(packId: string, fieldId: string, order?: number) {
    packId = packId.replaceAll(" ", "_");
    fieldId = fieldId.replaceAll(" ", "_");
    const packets = this._NTT?.[packId];
    if (order) {
      if (packets[fieldId].order == order) return;
      const items = [];
      for (const key of Object.keys(packets)) {
        if (key === "meta") continue;
        items.push(key);
      }
      lodash.pull(items, fieldId);
      items.splice(order - 1, 0, fieldId);
      const values: any = { meta: packets.meta };
      for (const [index, key] of items.entries()) {
        const value = packets[key];
        value.order = index + 1;
        values[key] = value;
      }
      this._NTT[packId] = values;
    } else {
      const length = Object.keys(packets).length - 1;
      packets[fieldId].order = length;
    }
  }

  /**
   * This function adds a new item to the field with the given axisNumber, packNumber, fieldNumber and fieldType.
   * It first tries to access the property of "NTT" object for "Axis_X", "Pack_Y" and "Field_Z" (where X, Y and Z are axisNumber, packNumber and fieldNumber respectively).
   * If "NTT" object or any of its properties do not exist, it will return null.
   * If "NTT" object and all its properties do exist, it assigns the value of "NTT.Axis_X.Pack_Y.Field_Z" into the variable named "field".
   * Then it gets the value of "dimension.types[fieldType]" into the variable named "item".
   * Next, it assigns the values of "dimension.options", "item" and "field" into the same variable (named "field") by using Object.assign() method.
   *
   * @param {string} packId
   * @param {string} fieldId
   * @param {string} cls
   * @param {string} dim
   */
  public addDimension(
    packId: string,
    fieldId: string,
    cls: string,
    dim: string,
    order?: number
  ): boolean {
    try {
      packId = packId.replaceAll(" ", "_");
      fieldId = fieldId.replaceAll(" ", "_");
      const pack = this._NTT?.[packId];
      const field = pack?.[fieldId];
      const dimension = this.getDimension(cls, dim);
      this._NTT = {
        ...this._NTT,
        [packId]: {
          ...pack,
          [fieldId]: {
            meta: field?.meta,
            ...dimension,
          },
        },
      };
      this.sortDimensions(packId, fieldId, order);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * The purpose of this function is to set a value for a specific field within a nested object. It performs a series of checks to make sure each property exists before accessing it, and then creates a new object with the updated values.
   *
   * 1. It checks if there is a property in the 'this' object called '_NTT'
   * 2. It accesses the 'Pack_(packNumber)' property of the 'axis' object if it exists
   * 3. It gets the field specified by 'fieldNumber' if it exists.
   * 4. The following code creates and returns a new object that will overwrite the previous '_NTT'.
   *
   * @param {string} packId
   * @param {string} fieldId
   * @param {Object} data
   */
  public setDimension(
    packId: string,
    fieldId: string,
    paramId: string,
    data: any
  ): boolean {
    try {
      packId = packId.replaceAll(" ", "_");
      fieldId = fieldId.replaceAll(" ", "_");
      const pack = this._NTT?.[packId];
      const field = pack?.[fieldId];
      const param = pack?.[fieldId]?.[paramId];
      this._NTT = {
        ...this._NTT,
        [packId]: {
          ...pack,
          [fieldId]: {
            ...field,
            [paramId]: {
              ...param,
              ...data,
            },
          },
        },
      };
      return true;
    } catch {
      return false;
    }
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param paramId
   * @param itemId
   * @returns
   */
  public getitem(
    packId: string,
    fieldId: string,
    paramId: string,
    itemId: string
  ): string {
    try {
      packId = packId.replaceAll(" ", "_");
      fieldId = fieldId.replaceAll(" ", "_");
      const pack = this._NTT?.[packId];
      const field = pack?.[fieldId];
      const param = field?.[paramId];
      return param?.[itemId];
    } catch {
      return "";
    }
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public value(packId: string, fieldId: string, value: any) {
    this.setDimension(packId, fieldId, "edit", { value: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @returns
   */
  public getValue(packId: string, fieldId: string): any {
    return this.getitem(packId, fieldId, "edit", "value");
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public id(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { id: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public view(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { view: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public array(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { array: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public language(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { language: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public defReset(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { defReset: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public changeScale(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { changeScale: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public furmula(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { furmula: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public defVal(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { defVal: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @returns
   */
  public getDefValue(packId: string, fieldId: string): string {
    return this.getitem(packId, fieldId, "config", "defVal");
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public unit(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { unit: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public subUnit(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { subUnit: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public scaleOp(packId: string, fieldId: string, value: Array<any>) {
    this.setDimension(packId, fieldId, "config", { scaleOp: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public format(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { format: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public validation(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { validation: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public validTime(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { validTime: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public widget(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { widget: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public icon(packId: string, fieldId: string, value: string) {
    this.setDimension(packId, fieldId, "config", { icon: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public reset(packId: string, fieldId: string, value: boolean) {
    this.setDimension(packId, fieldId, "config", { reset: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public editable(packId: string, fieldId: string, value: boolean) {
    this.setDimension(packId, fieldId, "config", { editable: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public picker(packId: string, fieldId: string, value: boolean) {
    this.setDimension(packId, fieldId, "edit", { picker: value });
    return true;
  }

  /**
   *
   * @param packId
   * @param fieldId
   * @param value
   * @returns
   */
  public optionList(packId: string, fieldId: string, value: Array<any>) {
    this.setDimension(packId, fieldId, "config", { optionList: value });
    return true;
  }
}

export default AbsMan;
