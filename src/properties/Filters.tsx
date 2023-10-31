import React from "react";
import TextInput from "../components/TextInput";
import MultiRangeSlider from "../components/MultiRangeSlider";
import NumberInput from "../components/NumberInput";

const Filters = ({
  typeFilterHandler,
  priceRangeFilterHandler,
  bedRoomsFilterHandler,
}: any) => {
  return (
    <div className="flex flex-col">
      <TextInput label="Type" onChange={typeFilterHandler} />
      <MultiRangeSlider
        min={0}
        max={1000000}
        onChange={priceRangeFilterHandler}
      />
      <NumberInput label="Bed Rooms Numbers" onChange={bedRoomsFilterHandler} />
    </div>
  );
};

export default Filters;
