import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { checkType } from 'services/token/tokenService';

const Search = () => {
  const { address } = useParams<{ address: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    const checkTypeOfToken = async () => {
      const type = await checkType(address);
      if (type === 'collection') {
        return navigate(
          `/collection?address=${address}&subcollectionId=0&sort=3`
        );
      }
      if (type === 'nft') {
        return navigate(`/token/${address}`);
      }
    };
    checkTypeOfToken();
  }, []);

  return null;
};

export default Search;
