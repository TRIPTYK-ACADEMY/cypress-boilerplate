import { useQuery } from 'react-query';
import { NavLink, useParams } from 'react-router-dom';
import Loader from '../components/ui/Loader';
import { getOne } from '../data/material';

const DetailMaterial = () => {
  const { materialId } = useParams();
  const { data, isLoading } = useQuery('materials', async () => getOne(materialId));

  return (
    <div>
      {isLoading && <Loader />}
      {data && (
        <div>
          <h1 className="title primary">
            Bienvenue sur le produit {data.title} ({data.type})
          </h1>
          <div className="mx-auto p-8 my-8 border-2 border-gray-300 text-center text-3xl">
            <p className="mb-4" id="productId">
              ID du produit: {data.id}
            </p>
            Il reste en stock : {data.stock} produits
            {data.stock <= 10 && (
              <span className="block mt-2 text-red-500">
                Il faut effectuer une commande bientôt
              </span>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <NavLink
              to="/materials"
              className="text-blue-500 flex items-center duration-200 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Retourner vers le matériel
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailMaterial;
