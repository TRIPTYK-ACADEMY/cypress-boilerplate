import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { NavLink } from 'react-router-dom';
import { remove, update } from '../../data/material';
import MaterialForm from '../forms/MaterialForm';
import Loader from '../ui/Loader';

const MaterialTableRow = ({ element, reloadData }) => {
  const [mode, setMode] = useState(false);
  const cancelMaterial = () => {
    setMode(false);
  };
  const { isLoading, mutate: deleteMaterial } = useMutation(
    '/materials',
    async (values) => remove(values),
    {
      onSuccess: () => {
        toast('Le matériel a été supprimé', { className: 'successToast' });
        reloadData();
      },
      onError: () => {
        toast('Il y a une erreur dans la supression', { className: 'errorToast' });
      },
    },
  );
  const { isLoading: isLoadingUpdate, mutate: updateMaterial } = useMutation(
    '/materials',
    async (values) => update({ id: element.id, ...values }),
    {
      onSuccess: () => {
        toast('Le matériel a été mis à jour', { className: 'successToast' });
        setMode(false);
        reloadData();
      },
      onError: () => {
        toast('Il y a une erreur dans la mise à jour', { className: 'errorToast' });
      },
    },
  );

  return (
    <>
      {isLoading || (isLoadingUpdate && <Loader />)}
      {mode === 'edit' ? (
        <div className="py-8 pt-3 border-b border-gray-200 last:border-none">
          <MaterialForm
            title={element.title}
            stock={element.stock}
            type={element.type}
            saveFunction={updateMaterial}
            cancelFunction={cancelMaterial}
            mode="edit"
          />
        </div>
      ) : (
        <div
          className="grid grid-cols-4 py-3 gap-x-8 items-center border-b border-gray-200 last:border-none"
          data-cy={`row-${element.id}`}>
          <div data-cy="title">{element.title}</div>
          <div data-cy="stock">{element.stock}</div>
          <div data-cy="type">{element.type}</div>
          <div className="flex justify-end actions">
            <NavLink to={`/materials/${element.id}`} className="mr-4" data-cy="show">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 duration-100 text-green-400 hover:text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </NavLink>
            <button
              type="button"
              className="mr-4"
              onClick={() => setMode('edit')}
              data-cy="edit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 duration-100 text-blue-400 hover:text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => deleteMaterial(element)}
              data-cy="delete">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 duration-100 text-red-400 hover:text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MaterialTableRow;
