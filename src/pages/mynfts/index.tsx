import Grid from '@material-ui/core/Grid';
import { GlitchText, Loader } from 'ui';
import { useEffect, useState } from 'react';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { useStyles } from './styles';
import { UserCollection, useUserCollection } from 'hooks/useUserCollection/useUserCollection';
import { useActiveWeb3React } from 'hooks';
import { AddressZero } from '@ethersproject/constants';
import { TokenOwned } from 'components/TokenOwned/TokenOwned';
import { Asset } from 'hooks/marketplace/types';
import { database } from 'faker';

const PAGE_SIZE = 10;

const MyNFTsPage = () => {
  const [collection, setCollection] = useState<UserCollection | undefined>(undefined);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const { placeholderContainer, container, subContainer } = useStyles();

  const { account } = useActiveWeb3React();

  const getPaginatedItems = useUserCollection();

  useEffect(() => {
    const getCollectionById = async () => {
      setPageLoading(true);
      const data = await getPaginatedItems(account ?? AddressZero);
      setPageLoading(false);
      setCollection(data);
    };

    getCollectionById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <>
      <div className={container}>
        <GlitchText fontSize={48}>My NFTs</GlitchText>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      ></div>
      {Object.keys(collection ?? {}).map((key) => {
        const iterables = (collection ?? {})[key] ?? []

        if (!iterables || iterables.length == 0) {
          return
        }
        return <>
          <div className={container}>
            <GlitchText fontSize={24}>{key}</GlitchText>
          </div>
          <Grid container spacing={1} style={{ marginTop: 12 }}>
            {iterables
              .map(
                (token, i) =>
                  token && (
                    <Grid
                      item
                      key={`${token.staticData.asset.id}-${i}`}
                      xl={3}
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
