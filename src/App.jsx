import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
// import { initialJudgements, initialPrisoners, initialLegalCases, initialPayments } from './data';
import JudgementList from './components/JudgementList';
import PrisonerList from './components/PrisonerList';
import RemainingFine from './components/RemainingFine';
import PenaltyTypeList from './components/PenaltyType';

import { useDispatch } from 'react-redux';
import { fetchPenaltyTypes } from './components/redux/penaltyTypesSlice';
import Payments from './components/Payments';
function App() {
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPenaltyTypes());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Bản án" />
          <Tab label="Phạm nhân" />
          <Tab label="Khoản nợ" />
          <Tab label="Thanh toán" />
          <Tab label="Loại phạt" />
        </Tabs>
      </Box>
      <div className="mt-4">
        {tabValue === 0 && <JudgementList />}
        {tabValue === 1 && <PrisonerList />}
        {tabValue === 2 && (
          <RemainingFine />
        )}
        {tabValue === 3 && (
          <Payments />
        )}
        {tabValue === 4 && (
          <PenaltyTypeList />
        )}
      </div>
    </div>
  );
}

export default App;