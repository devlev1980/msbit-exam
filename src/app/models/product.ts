export interface IProductList<F, U> extends IProduct {
  fedex: F;
  ups: U[];
  type: number;


}

// const fedex =   <F> {
//   type: number;
//   creationDate: Date;
//   deliveryComp: string;
//   description: string;
//   id: number;
//   name: string;
//   price: number;
//   thumbnailUrl: string;
// }

export interface IProduct {
  creationDate: Date;
  deliveryComp: string;
  description: string;
  id: number;
  name: string;
  price: number;
  thumbnailUrl: string;
  type: number;
  url: string;
}
