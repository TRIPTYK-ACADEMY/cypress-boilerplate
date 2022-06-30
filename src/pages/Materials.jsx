import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import MaterialTable from '../components/tables/MaterialTable';
import Loader from '../components/ui/Loader';
import SubHeader from '../components/ui/SubHeader';
import { get } from '../data/material';

const Materials = () => {
  const {
    data: materials,
    isError,
    isFetching,
    isLoading,
    refetch: reloadData,
  } = useQuery('materials', get);
  useEffect(() => {
    if (isError) {
      toast('Il y a une erreur', { className: 'errorToast' });
    }
  }, [isError]);
  return (
    <div>
      {isLoading && isFetching && <Loader />}
      <SubHeader>Liste du matériel</SubHeader>
      {materials && !isFetching && (
        <MaterialTable data={materials} reloadData={reloadData} />
      )}
    </div>
  );
};

export default Materials;
