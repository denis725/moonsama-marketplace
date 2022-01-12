import { Chip, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Order } from 'hooks/marketplace/types';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import {
  useLatestBuyOrdersForTokenWithStaticCallback,
  useLatestSellOrdersForTokenWithStaticCallback,
} from 'hooks/useLatestOrdersWithStaticCallback/useLatestOrdersWithStaticCallback';
import { useRawCollectionsFromList } from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { useWhitelistedAddresses } from 'hooks/useWhitelistedAddresses/useWhitelistedAddresses';
import { useCallback, useEffect, useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import {
  Drawer,
  GlitchText,
  Loader,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Tabs,
} from 'ui';
import { TokenOrder } from '../../components/TokenOrder/TokenOrder';
import { useActiveWeb3React, useClasses } from '../../hooks';
import { styles } from './styles';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const PAGE_SIZE = 10;

const geTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableCell>Item</TableCell>
        <TableCell>Unit Price</TableCell>
        <TableCell>Quantity</TableCell>
        <TableCell>From</TableCell>
        <TableCell>Strategy</TableCell>
        <TableCell>Expiration</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHeader>
  );
};

const FreshOrdersPage = () => {
  const { chainId } = useActiveWeb3React();

  const [buyOrders, setBuyOrders] = useState<
    {
      meta: TokenMeta | undefined;
      staticData: StaticTokenData;
      order: Order;
    }[]
  >([]);

  const [sellOrders, setSellOrders] = useState<
    {
      meta: TokenMeta | undefined;
      staticData: StaticTokenData;
      order: Order;
    }[]
  >([]);

  const collections = useRawCollectionsFromList();

  const [selectedIndex, setSelectedIndex] = useState<number>(
    collections.findIndex((x) => (x.display_name = 'Moonsama')) ?? 0
  );
  const [take, setTake] = useState<number>(0);
  const [paginationEnded, setPaginationEnded] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);

  useEffect(() => {
    if (chainId) {
      setBuyOrders([]);
      setSellOrders([]);
      setSelectedIndex(collections.findIndex((x) => (x.display_name = 'Moonsama')) ?? 0)
      setTake(0)
      setPaginationEnded(false)
      setPageLoading(false)
      setIsDrawerOpened(false)
    }
  }, [chainId, JSON.stringify(collections)])

  const {
    placeholderContainer,
    container,
    pageContainer,
    tabsContainer,
    tabs,
    select,
    selectLabel,
    dropDown,
    filterControls,
    filterChip,
  } = useClasses(styles);
  const whitelist = useWhitelistedAddresses(); // REMOVEME later

  const getPaginatedSellOrders =
    useLatestSellOrdersForTokenWithStaticCallback();
  const getPaginatedBuyOrders = useLatestBuyOrdersForTokenWithStaticCallback();

  const selectedTokenAddress =
    collections[selectedIndex]?.address?.toLowerCase();

  const handleSelection = (i: number) => {
    if (i !== selectedIndex) {
      setBuyOrders([]);
      setSellOrders([]);
      setSelectedIndex(i);
      setTake(0);
      setPaginationEnded(false);
    }
  };

  const handleScrollToBottom = useCallback(() => {
    setTake((state) => (state += PAGE_SIZE));
  }, []);

  useBottomScrollListener(handleScrollToBottom, { offset: 400 });

  useEffect(() => {
    const getCollectionById = async () => {
      setPageLoading(true);

      let buyData = await getPaginatedBuyOrders(
        selectedTokenAddress,
        PAGE_SIZE,
        take
      );
      let sellData = await getPaginatedSellOrders(
        selectedTokenAddress,
        PAGE_SIZE,
        take
      );

      buyData = buyData.filter((x) =>
        whitelist.includes(x.order.buyAsset.assetAddress.toLowerCase())
      ); // REMOVEME later
      sellData = sellData.filter((x) =>
        whitelist.includes(x.order.sellAsset.assetAddress.toLowerCase())
      ); // REMOVEME later

      setPageLoading(false);

      const isEnd =
        buyData.some(({ meta }) => !meta) || sellData.some(({ meta }) => !meta);

      if (isEnd) {
        const buyPieces = buyData.filter(({ meta }) => !!meta);
        const sellPieces = sellData.filter(({ meta }) => !!meta);

        setPaginationEnded(true);

        setSellOrders((state) => state.concat(sellPieces));
        setBuyOrders((state) => state.concat(buyPieces));

        return;
      }

      setSellOrders((state) => state.concat(sellData));
      setBuyOrders((state) => state.concat(buyData));
    };
    if (!paginationEnded) {
      getCollectionById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [take, paginationEnded, selectedTokenAddress]);

  const getTableBody = (
    filteredCollection:
      | {
          meta: TokenMeta | undefined;
          staticData: StaticTokenData;
          order: Order;
        }[]
      | undefined
      | null
  ) => {
    return (
      <TableBody>
        {filteredCollection && filteredCollection.length > 0 ? (
          filteredCollection.map(
            (token, i) =>
              token && (
                <TokenOrder
                  key={`${token.staticData.asset.id}-${i}`}
                  {...token}
                />
              )
          )
        ) : (
          <TableRow>
            <TableCell style={{ textAlign: 'center' }} colSpan={7}>
              No records available...
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };

  return (
    <>
      <div className={container}>
        <GlitchText variant="h1">Latest offers</GlitchText>
      </div>

      <Drawer
        anchor="left"
        open={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
        onOpen={() => setIsDrawerOpened(true)}
      >
        Filters
      </Drawer>

      <Grid container className={pageContainer} justifyContent="center">
        <Stack
          direction={{ xs: 'row' }}
          flexWrap={{ xs: 'wrap' }}
          justifyContent="center"
          alignItems="center"
        >
          {collections.map((collection, i) => {
            return (
              <Chip
                key={`${collection.address}-${i}`}
                label={collection.display_name}
                variant="outlined"
                onClick={() => handleSelection(i)}
                className={`${filterChip}${
                  selectedIndex === i ? ' selected' : ''
                }`}
              />
            );
          })}
        </Stack>
        <Tabs
          containerClassName={tabsContainer}
          tabsClassName={tabs}
          tabs={[
            {
              label: 'Sell Offers',
              view: (
                <Table isExpandable style={{ whiteSpace: 'nowrap' }}>
                  {geTableHeader()}
                  {getTableBody(sellOrders)}
                </Table>
              ),
            },
            {
              label: 'Buy Offers',
              view: (
                <Table isExpandable style={{ whiteSpace: 'nowrap' }}>
                  {geTableHeader()}
                  {getTableBody(buyOrders)}
                </Table>
              ),
            },
          ]}
        />
        <div style={{ marginTop: 40, width: '100%' }} />
      </Grid>

      {pageLoading && (
        <div className={placeholderContainer}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default FreshOrdersPage;
