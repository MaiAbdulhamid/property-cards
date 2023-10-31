import { useEffect, useMemo, useState } from "react";
import Property from "./Property";
import Filters from "./Filters";
import Pagination from "../components/Pagination";
import Sort from "../components/Sort";
import "./PropertiesList.css";

let PageSize = 9;

function PropertiesList({ properties }: any) {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState(properties);

  console.log(`props`, properties);
  console.log(filteredData);

  useEffect(() => {
    setIsLoading(false);
    setFilteredData(properties)
  }, [properties]);

  //Filters
  const priceRangeFilterHandler = ({ min, max }: any) => {
    const newData = properties.filter(
      (prop: any) =>
        +prop.unformattedPrice <= max && +prop.unformattedPrice >= min
    );
    setFilteredData(newData);
  };

  const typeFilterHandler = (e: any) => {
    setFilteredData(
      properties.filter((prop: any) =>
        prop.type?.toLowerCase().includes(e.target.value.toLowerCase())
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
    const prices = properties.slice().sort((a: any, b: any) => a[key] - b[key]);
    setFilteredData(prices);
  };

  const sortDescending = (key: string) => {
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

  if (isLoading) return <p>Loading Data...</p>;

  return (
    <>
      <aside className="fixed top-0 left-0 z-40 w-64" aria-label="Sidebar">
        <Filters
          priceRangeFilterHandler={priceRangeFilterHandler}
          typeFilterHandler={typeFilterHandler}
          bedRoomsFilterHandler={bedRoomsFilterHandler}
        />
        <div className="flex flex-col">
          <Sort
            label="Price"
            sortAscending={() => sortAscending("unformattedPrice")}
            sortDescending={() => sortDescending("unformattedPrice")}
          />
          <Sort
            label="Number Of bedrooms"
            sortAscending={() => sortAscending("beds")}
            sortDescending={() => sortDescending("beds")}
          />
        </div>
      </aside>
      <section className="page-content">
        {currentData && (
          <ul className="list-none p-0 grid xs:grid-cols-1 sm:grid-cols-2">
            {currentData.map((property: any) => (
              <Property key={property.id} property={property} />
            ))}
          </ul>
        )}
        {currentData?.length === 0 && (
          <p className="text-center mt-2 mb-6">No properties Yet...</p>
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
      </section>
    </>
  );
}

export default PropertiesList;
