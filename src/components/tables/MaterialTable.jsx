import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { add } from '../../data/material';
import MaterialForm from '../forms/MaterialForm';
import Loader from '../ui/Loader';
import MaterialTableRow from './MaterialTableRow';

const MaterialTable = ({ data, reloadData }) => {
  const [isAdd, setIsAdd] = useState(false);
  const { isLoading, mutate: addMaterial } = useMutation(
    '/materials',
    async (values) => add(values),
    {
      onSuccess: () => {
        setIsAdd(false);
        toast('Le matériel a été ajouté', { className: 'successToast' });
        reloadData();
      },
      onError: () => {
        toast("Il y a une erreur dans l'ajout", { className: 'errorToast' });
      },
    },
  );

  const saveMaterial = (values) => {
    addMaterial(values);
  };
  const cancelMaterial = () => {
    setIsAdd(false);
  };
  return (
    <>
      {isLoading && <Loader />}
      <div className="bg-white p-8 shadow-sm mt-8" data-cy="tableMaterial">
        <div
          className="grid grid-cols-4 gap-x-8 border-b-2 border-blue-600 mb-4"
          data-cy="headerTableMaterial">
          <div className="font-semibold">Nom du matériel</div>
          <div className="font-semibold">Stock du matériel</div>
          <div className="font-semibold">Type du matériel</div>
          <div className="font-semibold text-right">Action</div>
        </div>
        {data.length === 0 ? (
          <div className="flex flex-col items-center text-lg" data-cy="tableEmpty">
            Aucun matériel disponible
          </div>
        ) : (
          ''
        )}
        {data.map((element) => (
          <MaterialTableRow key={element.id} element={element} reloadData={reloadData} />
        ))}
        {isAdd ? (
          <div className="mt-4">
            <MaterialForm saveFunction={saveMaterial} cancelFunction={cancelMaterial} />
          </div>
        ) : (
          <div className="flex mt-10">
            <button
              type="button"
              className="btn primary"
              onClick={() => setIsAdd(true)}
              data-cy="addMaterial">
              Ajouter un matériel
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MaterialTable;
