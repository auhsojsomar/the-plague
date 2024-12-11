import { BannerDto } from "@/src/shared/interfaces/Banner";
import { ColDef, ICellRendererParams } from "ag-grid-community";
import CustomImage from "../../Shared/CustomImage";
import ActionCellRenderer from "@/shared/ActionCellRenderer";
import { toKebabCase } from "@/src/utils/stringUtils";

interface columnDefsProps {
  onEdit: (data: BannerDto) => void;
  onDelete: (data: BannerDto) => void;
}

const columnDefs = ({ onEdit, onDelete }: columnDefsProps): ColDef[] => [
  {
    headerName: "Image",
    field: "image" as keyof BannerDto,
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
      onEdit: (params: BannerDto) => onEdit(params),
      onDelete: (params: BannerDto) => onDelete(params),
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
        alt={toKebabCase(params.data.name)}
        fill={true}
      />
    </div>
  );
}

export default columnDefs;
