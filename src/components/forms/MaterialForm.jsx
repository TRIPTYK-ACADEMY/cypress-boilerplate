/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormik } from 'formik';
import * as Yup from 'yup';

const MaterialForm = ({ mode, title, stock, type, saveFunction, cancelFunction }) => {
  const formik = useFormik({
    initialValues: {
      title: title || '',
      stock: stock || '',
      type: type || '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Le nom est requis').min(5, 'Min. 5 caractères'),
      stock: Yup.number().integer('Entrez un nombre').required('Le stock est requis'),
      type: Yup.string().required('Le type est requis'),
    }),
    onSubmit: (values) => {
      saveFunction(values);
    },
  });

  return (
    <form
      className="grid grid-cols-4 items-center gap-8"
      onSubmit={formik.handleSubmit}
      data-cy="formMaterial">
      <div className="form-control input">
        {mode !== 'edit' && <label htmlFor="title">Nom du matériel</label>}
        <input
          type="text"
          id="title"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="absolute -bottom-5 text-sm text-red-600">
            {formik.errors.title}
          </div>
        ) : null}
      </div>
      <div className="form-control input">
        {mode !== 'edit' && <label htmlFor="stock">Stock</label>}
        <input
          type="number"
          min="0"
          id="stock"
          name="stock"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.stock}
        />
        {formik.touched.stock && formik.errors.stock ? (
          <div className="absolute -bottom-5 text-sm text-red-600">
            {formik.errors.stock}
          </div>
        ) : null}
      </div>
      <div className="form-control input">
        {mode !== 'edit' && <label htmlFor="type">Type de matériel</label>}
        <input
          type="text"
          id="type"
          name="type"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.type}
        />
        {formik.touched.type && formik.errors.type ? (
          <div className="absolute -bottom-5 text-sm text-red-600">
            {formik.errors.type}
          </div>
        ) : null}
      </div>
      <div className="self-end mb-1 flex">
        <button
          type="submit"
          disabled={!formik.isValid}
          className="btn primary mr-4 w-full"
          data-cy="submit">
          {mode !== 'edit' ? 'Créer' : 'Editer'}
        </button>
        <button
          type="button"
          className="btn cancel w-full"
          onClick={cancelFunction}
          data-cy="cancel">
          Annuler
        </button>
      </div>
    </form>
  );
};

export default MaterialForm;
