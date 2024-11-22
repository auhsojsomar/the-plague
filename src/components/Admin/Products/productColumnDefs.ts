import { ColDef } from "ag-grid-community";
import { formatPrice } from "@/utils/priceUtils";
import { Variant } from "@/interfaces/Variant";
import ImageCellRenderer from "./ImageCellRenderer";
import { ProductDto } from "@/src/shared/interfaces/ProductDto";

export const productColumnDefs: ColDef[] = [
  {
    headerName: "Image",
    field: "image.main",
    width: 110,
    resizable: false,
    filter: false,
    flex: 0,
    cellRenderer: ImageCellRenderer,
  },
  {
    headerName: "Product Name",
    field: "name",
  },
  {
    headerName: "Color",
    field: "variants",
    valueGetter: ({ data }: { data: ProductDto }) => {
      return data.variants.reduce(
        (acc: string, variant: Variant, index: number) => {
          return acc + (index > 0 ? ", " : "") + variant.color.name;
        },
        ""
      );
    },
  },
  {
    headerName: "Size",
    field: "variants",
    valueGetter: ({ data }: { data: ProductDto }) => {
      return data.variants.reduce(
        (acc: string, variant: Variant, index: number) => {
          return acc + (index > 0 ? ", " : "") + variant.size.name;
        },
        ""
      );
    },
  },
  {
    headerName: "Price Range",
    field: "variants",
    cellClass: "flex justify-end",
    valueGetter: ({ data }: { data: ProductDto }) => {
      const { min, max } = data.variants.reduce(
        (acc: { min: number; max: number }, variant: Variant) => {
          const price = variant.salePrice ?? variant.price;
          return {
            min: Math.min(acc.min, price),
            max: Math.max(acc.max, price),
          };
        },
        { min: Infinity, max: -Infinity }
      );

      return min === max
        ? formatPrice(min)
        : `${formatPrice(min)} - ${formatPrice(max)}`;
    },
  },
  {
    headerName: "Total Quantity",
    field: "variants",
    flex: 0,
    width: 150,
    cellClass: "flex justify-end",
    valueGetter: ({ data }: { data: ProductDto }) => {
      return data.variants.reduce(
        (acc: number, variant: Variant) => acc + variant.quantity,
        0
      );
    },
  },
];
