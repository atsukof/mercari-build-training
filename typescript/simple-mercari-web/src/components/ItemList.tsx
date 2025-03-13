import { useEffect, useState } from 'react';
import { Item, fetchItems } from '~/api';


interface Prop {
  reload: boolean;
  onLoadCompleted: () => void;
}


export const ItemList = ({ reload, onLoadCompleted }: Prop) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = () => {
      fetchItems()
        .then((data) => {
          console.debug('GET success:', data);
          setItems(data.items);
          onLoadCompleted();
        })
        .catch((error) => {
          console.error('GET error:', error);
        });
    };

    if (reload) {
      fetchData();
    }
  }, [reload, onLoadCompleted]);

  return (
    <div className="container-fluid p-3">
      <div className="row">
        {items?.map((item) => {
          return (
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <div key={item.id} className="ItemList card h-100 p-2">
                {/* TODO: Task 2: Show item images */}
                <img src={`http://localhost:9000/images/${item.image_name}`}
                      className="card-img-top" />
                <p className="card-text p-2">
                  <span>Name: {item.name}</span>
                  <br />
                  <span>Category: {item.category}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
