import React, { Dispatch, SetStateAction } from "react";
import {
  CustomFlowbiteTheme,
  Datepicker,
  Flowbite,
  Label,
} from "flowbite-react";
import { formatPrice } from "@/src/utils/priceUtils";

const customTheme: CustomFlowbiteTheme = {
  datepicker: {
    popup: {
      footer: {
        button: {
          today: "!bg-primary-color text-white hover:brightness-125",
        },
      },
    },
    views: {
      days: {
        items: {
          item: {
            selected:
              "!bg-primary-color text-white hover:brightness-125 hover:bg-primary-color",
            disabled: "cursor-not-allowed text-gray-400",
          },
        },
      },
    },
  },
};

interface DatePickerProps {
  dateFrom: Date | null;
  dateTo: Date | null;
  grandTotal: number;
  setDateFrom: Dispatch<SetStateAction<Date | null>>;
  setDateTo: Dispatch<SetStateAction<Date | null>>;
}

const DatePicker: React.FC<DatePickerProps> = ({
  dateFrom,
  dateTo,
  grandTotal,
  setDateFrom,
  setDateTo,
}) => {
  const today = new Date();

  const disableFutureDates = (date: Date) => date <= today;

  const handleDateChange =
    (setter: React.Dispatch<React.SetStateAction<Date | null>>) =>
    (date: Date | null) => {
      if (date && disableFutureDates(date)) {
        setter(date);
      }
    };

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <div className="flex justify-between items-center py-7 px-5">
        <div className="flex gap-3">
          <div>
            <Label htmlFor="dateFrom">Date From:</Label>
            <Datepicker
              className="cursor-pointer"
              id="dateFrom"
              value={dateFrom}
              onChange={handleDateChange(setDateFrom)}
              maxDate={today}
            />
          </div>
          <div>
            <Label htmlFor="dateTo">Date To:</Label>
            <Datepicker
              className="cursor-pointer"
              id="dateTo"
              value={dateTo}
              onChange={handleDateChange(setDateTo)}
              maxDate={today}
            />
          </div>
        </div>
        <div>
          <p className="text-lg">
            Grand Total:{" "}
            <span className="font-bold">{formatPrice(grandTotal)}</span>
          </p>
        </div>
      </div>
    </Flowbite>
  );
};

export default DatePicker;
