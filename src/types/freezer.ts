export interface iFreezer {
  _id: string;
  freezerName: string;
  freezerModel: string;
  freezerLocation: string;
  freezerType: string;
  NumberOfShelves: number;
  BoxesPerShelf: number;
  capacity: number;
  createdAt: string;
  updatedAt: string;
}
export interface iFreezerlist {
  freezers: iFreezer[];
}
