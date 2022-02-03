import Grid from '@mui/material/Grid';
import { GlitchText, Loader } from 'ui';
import { useEffect, useState } from 'react';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { styles } from './styles';
// import {
//   UserCollection,
//   useUserCollection,
// } from 'hooks/useUserCollection/useUserCollection';
import {
  UserCollection,
  useFetchUserItem,
} from 'hooks/useFetchUserItem/useFetchUserItem';
import { useActiveWeb3React, useClasses } from 'hooks';
import { AddressZero } from '@ethersproject/constants';
import { TokenOwned } from 'components/TokenOwned/TokenOwned';

const PAGE_SIZE = 10;

const MyNFTsPage = () => {
  const [collection, setCollection] = useState<UserCollection | undefined>(
    undefined
  );
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const { placeholderContainer, container, subContainer } = useClasses(styles);

  const { account, chainId } = useActiveWeb3React();

  // const getPaginatedItems = useUserCollection();
  const getPaginatedItems = useFetchUserItem();

  useEffect(() => {
    const getCollectionById = async () => {
      setPageLoading(true);
      const data = await getPaginatedItems(account ?? AddressZero);
      console.log("data", data);
      setPageLoading(false);
      setCollection(data);
    };

    getCollectionById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account]);

  return (
    <>
      <div className={container}>
        <GlitchText variant="h1">My NFTs</GlitchText>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      ></div>
      {Object.keys(collection ?? {}).map((key) => {
        const iterables = (collection ?? {})[key] ?? [];

        if (!iterables || iterables.length == 0) {
          return;
        }
        return (
          <>
            <div className={container}>
              <GlitchText variant="h1">{key}</GlitchText>
            </div>
            <Grid container spacing={1} style={{ marginTop: 12 }}>
              {iterables
                .map(
                  (token, i) =>
                    token && (
                      <Grid
                        item
                        key={`${token.staticData.asset.id}-${i}`}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                      >
                        <TokenOwned {...token} />
                      </Grid>
                    )
                )
                .filter((x) => !!x)}
            </Grid>
          </>
        );
      })}
      {pageLoading && (
        <div className={placeholderContainer}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default MyNFTsPage;
