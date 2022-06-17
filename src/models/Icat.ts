import IproductDescription from './IproductDescription';

interface Icat {
  id: number,
  type: string,
  description: IproductDescription[],
  img: string,
  inStore: {
    status: boolean,
    text: string
  },
  weight: number
}

export default Icat;
