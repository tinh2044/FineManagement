import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import PrisonerGroup from "./PrisonerGroup";
import { getPenaltyTypes, getRemainingFines } from "../../services";

function RemainingFine() {
    const [data, setData] = useState([]);
    const [penaltyTypes, setPenaltyTypes] = useState([]);
    const [searchParams, setSearchParams] = useState({
        prisonerName: "",
        dob: "",
        pob: "",
        judgement: "",
        penaltyType: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = async () => {
        await loadData(
            searchParams.prisonerName,
            searchParams.dob,
            searchParams.pob
        );
    };

    const loadData = async (prisonerName = null, dob = null, pob = null) => {
        try {
            console.log("Loading data with params:", { prisonerName, dob, pob });
            const result = await getRemainingFines(1, 100, prisonerName, dob, pob);
            setData(Array.isArray(result) ? result : []);
        } catch (error) {
            console.error("Error loading data:", error);
            setData([]);
        }
    };
    useEffect(() => {
        const fetchPenaltyTypes = async () => {
            try {
                const types = await getPenaltyTypes();
                setPenaltyTypes(types);
            } catch (error) {
                console.error("Error fetching penalty types:", error);
            }
        };
        fetchPenaltyTypes();
    }, []);

    useEffect(() => {
        loadData();
    }, []);

    const groupedData = data.reduce((acc, item) => {
        if (
            searchParams.judgement &&
            !item.judgementId.includes(searchParams.judgement)
        ) {
            return acc;
        }
        if (searchParams.penaltyType &&
            !item.penaltyName.includes(searchParams.penaltyType)
        ) {
            return acc;
        }
        if (!acc[item.prisonerId]) {
            acc[item.prisonerId] = {
                ...item,
                judgements: {},
            };
        }
        if (item.judgementId.includes(searchParams.judgement)) {
            if (!acc[item.prisonerId].judgements[item.judgementId]) {
                acc[item.prisonerId].judgements[item.judgementId] = [];
            }

            acc[item.prisonerId].judgements[item.judgementId].push({
                penaltyName: item.penaltyName,
                totalFine: item.totalFine,
                paidAmount: item.paidAmount,
                remainingAmount: item.remainingAmount,
                paymentStatus: item.status,
                isPaid: item.status !== "Nợ",
            });
        }
        return acc;
    }, {});

    const prisoners = Object.values(groupedData);

    console.log(prisoners);

    return (
        <div className="p-6">
            <SearchBar
                searchParams={searchParams}
                onSearchChange={handleInputChange}
                onSearch={handleSearch}
                penaltyTypes={penaltyTypes}
            />
            <PrisonerGroup prisoners={prisoners} />
        </div>
    );
}

export default RemainingFine;
