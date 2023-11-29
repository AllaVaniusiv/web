import React, { useState, useEffect } from "react";
import { FiltersContainer, ItemsContainer, SelectWrapper, SortDirectionButton } from "./Catalog.styled";
import CardItem from "../../components/CardItem/CardItem";
import PrimarySelect from "../../components/PrimarySelect/PrimarySelect";
import SearchInput from "../../components/SearchInput/SearchInput";
import {
    UpCircleOutlined,
    DownCircleOutlined
} from "@ant-design/icons";

import { getPrinters } from "../../API/api";

const sortOptions = [
    { value: "name", label: "Sort by name" },
    { value: "price", label: "Sort by price" },
];

const filterOptions = [
    { value: "all", label: "All categories" },
    { value: "led", label: "Led" },
    { value: "laser", label: "Laser" },
    { value: "inkjet", label: "Inkjet" },
];

const Catalog = () => {
    const [printers, setPrinters] = useState([]);

    const [sortMode, setSortMode] = useState("name");
    const [filterMode, setFilterMode] = useState("all");
    const [searchValue, setSearchValue] = useState("");
    const [reverseSort, setReverseSort] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPrinters({
            filter: filterMode,
            sort: sortMode,
            reverse_sort: reverseSort,
            search: searchValue,
        }, (resp) => {
            setPrinters(resp.printers);
            setLoading(false);
        });
    }, [filterMode, sortMode, reverseSort, searchValue])

    const onSortChange = (value) => {
        setSortMode(value);
        setReverseSort(false);
    }

    const onFilterChange = (value) => {
        setFilterMode(value);
        setReverseSort(false);
    }

    const onSearch = (value) => {
        setSearchValue(value);
        setReverseSort(false);
    }

    return (
        <div>
            <FiltersContainer>
                <SelectWrapper>
                    <PrimarySelect
                        defaultValue={sortMode}
                        onChange={onSortChange}
                        options={sortOptions}
                    />
                    <div style={{display: "flex", flexDirection: "column", marginRight: "20px"}}>
                        <SortDirectionButton 
                            type="text"
                            onClick={() => setReverseSort(false)}
                            disabled={!reverseSort}
                        >
                            <UpCircleOutlined style={{ margin: "0px" }} />
                        </SortDirectionButton>
                        <SortDirectionButton 
                            type="text"
                            onClick={() => setReverseSort(true)}
                            disabled={reverseSort}
                        >
                            <DownCircleOutlined style={{ margin: "0px" }} />
                        </SortDirectionButton>

                    </div>
                    <PrimarySelect 
                        defaultValue={filterMode}
                        onChange={onFilterChange}
                        options={filterOptions}
                    />
                </SelectWrapper>
                <SearchInput 
                    defaultValue={searchValue}
                    placeholder="Find printer"
                    onSearch={onSearch}
                />
            </FiltersContainer>
            <ItemsContainer>
                {
                printers.length ?
                printers.map(({ title, text, image, price, id }) => (
                    <CardItem
                        title={title}
                        text={text}
                        imageName={image}
                        price={price}
                        id={id}
                        key={id}
                    />
                )) :
                loading ? 
                <p>Loading...</p> :
                <h2>No Items</h2>
                }
            </ItemsContainer>
        </div>
    )
};

export default Catalog;