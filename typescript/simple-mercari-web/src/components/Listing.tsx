import { useRef, useState } from 'react';
import { postItem } from '~/api';

interface Prop {
  onListingCompleted: () => void;
}

type FormDataType = {
  name: string;
  category: string;
  image: string | File;
};

export const Listing = ({ onListingCompleted }: Prop) => {
  const initialState = {
    name: '',
    category: '',
    image: '',
  };
  const [values, setValues] = useState<FormDataType>(initialState);

  const uploadImageRef = useRef<HTMLInputElement>(null);

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.files![0],
    });
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate field before submit
    const REQUIRED_FILEDS = ['name', 'image'];
    const missingFields = Object.entries(values)
      .filter(([, value]) => !value && REQUIRED_FILEDS.includes(value))
      .map(([key]) => key);

    if (missingFields.length) {
      alert(`Missing fields: ${missingFields.join(', ')}`);
      return;
    }

    // Submit the form
    postItem({
      name: values.name,
      category: values.category,
      image: values.image,
    })
      .then(() => {
        alert('Item listed successfully');
      })
      .catch((error) => {
        console.error('POST error:', error);
        alert('Failed to list this item');
      })
      .finally(() => {
        onListingCompleted();
        setValues(initialState);
        if (uploadImageRef.current) {
          uploadImageRef.current.value = '';
        }
      });
  };
  return (
    <div className="Listing pt-2 pb-3">
      <form onSubmit={onSubmit}>
        <div>
          <div className="mb-1">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={onValueChange}
              required
              value={values.name}
              className="form-control"
            />
          </div>

          <div className="mb-1">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              id="category"
              onChange={onValueChange}
              value={values.category}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={onFileChange}
              required
              ref={uploadImageRef}
              className="form-control"
            />
          </div>

          <button type="submit">List this item</button>
        </div>
      </form>
    </div>
  );
};
