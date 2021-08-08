import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Property } from 'src/types/Property';
import { listProperties } from '../actions/propertyActions';
import { Loader } from '../components/Loader';
import PropertyCard from '../components/PropertyCard';

// @ts-ignore
const HomePage = ({ match }) => {
  const { keyword } = match.params;
  const pageNum = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const propertyList = useSelector((state: any) => state.propertyList);

  const { loading, error, properties } = propertyList;

  useEffect(() => {
    dispatch(listProperties(keyword, pageNum));
  }, [dispatch, keyword, pageNum]);
  return (
    <>
      <h1>Latest Properties</h1>
      {loading && <Loader />}
      {error && <h1>error</h1>}
      {properties
        && properties.map((p: Property) => (
          <div>
            {/* @ts-ignore */}
            <PropertyCard property={p} />
          </div>
        ))}
    </>
  );
};
export default HomePage;
