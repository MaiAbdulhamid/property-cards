import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Property from "./Property";
import Filters from "./Filters";
import { filters, propertiesActions } from "../store";
import Pagination from "../components/Pagination";
import PriceFilter from "./Filters";
import MultiRangeSlider from "../components/MultiRangeSlider";
import { Grid, List } from "@mantine/core";
import TextInput from "../components/TextInput";
import NumberInput from "../components/NumberInput";
import Sort from "../components/Sort";

let PageSize = 9;

function PropertiesList() {
  const [isLoading, setIsLoading] = useState(true);
  const properties = useSelector((state: any) => state.properties.properties);
  const [filteredData, setFilteredData] = useState(properties);
  const dispatch = useDispatch();

  const priceRangeFilterHandler = useCallback(
    ({ min, max }: any) => {
      const newData = properties.filter(
        (prop: any) =>
          +prop.unformattedPrice <= max && +prop.unformattedPrice >= min
      );
      setFilteredData(newData);
    },
    [setFilteredData]
  );
  const typeFilterHandler = (e: any) => {
    setFilteredData(
      properties.filter((prop: any) =>
        prop.statusText.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const bedRoomsFilterHandler = (e: any) => {
    setFilteredData(
      properties.filter((prop: any) => Number(prop.beds) === +e.target.value)
    );
  };

  //Sort

  const sortAscending = (key: string) => {
    const prices = properties
      .slice()
      .sort((a: any, b: any) => a[key] - b[key]);
    setFilteredData(prices);
  };

  const sortDescending = (key : string) => {
    const prices = properties
      .slice()
      .sort((a: any, b: any) => a[key] - b[key])
      .reverse();
    setFilteredData(prices);
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filteredData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredData]);

  useEffect(() => {
    dispatch(propertiesActions.getProperties() as any);
    setIsLoading(false);
  }, [setIsLoading]);

  if (isLoading) return <p>Loading Data...</p>;

  return (
    <>
      <div className="p-5">
        <Filters
          priceRangeFilterHandler={priceRangeFilterHandler}
          typeFilterHandler={typeFilterHandler}
          bedRoomsFilterHandler={bedRoomsFilterHandler}
        />
        <div className="grid xs:grid-cols-1 sm:grid-cols-3">
          <Sort
            label="Price"
            sortAscending={() => sortAscending('unformattedPrice')}
            sortDescending={() => sortDescending('unformattedPrice')}
          />
          <Sort
            label="Number Of bedrooms"
            sortAscending={() => sortAscending('beds')}
            sortDescending={() => sortDescending('beds')}
          />
        </div>
      </div>
      {currentData && (
        <ul className="list-none p-0 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {currentData.map((property: any) => (
            <Property key={property.id} property={property} />
          ))}
        </ul>
      )}
      {currentData?.length === 0 && (
        <p className="text-center mt-2 mb-6">No properties...</p>
      )}
      {isLoading && (
        <div>
          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
          Processing...
        </div>
      )}
      {currentData?.error && (
        <div className="text-red-500">
          Error loading todo List: {currentData.error.message}
        </div>
      )}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={filteredData.length}
        pageSize={PageSize}
        onPageChange={(page: any) => setCurrentPage(page)}
      />
    </>
  );
}

export default PropertiesList;
