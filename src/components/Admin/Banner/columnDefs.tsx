import { BannerDto } from "@/src/shared/interfaces/Banner";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import CustomImage from "../../Shared/CustomImage";
import ActionCellRenderer from "@/shared/ActionCellRenderer";

const columnDefs: ColDef[] = [
  {
    headerName: "Image",
    field: "src" as keyof BannerDto,
    width: 297.6266666666667,
    cellRenderer: ImageCellRenderer,
  },
  {
    headerName: "Name",
    field: "name" as keyof BannerDto,
    flex: 1,
  },
  {
    headerName: "Actions",
    width: 150,
    resizable: false,
    cellRenderer: ActionCellRenderer,
    cellRendererParams: {
      onEdit: () => console.log("on edit"),
      onDelete: () => console.log("on delete"),
    },
  },
];

function ImageCellRenderer(params: ICellRendererParams) {
  return (
    <div className="aspect-video">
      <CustomImage
        imageClass="object-cover"
        className="w-full h-full"
        src={params.value}
        alt={params.data.alt}
        fill={true}
      />
    </div>
  );
}

export default columnDefs;
